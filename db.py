# -*- coding: utf-8 -*-
"""Conexión y escritura a Neon (Postgres) para el panel de buses.

Mismas tres tablas que ya usa el portal (ver README.md "Esquema de datos"):
`buses_metricas`, `buses_en_sucursal` (este repo) y `bus_viajes` (rutas/, DDL
propio ahí porque corre con un runtime distinto). DDL y patrón de escritura
copiados tal cual de `snapshots_db.py` del repo QS — ahí nacieron, acá solo
viven sin el resto de ese módulo (que incluye `conectividad_snapshot` y
`pantallas_html`, que son de QS, no de este panel).

Conexión por `DATABASE_URL` (connection string de Neon, con `sslmode=require`),
leída del entorno / `.env`. Si no está, `disponible()` devuelve False y los
scripts llamadores no bloquean la corrida (mismo contrato que en QS).
"""
from __future__ import annotations
import os

import pandas as pd
from dotenv import load_dotenv

load_dotenv()
DB_URL = (os.getenv("DATABASE_URL") or "").strip()

BUSES_DDL = """
CREATE TABLE IF NOT EXISTS buses_en_sucursal (
    fecha        date NOT NULL,
    patente      text,
    vin          text,
    imei         text,
    empresa      text,
    taller       text,
    zona         text,
    pais         text,
    distancia_m  double precision,
    situacion    text,
    regla        text,
    dias_sin_gps double precision,
    dias_sin_can double precision,
    can_nunca    boolean,
    gps_ts       timestamptz,
    can_ts       timestamptz,
    excluida_90d boolean,
    en_panne     boolean
);
"""

METRICAS_BUS_DDL = """
CREATE TABLE IF NOT EXISTS buses_metricas (
    fecha        date NOT NULL,
    vin          text NOT NULL,
    patente      text,
    empresa      text,
    odo_can      double precision,
    odo_gps      double precision,
    litros       double precision,
    horas        double precision,
    lat          double precision,
    lon          double precision,
    gps_speed    double precision,
    dias_sin_gps double precision,
    dias_sin_can double precision,
    regla        text,
    telemetria   boolean,
    modelo       text,
    PRIMARY KEY (fecha, vin)
);
"""

_METRICAS_COLS = [
    ("vin", "VIN", "t"), ("patente", "Patente", "t"), ("empresa", "Empresa", "t"),
    ("odo_can", "odo_can", "f"), ("odo_gps", "odo_gps", "f"),
    ("litros", "litros", "f"), ("horas", "horas", "f"),
    ("lat", "lat", "f"), ("lon", "lon", "f"), ("gps_speed", "gps_speed", "f"),
    ("dias_sin_gps", "dias_sin_gps", "f"), ("dias_sin_can", "dias_sin_can", "f"),
    ("regla", "Regla", "t"), ("telemetria", "telemetria", "b"),
    ("modelo", "modelo", "t"),
]

_BUSES_COLS = [
    ("patente", "Patente", "t"), ("vin", "VIN", "t"), ("imei", "IMEI", "t"),
    ("empresa", "Empresa", "t"), ("taller", "taller", "t"), ("zona", "Zona", "t"),
    ("pais", "Pais", "t"), ("distancia_m", "Distancia_m", "f"),
    ("situacion", "Situacion", "t"), ("regla", "Regla", "t"),
    ("dias_sin_gps", "Dias_sin_GPS", "f"), ("dias_sin_can", "Dias_sin_CAN", "f"),
    ("can_nunca", "CAN_nunca", "b"), ("gps_ts", "gps_timestamp", "ts"),
    ("can_ts", "can_timestamp", "ts"), ("excluida_90d", "excluida_90d", "b"),
    ("en_panne", "en_panne", "b"),
]


def disponible() -> bool:
    """Hay connection string configurada."""
    return bool(DB_URL)


def _conn():
    import psycopg
    return psycopg.connect(DB_URL)


def _conv(v, tipo):
    """Normaliza un valor de pandas para psycopg (NaN/NaT -> None, tipos numpy -> py)."""
    if v is None:
        return None
    try:
        if pd.isna(v):
            return None
    except (TypeError, ValueError):
        pass
    if tipo == "f":
        return float(v)
    if tipo == "b":
        return bool(v)
    if tipo == "ts":
        t = pd.to_datetime(v, errors="coerce", utc=True)
        return None if pd.isna(t) else t.to_pydatetime()
    return str(v)


def escribir_metricas_bus(fecha, df) -> int:
    """Reemplaza las filas del día en buses_metricas con el detalle de métricas.
    `df` es el DataFrame que arma metricas_bus.metricas_dia()."""
    db_cols = [c[0] for c in _METRICAS_COLS]
    rows = [[fecha] + [_conv(r.get(src), tipo) for _, src, tipo in _METRICAS_COLS]
            for _, r in df.iterrows()]
    with _conn() as conn:
        conn.execute(METRICAS_BUS_DDL)
        with conn.cursor() as cur:
            cur.execute("DELETE FROM buses_metricas WHERE fecha = %s", (fecha,))
            if rows:
                ph = ", ".join(["%s"] * (len(db_cols) + 1))
                cur.executemany(
                    f"INSERT INTO buses_metricas (fecha, {', '.join(db_cols)}) "
                    f"VALUES ({ph})", rows)
        conn.commit()
    return len(rows)


def escribir_buses_sucursal(fecha, det) -> int:
    """Reemplaza las filas del día en buses_en_sucursal con la hoja de detalle.
    `det` es el DataFrame 'Buses en sucursal' de buses_en_sucursal.py."""
    db_cols = [c[0] for c in _BUSES_COLS]
    rows = [[fecha] + [_conv(r.get(src), tipo) for _, src, tipo in _BUSES_COLS]
            for _, r in det.iterrows()]
    with _conn() as conn:
        conn.execute(BUSES_DDL)
        with conn.cursor() as cur:
            cur.execute("DELETE FROM buses_en_sucursal WHERE fecha = %s", (fecha,))
            if rows:
                ph = ", ".join(["%s"] * (len(db_cols) + 1))
                cur.executemany(
                    f"INSERT INTO buses_en_sucursal (fecha, {', '.join(db_cols)}) "
                    f"VALUES ({ph})", rows)
        conn.commit()
    return len(rows)
