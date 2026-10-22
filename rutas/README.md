# Rutas de buses (`bus_viajes`) — manual, no automatizado

A diferencia de `metricas_bus.py` y `buses_en_sucursal.py` (que sí corren solos
todos los días, ver el workflow en `.github/workflows/`), **esto no tiene cron**.

## Por qué no es automático

`export_bus_viajes_neon.py` necesita el mart `data/marts/trips_features/` que
produce el pipeline propio del repo `rendimientos.kf`
(`github.com/ConnectDev-ai/rendimientos.kf`, carpeta local `flespi-routes`):
ingesta de Geoflota/Studio (Chile) y Geotab (Colombia/Perú), varias etapas,
**~3.2GB+ de datos locales**, y una parte manual — los CSV de Geoflota/Studio
se exportan a mano hoy, no hay API. Ese pipeline es un proyecto grande sobre
otro tema (rendimiento de combustible / modelos ML) y no se trajo a este repo.

Automatizar esto de verdad significaría portar (o correr en paralelo) una
porción no trivial de `rendimientos.kf` en un runner de CI — no es un "agregar
un paso al workflow". Si en algún momento se quiere, es un proyecto aparte.

## Cómo correrlo hoy

Periódicamente, a mano, desde un entorno donde `data/marts/trips_features/`
exista (típicamente un checkout de `rendimientos.kf` con su pipeline corrido):

```bash
# parado DENTRO del checkout de rendimientos.kf, con este repo como dependencia:
py -3.14 -m pip install -r /ruta/a/panel-buses/rutas/requirements.txt
py -3.14 /ruta/a/panel-buses/rutas/export_bus_viajes_neon.py
```

O seteando `TRIPS_FEATURES_GLOB` en el `.env` de este repo si el mart vive en
otra ruta (ver `.env.example`).

**Depende de que `buses_metricas` ya tenga datos de hoy** (lee esa tabla para
la lista de VIN/empresa/modelo canónicos) — correr `metricas_bus.py hoy`
primero si hace falta.

## Pendiente: conector GCP

En `rendimientos.kf` hay tres variables de credenciales provisionadas en su
`.env` para una fuente de datos GCP más fresca/completa:

- `BASEDEDATOSGCP`
- `USUARIOGCP`
- `PASSWORDGCP`

**No existe código que las use.** Se buscó en todo ese repo (scripts, `src/`,
notebooks, `CLAUDE.md`) y no hay ningún script, función ni mención más allá de
esas tres líneas del `.env`. No es una integración a medio terminar con un bug
que arreglar — es trabajo por construir desde cero: decidir qué trae esa base
(¿viajes más recientes que Geoflota/Studio? ¿reemplaza el CSV manual?), escribir
el conector, y conectarlo al pipeline de `rendimientos.kf` (no a este repo
directamente, salvo que se decida que el mart se arma distinto).

## Decisión de producto (2026-10-19)

El usuario decidió que esto **no identifica ni nombra rutas** — es una
herramienta visual: overlay de los viajes recientes de una empresa o de un VIN
en el mapa. El "Stage 2" (clustering y nomenclatura de rutas) fue evaluado y
**cancelado**: `bus_viajes` ya alcanza para lo que se necesita, consultando por
`empresa` o por `vin`.
