# -*- coding: utf-8 -*-
"""Loader de datos de flota para el panel de buses, SIN depender del repo QS.

QS (dataQS.py) sigue siendo la única fuente de verdad del cruce flota×API: él
baja los datos de Copiloto, hace el join con el master y sube dos CSV a S3
(además de usarlos localmente):

  s3://{S3_BUCKET}/{S3_PREFIX}/inner/master_status_inner_qs_ready.csv
  s3://{S3_BUCKET}/{S3_PREFIX}/inner/campos_internos.csv

Este módulo es un ESPEJO deliberadamente angosto de `reporte.cargar()` (repo
QS, ~500 líneas con mucho más de lo que este backend necesita: Golden, WICAR,
100% Equipados, el reporte HTML, etc.). Solo reconstruye las columnas que
`metricas_bus.py` y `buses_en_sucursal.py` realmente usan: `cat`, `telemetria`,
`integracion`, `excluida_90d`, `en_panne`.

**Si una definición cambia en QS (la regla de telemetría, qué cuenta como
integración, excluida_90d, panne...) hay que replicarla acá a mano.** Mismo
patrón de riesgo conocido que `can_caido.py` en QS, documentado allí por la
misma razón: duplicar la regla es más simple que importar el módulo entero de
otro repo, pero puede desincronizarse si no se recuerda actualizar los dos
lados. Antes de tocar una definición, comparar contra `reporte.py:cargar()`
en el repo QS.
"""
from __future__ import annotations
import io
import os
import sys

import boto3
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

S3_BUCKET = os.getenv("S3_BUCKET", "exportacion-datos-connect")
S3_PREFIX = os.getenv("S3_PREFIX", "quicksight/conectividad")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

TRAMOS4 = ["Conectado 0-2", "Intermitente 3-14", "Limitado 15-30+", "Desconectado 31+"]


def _s3_csv(key: str) -> pd.DataFrame:
    s3 = boto3.client("s3", region_name=AWS_REGION)
    obj = s3.get_object(Bucket=S3_BUCKET, Key=f"{S3_PREFIX}/{key}")
    return pd.read_csv(io.BytesIO(obj["Body"].read()), encoding="utf-8-sig",
                       dtype=str, low_memory=False)


def cargar() -> pd.DataFrame:
    """Una fila por VIN del cruce, con las columnas que este backend necesita.

    Baja los dos CSV que dataQS.py sube a S3 y los mergea por VIN_norm, igual
    que `reporte.unir_campos_internos()` hace localmente en QS.
    """
    df = _s3_csv("inner/master_status_inner_qs_ready.csv")

    try:
        ci = _s3_csv("inner/campos_internos.csv")
        nuevas = [c for c in ci.columns if c != "VIN_norm" and c not in df.columns]
        if nuevas:
            df = df.merge(ci[["VIN_norm"] + nuevas], on="VIN_norm", how="left")
    except Exception as e:
        print(f"AVISO: no pude leer campos_internos.csv de S3 ({e}). "
              f"categoria/excluida_90d/en_panne/gps_speed quedarán vacíos.",
              file=sys.stderr)

    # Respaldo derivable si campos_internos.csv faltó o no trajo la columna
    # (mismo criterio que reporte.unir_campos_internos en QS).
    if "excluida_90d" not in df.columns:
        df["excluida_90d"] = "False"
    for c in ("categoria", "en_panne", "modelo_final", "gps_speed"):
        if c not in df.columns:
            df[c] = None

    df["cat"] = df.categoria.fillna("Sin categoría").replace("", "Sin categoría")
    df["telemetria"] = df["REGLA GENERAL DE REPORTABILIDAD"].fillna("").eq("Telemetría")

    emp = df.Empresa.fillna("").str.upper()
    df["integracion"] = (df.source.fillna("").eq("DIVEMOTOR")
                         | df.device_model.fillna("").eq("INTEGRATION")
                         | emp.str.contains("DIVEMOTOR|INTEGRAC", regex=True, na=False))

    df["en_panne"] = df.en_panne.fillna("False").astype(str).eq("True")
    df["estado_gps_ok"] = df.get("estado_gps", pd.Series(index=df.index)).isin(TRAMOS4)
    df["estado_can_ok"] = df.get("estado_can", pd.Series(index=df.index)).isin(TRAMOS4)

    return df
