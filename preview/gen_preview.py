# -*- coding: utf-8 -*-
"""Genera un preview local (no entregable) del panel de buses desde Neon.

Reemplazo del preview que vivía en el scratchpad de QS (gen_preview.py +
panel_tpl.html, no portado en la extracción del 2026-10-22 — ver
rutas/README.md y el README de este repo). Mismo template visual (ya alineado
al Brandbook V2 Connect: Fleet verde/teal, Poppins + IBM Plex Mono, sidebar +
topbar, selector de empresa global) — acá solo cambia de dónde sale el dato:
consulta `buses_metricas` directo en Neon en vez de leer un Excel/CSV de QS.

Es un preview de lectura, nada se escribe en Neon. La UI real del panel se
implementa en el repo portalConnect — esto es solo para ver cómo luce el
diseño con datos reales mientras se coordina con ese repo.

Uso:
    python preview/gen_preview.py
    # sirve: preview/panel_buses_preview.html

Solo Chile: excluye `empresa ILIKE '%PERU%'` al leer (decisión de producto,
ver README.md), igual que rutas/export_bus_viajes_neon.py.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

import psycopg
from dotenv import load_dotenv
import os

BASE = Path(__file__).resolve().parent
TPL = BASE / "panel_tpl.html"
SALIDA = BASE / "panel_buses_preview.html"

load_dotenv(BASE.parent / ".env")
DB_URL = (os.getenv("DATABASE_URL") or "").strip()

# Mismos rangos de plausibilidad que metricas_bus.py (ahí nacen, acá solo se
# mirrorean para el cálculo por-bus de km_30d/rendimiento; ese script calcula
# el mismo delta pero agregado a nivel flota).
VENTANA_DIAS = 30
KM_DIA_MAX = 2000
RINDE_MIN, RINDE_MAX = 0.5, 8.0
HEAT_DIAS = 90


def _cargar_filas(conn):
    """Última foto de buses_metricas + delta contra el snapshot más cercano a
    hoy-30d, para computar km_30d y rendimiento por bus (mismo criterio que
    metricas_bus.calcular_rango(), pero fila por fila en vez de agregado)."""
    fechas = [r[0] for r in conn.execute(
        "SELECT DISTINCT fecha FROM buses_metricas ORDER BY fecha DESC").fetchall()]
    if not fechas:
        return [], None
    hoy = fechas[0]
    previas = [f for f in fechas if f <= hoy - __import__("datetime").timedelta(days=VENTANA_DIAS)]
    antes = previas[0] if previas else fechas[-1]

    rows = conn.execute("""
        SELECT h.patente, h.empresa, h.modelo,
               COALESCE(h.odo_can, h.odo_gps)              AS odometro,
               h.horas                                     AS horas_motor,
               h.dias_sin_gps, h.dias_sin_can, h.telemetria,
               h.lat, h.lon,
               COALESCE(h.odo_can,h.odo_gps) - COALESCE(a.odo_can,a.odo_gps) AS dkm,
               h.litros - a.litros                         AS dlit
        FROM buses_metricas h
        LEFT JOIN buses_metricas a ON a.vin = h.vin AND a.fecha = %s
        WHERE h.fecha = %s AND COALESCE(h.empresa, '') NOT ILIKE %s
    """, (antes, hoy, "%PERU%")).fetchall()

    dias_ventana = (hoy - antes).days or 1
    out = []
    for patente, empresa, modelo, odometro, horas, dg, dc, telemetria, lat, lon, dkm, dlit in rows:
        km_30d = None
        if dkm is not None and 0 < dkm < KM_DIA_MAX * dias_ventana:
            km_30d = round(float(dkm), 1)
        rinde = None
        if dkm is not None and dlit is not None and dkm > 0 and dlit > 0:
            r = float(dkm) / float(dlit)
            if RINDE_MIN <= r <= RINDE_MAX:
                rinde = round(r, 2)
        out.append({
            "patente": patente, "empresa": empresa, "modelo": modelo,
            "odometro": float(odometro) if odometro is not None else None,
            "horas_motor": float(horas) if horas is not None else None,
            "dias_sin_gps": float(dg) if dg is not None else None,
            "dias_sin_can": float(dc) if dc is not None else None,
            "telemetria": bool(telemetria),
            "km_30d": km_30d, "rinde_kml": rinde,
            "lat": float(lat) if lat is not None else None,
            "lon": float(lon) if lon is not None else None,
            "fecha": str(hoy),
        })
    return out, hoy


def _cargar_heat(conn, hoy):
    """Densidad de posiciones de los últimos HEAT_DIAS días, agrupada a ~100 m
    (3 decimales), para el modo heatmap del Mapa de flota. Una posición por
    bus por día (no son rutas reconstruidas — ver nota en el Mapa)."""
    rows = conn.execute("""
        SELECT round(lat::numeric, 3), round(lon::numeric, 3), empresa, count(*)
        FROM buses_metricas
        WHERE fecha > %s AND lat IS NOT NULL AND lon IS NOT NULL
          AND COALESCE(empresa, '') NOT ILIKE %s
        GROUP BY 1, 2, 3
    """, (hoy - __import__("datetime").timedelta(days=HEAT_DIAS), "%PERU%")).fetchall()
    return [[float(la), float(lo), int(w), emp or "—"] for la, lo, emp, w in rows]


def main() -> int:
    if not DB_URL:
        sys.exit("Falta DATABASE_URL (ver .env.example).")

    with psycopg.connect(DB_URL) as conn:
        data, hoy = _cargar_filas(conn)
        if not data:
            sys.exit("buses_metricas está vacía: corré metricas_bus.py hoy primero.")
        heat = _cargar_heat(conn, hoy)

    tpl = TPL.read_text(encoding="utf-8")
    html = tpl.replace("__DATA_JSON__", json.dumps(data, ensure_ascii=False)) \
              .replace("__HEAT_JSON__", json.dumps(heat, ensure_ascii=False))
    SALIDA.write_text(html, encoding="utf-8")
    print(f"{len(data)} buses, {len(heat)} celdas de heatmap (fecha {hoy}).")
    print(f"Escrito: {SALIDA}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
