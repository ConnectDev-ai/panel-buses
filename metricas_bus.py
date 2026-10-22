# -*- coding: utf-8 -*-
"""Métricas operativas por bus para el panel del portal: odómetro, horómetro, litros,
kilometraje recorrido, rendimiento (km/L), velocidad, posición y estado de
conectividad. Una fila por bus por día, persistida en Neon (tabla buses_metricas).

Portado de `metricas_bus.py` del repo QS. Única diferencia real: la versión QS
lee el crudo diario de la API (`vehicles_records_*.csv`, que ese repo nunca
borra) porque ahí vive `gps_speed`. Ese crudo no sale de QS, así que acá se lee
todo —incluido `gps_speed`— desde los dos CSV que dataQS.py sube a S3 (ver
`cargar.py`); QS agrega `gps_speed` a `campos_internos.csv` desde 2026-10-22
específicamente para este repo.

**El kilometraje y el rendimiento NO se guardan.** Se calculan al leer, por delta
entre dos fechas (Δkm / Δlitros), igual que en QS.

Uso:
    python metricas_bus.py hoy        # escribe el día de hoy (America/Santiago) en Neon
    python metricas_bus.py validar    # imprime km y rendimiento de una ventana (debug)
"""
from __future__ import annotations
import sys
from datetime import timedelta

import pandas as pd
import pytz

import cargar as C
import db as SDB

CATEGORIA = "BUS"
TZ_CL = pytz.timezone("America/Santiago")

# Rangos plausibles para limpiar basura de sensor. Fuera de rango -> se anula el campo.
# Mismos valores que QS (metricas_bus.py), validados ahí contra datos reales.
LIM = {
    "odometer": (1, 3_000_000),      # km de vida útil de un bus
    "odoliter": (1, 5_000_000),      # litros acumulados
    "horometer": (1, 150_000),       # horas de motor
    "speed": (0, 200),               # km/h
}
RINDE_MIN, RINDE_MAX = 0.5, 8.0      # km/L de bus/camión, plausibilidad al leer
KM_DIA_MAX = 2000                    # tope de km/día para descartar saltos de odómetro


def _limpiar(s, lo, hi):
    x = pd.to_numeric(s, errors="coerce")
    return x.where((x >= lo) & (x <= hi))


def _hoy_santiago():
    return pd.Timestamp.now(tz=TZ_CL).normalize().date()


def metricas_dia(df_base=None):
    """Arma el detalle de métricas de los buses para hoy, desde el cruce de S3."""
    base = C.cargar() if df_base is None else df_base
    buses = base[base.cat == CATEGORIA].copy()
    buses["VIN_norm"] = buses["VIN_norm"].astype(str)
    buses = buses.set_index("VIN_norm")

    out = pd.DataFrame(index=buses.index)
    out["odo_can"] = _limpiar(buses.can_odometer, *LIM["odometer"])
    out["odo_gps"] = _limpiar(buses.gps_odometer, *LIM["odometer"])
    out["litros"] = _limpiar(buses.can_odoliter, *LIM["odoliter"])
    out["horas"] = _limpiar(buses.can_horometer, *LIM["horometer"])
    out["gps_speed"] = _limpiar(buses.gps_speed, *LIM["speed"])
    out["lat"] = _limpiar(buses.latitude, -90, 90)
    out["lon"] = _limpiar(buses.longitude, -180, 180)
    # (0,0) es la "isla nula": sentinela de "sin fix GPS", no una posición real.
    isla = (out.lat.abs() < 1e-6) & (out.lon.abs() < 1e-6)
    out.loc[isla, ["lat", "lon"]] = pd.NA
    out["dias_sin_gps"] = pd.to_numeric(buses.dias_sin_gps, errors="coerce")
    out["dias_sin_can"] = pd.to_numeric(buses.dias_sin_can, errors="coerce")

    out["Patente"] = buses.Patente
    out["Empresa"] = buses.Empresa
    out["Regla"] = buses["REGLA GENERAL DE REPORTABILIDAD"]
    out["telemetria"] = buses.telemetria.fillna(False).astype(bool)

    # Modelo del bus: el resuelto del taller (modelo_final, más limpio) con fallback al
    # Modelo del master. Se anulan los sentinelas de "sin dato" ("-", vacío, nan).
    def _limpio(col):
        s = buses[col].astype("string").str.strip() if col in buses.columns else pd.Series(index=buses.index, dtype="string")
        return s.where(~s.str.upper().isin(["", "-", "NAN", "NONE", "S/I"]))
    out["modelo"] = _limpio("modelo_final").fillna(_limpio("Modelo"))

    out["VIN"] = out.index
    return _hoy_santiago(), out.reset_index(drop=True)


def escribir_hoy(df_base=None) -> int:
    """Escribe el día de hoy en Neon. No bloqueante: si no hay DATABASE_URL,
    no hace nada. La llamadora (CLI) envuelve el resto en try/except."""
    if not SDB.disponible():
        return 0
    fecha, det = metricas_dia(df_base)
    return SDB.escribir_metricas_bus(fecha, det)


def calcular_rango(dias: int = 30):
    """Km recorridos y rendimiento de la flota en los últimos `dias`, desde Neon.
    Delta entre el snapshot más nuevo y el más cercano a hoy-dias. Debug/validación."""
    with SDB._conn() as conn:
        fechas = [r[0] for r in conn.execute(
            "SELECT DISTINCT fecha FROM buses_metricas ORDER BY fecha").fetchall()]
        if len(fechas) < 2:
            return None
        hoy = fechas[-1]
        previas = [f for f in fechas if f <= hoy - timedelta(days=dias)]
        antes = previas[-1] if previas else fechas[0]
        q = """
            SELECT h.vin, h.empresa,
                   COALESCE(h.odo_can, h.odo_gps) - COALESCE(a.odo_can, a.odo_gps) AS dkm,
                   h.litros - a.litros AS dlit
            FROM buses_metricas h JOIN buses_metricas a USING (vin)
            WHERE h.fecha = %s AND a.fecha = %s
        """
        df = pd.DataFrame(conn.execute(q, (hoy, antes)).fetchall(),
                          columns=["vin", "empresa", "dkm", "dlit"])
    d = (hoy - antes).days or 1
    km = df[(df.dkm > 0) & (df.dkm < KM_DIA_MAX * d)]
    r = df[(df.dkm > 0) & (df.dlit > 0)].copy()
    r["rinde"] = r.dkm / r.dlit
    r = r[(r.rinde >= RINDE_MIN) & (r.rinde <= RINDE_MAX)]
    return dict(antes=antes, hoy=hoy, dias=d, buses_km=len(km),
                km_total=float(km.dkm.sum()), km_dia_prom=float((km.dkm / d).mean()),
                buses_rinde=len(r),
                rinde_mediano=float(r.rinde.median()) if len(r) else None)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "validar"
    if cmd == "hoy":
        # NO bloqueante a propósito: corre en un workflow propio. Si falla (sin
        # DATABASE_URL, error de red, de S3, etc.) sale con código 0 igual.
        try:
            n = escribir_hoy()
            print(f"{n} buses escritos en buses_metricas." if n else
                  "DATABASE_URL no configurada: salto métricas (no bloqueante).")
        except Exception as e:
            print(f"AVISO: no pude escribir métricas en Neon ({e}).", file=sys.stderr)
    elif cmd == "validar":
        import json
        print(json.dumps(calcular_rango(), indent=2, default=str))
    else:
        print(f"Comando desconocido: {cmd}. Usá: hoy | validar", file=sys.stderr)
        sys.exit(2)
