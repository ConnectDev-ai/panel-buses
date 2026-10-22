# -*- coding: utf-8 -*-
"""Buses cuya última posición conocida cae en (o cerca de) una sucursal Kaufmann,
con su estado de conectividad — pensado para decidir a cuáles repararles la
telemetría mientras están en el taller.

Portado de `buses_en_sucursal.py` del repo QS. Misma lógica, misma salida; la
única diferencia es de dónde sale el dato: acá vía `cargar.py` (S3), no del
`outQS/` local de QS.

El caso de uso: muchos buses reportan GPS pero no CAN. Un GPS al día prueba que el
equipo está instalado, energizado y con cobertura, así que si el CAN no llega el
problema es el bus de datos o la configuración, no el vehículo. Si además el bus
está físicamente en una sucursal, es la oportunidad de intervenirlo sin tener que
ir a buscarlo.

  python buses_en_sucursal.py          # radio por defecto, 200 m
  python buses_en_sucursal.py 500      # otro radio, en metros

── Advertencias (heredadas de taller_zona.py en QS) ─────────────────────────
Es la ÚLTIMA posición conocida: para un bus con GPS al día equivale a su posición
actual, pero para uno mudo es dónde dejó de hablar. Y una coincidencia espacial no
es una causa: pudo apagarse en el taller o llegar ya muerto. Por eso la columna
`Situacion` separa los que tienen GPS fresco (candidatos reales a intervención) de
los que sólo tienen una posición vieja que da la casualidad de caer en la sucursal.
"""
from pathlib import Path
import sys

import pandas as pd

import cargar as C
import geo as TZ
import db as SDB

BASE = Path(__file__).resolve().parent
SALIDA = BASE / "buses_en_sucursal.xlsx"

CATEGORIA = "BUS"
RADIO_M = 200          # mismo criterio de patio que taller_zona.py en QS
GPS_FRESCO_DIAS = 2    # posición al día = equipo vivo
DIAS_CAN_MAX = 30      # CAN "caído" si lleva más de 30 d sin reportar (o nunca)

ORDEN_SITUACION = [
    "Revisar telemetría — GPS al día, CAN caído",
    "Revisar telemetría — GPS reciente, CAN caído",
    "Telemetría al día",
    "Solo plan GPS (sin telemetría)",
    "Posición antigua (GPS +30 d) — verificar presencia",
]


def clasificar(row) -> str:
    """Estado del bus de cara a una intervención de telemetría en el taller."""
    dg, dc = row["dg"], row["dc"]
    plan = bool(row.get("telemetria", False))
    gps_al_dia = pd.notna(dg) and dg <= GPS_FRESCO_DIAS
    gps_reciente = pd.notna(dg) and dg <= DIAS_CAN_MAX
    can_caido = pd.isna(dc) or dc > DIAS_CAN_MAX

    if not gps_reciente:
        return ORDEN_SITUACION[4]
    if not plan:
        return ORDEN_SITUACION[3]
    if not can_caido:
        return ORDEN_SITUACION[2]
    return ORDEN_SITUACION[0] if gps_al_dia else ORDEN_SITUACION[1]


