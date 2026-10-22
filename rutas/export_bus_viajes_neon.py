# -*- coding: utf-8 -*-
"""Mapeo de rutas de buses (prototipo, Stage 1): VISOR POR UNIDAD.

Portado de `flespi-routes/scripts/export_bus_viajes_neon.py` (repo
`rendimientos.kf`). Toma los viajes de los buses chilenos desde el mart
`trips_features` de ese repo (fuente Geoflota/Studio), decodifica la geometría
`route` a polilínea, la simplifica, y publica los N viajes más recientes por
bus en la tabla `bus_viajes` de Neon — la misma base que alimenta el panel de
buses del portal.

**Este script NO corre en el workflow diario de panel-buses.** Depende de
`data/marts/trips_features/`, un parquet de varias etapas que produce el
pipeline propio de `rendimientos.kf` (ingesta Geoflota/Geotab, ~3.2GB+ de
datos locales, parte manual — los CSV de Geoflota/Studio se exportan a mano,
no hay API). Ese pipeline NO se trajo a este repo: es un proyecto grande y no
relacionado (rendimiento de combustible / ML), fuera de alcance acá. Correr
este script a mano, periódicamente, desde un entorno donde ese mart exista
(típicamente un checkout de `rendimientos.kf` con su pipeline ya corrido), o
apuntando `TRIPS_FEATURES_GLOB` a donde esté.

Decisión del usuario (2026-10-19): NO se identifican/nombran rutas, es una
herramienta visual (overlay de los viajes de una empresa o de un VIN). El
"Stage 2" (clustering/nombres de ruta) fue cancelado.

**Pendiente real — conector GCP (ver README.md "Pendiente: conector GCP"):**
en `rendimientos.kf` hay credenciales provisionadas (`BASEDEDATOSGCP`,
`USUARIOGCP`, `PASSWORDGCP`) para una fuente de datos más fresca/completa,
pero NO existe código que las use — ni script, ni notebook, ni mención en la
documentación de ese repo más allá de las 3 variables en su `.env`. Es
trabajo por hacer, no una integración a medio terminar.

Runtime: py -3.14 (polars + psycopg). Requiere DATABASE_URL en el .env de ESTE
repo (ya no se lee del .env de QS, a diferencia del original).

Uso:
    py -3.14 rutas/export_bus_viajes_neon.py [--n-por-bus 40] [--max-pts 120]
"""
from __future__ import annotations
import argparse, glob, json, os, sys
from pathlib import Path

import polars as pl
from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).resolve().parent))
from loader import parse_ewkb_linestring       # decodifica EWKB/WKT -> [(lon,lat),...]
from geometry import simplify_route            # Douglas-Peucker

# Dónde buscar el mart de rendimientos.kf. Por defecto, relativo al directorio
# desde el que se invoca el script (pensado para correr parado DENTRO de un
# checkout de rendimientos.kf); override con la variable de entorno si el mart
# vive en otro lado.
FEATURES_GLOB = os.getenv(
    "TRIPS_FEATURES_GLOB",
    "data/marts/trips_features/year=*/month=*/trips.parquet")
SIMPLIFY_EPS = 0.0004   # ~44 m; suficiente para la vista de ruta sin peso de más

DDL = """
CREATE TABLE IF NOT EXISTS bus_viajes (
    vin          text NOT NULL,
    trip_id      text NOT NULL,
    empresa      text,
    modelo       text,
    inicio       timestamptz,
    fin          timestamptz,
    distancia_km double precision,
    duracion_h   double precision,
    vel_prom     double precision,
    fuel_l100    double precision,
    start_lat    double precision,
    start_lon    double precision,
    end_lat      double precision,
    end_lon      double precision,
    start_zone   text,
    end_zone     text,
    route_type   text,
    polyline     jsonb,
    PRIMARY KEY (vin, trip_id)
);
"""


def _norm_vin(v) -> str:
    return "".join(str(v).split()).upper() if v else ""


def _num(v, lo=None, hi=None):
    """Numérico finito dentro de [lo,hi] o None. El mart trae inf/NaN y algunos
    valores finitos pero absurdos (odómetro malo -> millones de km) que romperían
    el visor; los rangos sanos los descartan por campo."""
    if v is None:
        return None
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    import math
    if not math.isfinite(f):
        return None
    if (lo is not None and f < lo) or (hi is not None and f > hi):
        return None
    return f


def _decimar(pts, max_pts):
    if len(pts) <= max_pts:
        return pts
    paso = len(pts) / max_pts
    out = [pts[int(i * paso)] for i in range(max_pts)]
    if out[-1] != pts[-1]:
        out[-1] = pts[-1]
    return out


def _polyline(route_value, max_pts):
    try:
        pts = parse_ewkb_linestring(route_value)
    except Exception:
        return None
    if not pts or len(pts) < 2:
        return None
    if len(pts) > 2:
        try:
            pts = simplify_route(pts, SIMPLIFY_EPS)
        except Exception:
            pass
    pts = _decimar(pts, max_pts)
    # [lon, lat] redondeado a 5 decimales (~1.1 m) para ahorrar espacio
    return [[round(float(x), 5), round(float(y), 5)] for x, y in pts]


