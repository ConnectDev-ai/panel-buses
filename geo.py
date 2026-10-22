# -*- coding: utf-8 -*-
"""Matching geográfico flota↔sucursal: Haversine contra `inputs/talleres.xlsx`.

Copiado de `taller_zona.py` del repo QS (mismas funciones, mismas advertencias
de interpretación — ver ahí el detalle de por qué `Latitud logitud` combinada
manda sobre las columnas separadas). Acá solo cambia `flota_con_posicion()`,
que usa `cargar.cargar()` (S3) en vez de `reporte.cargar()` (local QS).
"""
from pathlib import Path
import re
import sys

import numpy as np
import pandas as pd

import cargar as C

BASE = Path(__file__).resolve().parent
PATH_TALLERES = BASE / "inputs" / "talleres.xlsx"


def leer_talleres(path=PATH_TALLERES) -> pd.DataFrame:
    """Carga y limpia el listado de sucursales (ver taller_zona.py en QS para el
    porqué de la columna combinada)."""
    d = pd.read_excel(path)
    d.columns = [c.strip() for c in d.columns]

    def parsear(s):
        m = re.match(r"^\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*$", str(s))
        return (float(m.group(1)), float(m.group(2))) if m else (np.nan, np.nan)

    comb = d["Latitud logitud"].map(parsear)
    d["lat_comb"] = [a for a, _ in comb]
    d["lon_comb"] = [b for _, b in comb]
    d["lat_sep"] = pd.to_numeric(d["Latitud"], errors="coerce")
    d["lon_sep"] = pd.to_numeric(d["Longitud"], errors="coerce")

    d["LAT"] = d.lat_comb.fillna(d.lat_sep)
    d["LON"] = d.lon_comb.fillna(d.lon_sep)
    d = d.rename(columns={"Sucursal Kaufmann": "sucursal", "ZONA": "zona", "Pais": "pais"})
    d["sucursal"] = d.sucursal.astype(str).str.strip()

    faltan = d.LAT.isna() | d.LON.isna()
    if faltan.any():
        print(f"AVISO: {int(faltan.sum())} sucursales sin coordenada usable, se omiten:",
              ", ".join(d[faltan].sucursal), file=sys.stderr)
        d = d[~faltan]
    return d.reset_index(drop=True)


def flota_con_posicion() -> pd.DataFrame:
    """El cruce (vía S3), con la última posición y los días sin reportar."""
    df = C.cargar()
    df["lat"] = pd.to_numeric(df.latitude, errors="coerce")
    df["lon"] = pd.to_numeric(df.longitude, errors="coerce")
    df["dg"] = pd.to_numeric(df.dias_sin_gps, errors="coerce")
    df["dc"] = pd.to_numeric(df.dias_sin_can, errors="coerce")
    # 0,0 es "sin fix", no el golfo de Guinea.
    usable = df.lat.notna() & df.lon.notna() & ~((df.lat == 0) & (df.lon == 0))
    return df[usable].copy()


def distancias(u: pd.DataFrame, t: pd.DataFrame) -> pd.DataFrame:
    """Haversine de cada unidad a cada taller; se queda con el más cercano."""
    r = 6371000.0
    la_u = np.radians(u.lat.to_numpy())[:, None]
    la_t = np.radians(t.LAT.to_numpy())[None, :]
    dlon = np.radians(t.LON.to_numpy()[None, :] - u.lon.to_numpy()[:, None])
    a = np.sin((la_t - la_u) / 2) ** 2 + np.cos(la_u) * np.cos(la_t) * np.sin(dlon / 2) ** 2
    M = 2 * r * np.arcsin(np.sqrt(a))
    i = M.argmin(axis=1)
    u = u.copy()
    u["dist_m"] = M.min(axis=1).round(0)
    for col, dest in (("sucursal", "taller"), ("zona", "zona_taller"),
                      ("pais", "pais_taller"), ("ID", "id_taller")):
        u[dest] = t[col].to_numpy()[i]
    return u, M