def main():
    radio = int(sys.argv[1]) if len(sys.argv) > 1 else RADIO_M

    talleres = TZ.leer_talleres()
    flota = TZ.flota_con_posicion()
    buses = flota[flota.cat == CATEGORIA].copy()
    if buses.empty:
        print("No hay buses con posición usable.", file=sys.stderr)
        return 1

    buses, _ = TZ.distancias(buses, talleres)
    dentro = buses[buses.dist_m <= radio].copy()

    dentro["Situacion"] = dentro.apply(clasificar, axis=1)
    dentro["can_nunca"] = dentro.dc.isna()
    dentro["Situacion"] = pd.Categorical(dentro.Situacion, ORDEN_SITUACION, ordered=True)
    dentro = dentro.sort_values(["Situacion", "dist_m", "dg"],
                                ascending=[True, True, False])

    print(f"talleres cargados       : {len(talleres)}")
    print(f"buses con posición      : {len(buses):,}")
    print(f"buses dentro de {radio} m : {len(dentro):,}")
    print("\n=== Buses en sucursal por situación ===")
    print(dentro.Situacion.value_counts().reindex(ORDEN_SITUACION).fillna(0)
          .astype(int).to_string())

    revisar = dentro[dentro.Situacion.astype(str).str.startswith("Revisar")]
    print(f"\n>>> A revisar telemetría en terreno: {len(revisar)} buses "
          f"({int(revisar.can_nunca.sum())} nunca entregaron CAN)")

    cols = ["Patente", "VIN_norm", "IMEI_status", "Empresa", "taller",
            "zona_taller", "pais_taller", "dist_m", "Situacion",
            "REGLA GENERAL DE REPORTABILIDAD", "dg", "dc", "can_nunca",
            "gps_timestamp", "can_timestamp", "excluida_90d", "en_panne"]
    det = (dentro[[c for c in cols if c in dentro.columns]]
           .rename(columns={"VIN_norm": "VIN", "IMEI_status": "IMEI",
                            "REGLA GENERAL DE REPORTABILIDAD": "Regla",
                            "dist_m": "Distancia_m", "dg": "Dias_sin_GPS",
                            "dc": "Dias_sin_CAN", "can_nunca": "CAN_nunca",
                            "zona_taller": "Zona", "pais_taller": "Pais"}))

    sit = dentro.assign(
        revisar=dentro.Situacion.astype(str).str.startswith("Revisar"),
        al_dia=dentro.Situacion.astype(str).eq("Telemetría al día"),
        solo_gps=dentro.Situacion.astype(str).str.startswith("Solo plan GPS"),
        pos_vieja=dentro.Situacion.astype(str).str.startswith("Posición antigua"),
    )
    por_suc = (sit.groupby(["pais_taller", "zona_taller", "id_taller", "taller"])
               .agg(buses=("Situacion", "size"),
                    revisar_telemetria=("revisar", "sum"),
                    can_nunca=("can_nunca", "sum"),
                    telemetria_al_dia=("al_dia", "sum"),
                    solo_gps=("solo_gps", "sum"),
                    posicion_vieja=("pos_vieja", "sum"))
               .reset_index()
               .sort_values("revisar_telemetria", ascending=False))

    def situacion_en(rad):
        d = buses[buses.dist_m <= rad].copy()
        s = d.apply(clasificar, axis=1).astype(str)
        return {"radio_m": rad, "buses": len(d),
                "revisar_telemetria": int(s.str.startswith("Revisar").sum())}
    sens = pd.DataFrame([situacion_en(r) for r in (100, 200, 300, 500, 1000, 2000)])

    hojas = {
        "Resumen por sucursal": por_suc,
        "Buses en sucursal": det,
        "Sensibilidad al radio": sens,
    }
    with pd.ExcelWriter(SALIDA, engine="xlsxwriter") as xw:
        for nombre, h in hojas.items():
            h.to_excel(xw, sheet_name=nombre[:31], index=False)
            ws = xw.sheets[nombre[:31]]
            if len(h.columns):
                ws.autofilter(0, 0, max(len(h), 1), len(h.columns) - 1)
                ws.freeze_panes(1, 0)

    print(f"\n{SALIDA}")
    print(f"  hojas: { {k: len(v) for k, v in hojas.items()} }")

    # ── Persistir en Neon (para la automatización en la nube) ──────────────
    # Idempotente por fecha. No bloquea: si no hay DATABASE_URL o falla, seguimos
    # con el Excel igual. La fecha es la de hoy (America/Santiago).
    if SDB.disponible():
        try:
            import metricas_bus as M
            fecha = M._hoy_santiago()
            nfilas = SDB.escribir_buses_sucursal(fecha, det)
            print(f"  Neon: {nfilas} filas escritas en buses_en_sucursal (fecha {fecha}).")
        except Exception as e:
            print(f"AVISO: no pude escribir en Neon ({e}).", file=sys.stderr)
    if len(por_suc):
        print("\n=== Top sucursales por buses a revisar ===")
        print(por_suc.head(12)[["taller", "pais_taller", "buses",
                                "revisar_telemetria", "can_nunca"]]
              .to_string(index=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