def _buses_desde_neon(conn):
    """{vin_norm: (empresa, modelo)} de la última foto de buses_metricas, sin PERU."""
    f = conn.execute("SELECT max(fecha) FROM buses_metricas").fetchone()[0]
    rows = conn.execute(
        "SELECT vin, empresa, modelo FROM buses_metricas "
        "WHERE fecha = %s AND COALESCE(empresa,'') NOT ILIKE %s",
        (f, "%PERU%")).fetchall()
    return f, {_norm_vin(v): (emp, mod) for v, emp, mod in rows if v}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n-por-bus", type=int, default=40, help="viajes recientes por bus")
    ap.add_argument("--max-pts", type=int, default=120, help="puntos máx por polilínea")
    args = ap.parse_args()

    load_dotenv()
    db = (os.getenv("DATABASE_URL") or "").strip()
    if not db:
        sys.exit("Falta DATABASE_URL en el .env de este repo.")
    import psycopg

    with psycopg.connect(db) as conn:
        fecha, buses = _buses_desde_neon(conn)
        print(f"Buses chilenos (buses_metricas {fecha}): {len(buses)}")
        if not buses:
            sys.exit("buses_metricas está vacía: corré metricas_bus.py hoy primero "
                      "(bus_viajes depende de esa tabla para la lista de VIN/empresa/modelo).")

        files = glob.glob(FEATURES_GLOB)
        if not files:
            sys.exit(f"No encontré trips_features en '{FEATURES_GLOB}'. ¿Corriste el "
                      f"pipeline de rendimientos.kf, o seteaste TRIPS_FEATURES_GLOB?")

        bus_vins = set(buses)
        lf = (pl.scan_parquet(files)
              .with_columns(pl.col("vin").map_elements(_norm_vin, return_dtype=pl.Utf8).alias("vin_n"))
              # No exigimos is_valid_gps (ese flag mira la validez de los puntos
              # inicio/fin). Para el visor basta con que la geometría decodifique;
              # _polyline() descarta las que no. Sí pedimos distancia > 1 km para
              # sacar ruido (movimientos de patio).
              .filter(pl.col("vin_n").is_in(list(bus_vins))
                      & pl.col("route").is_not_null()
                      & (pl.col("route").str.len_chars() > 20)
                      & (pl.col("distance_km") > 1)))
        df = lf.select([
            "vin_n", "id", "company_name", "model_name_canonico",
            "start_time_utc", "end_time_utc", "distance_km", "duration_h",
            "speed_calc_kmh", "fuel_l100", "start_lat", "start_lon",
            "end_lat", "end_lon", "start_zone", "end_zone", "route_type", "route",
        ]).collect()
        print(f"Viajes de buses con geometría válida: {df.height}")

        df = (df.sort(["vin_n", "start_time_utc"], descending=[False, True])
                .group_by("vin_n", maintain_order=True).head(args.n_por_bus))
        print(f"Tras recortar a {args.n_por_bus}/bus: {df.height} viajes, "
              f"{df['vin_n'].n_unique()} buses con al menos un viaje")

        filas, sin_poly = [], 0
        for r in df.iter_rows(named=True):
            poly = _polyline(r["route"], args.max_pts)
            if not poly:
                sin_poly += 1
                continue
            emp, mod = buses.get(r["vin_n"], (None, None))
            filas.append((
                r["vin_n"], str(r["id"]),
                emp or r["company_name"], mod or r["model_name_canonico"],
                r["start_time_utc"], r["end_time_utc"],
                _num(r["distance_km"], 0, 5000), _num(r["duration_h"], 0, 48),
                _num(r["speed_calc_kmh"], 0, 200), _num(r["fuel_l100"], 0, 200),
                _num(r["start_lat"], -60, 15), _num(r["start_lon"], -90, -60),
                _num(r["end_lat"], -60, 15), _num(r["end_lon"], -90, -60),
                r["start_zone"], r["end_zone"], r["route_type"], json.dumps(poly),
            ))
        print(f"Filas a escribir: {len(filas)} (descartadas sin polilínea: {sin_poly})")

        with conn.cursor() as cur:
            cur.execute(DDL)
            cur.execute("TRUNCATE bus_viajes")
            cur.executemany(
                "INSERT INTO bus_viajes (vin, trip_id, empresa, modelo, inicio, fin, "
                "distancia_km, duracion_h, vel_prom, fuel_l100, start_lat, start_lon, "
                "end_lat, end_lon, start_zone, end_zone, route_type, polyline) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s::jsonb)",
                filas)
        conn.commit()
        print(f"OK: {len(filas)} viajes en Neon (tabla bus_viajes).")


if __name__ == "__main__":
    main()
