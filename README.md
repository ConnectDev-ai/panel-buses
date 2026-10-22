# panel-buses

Backend de datos del panel de buses de Grupo Kaufmann: tres tablas en Neon
(Postgres) que alimenta un frontend separado (**el portal Connect**, repo
aparte, fuera de este proyecto). Este repo **no tiene frontend** — es
exclusivamente la capa de datos: qué se escribe, desde dónde sale, y con qué
cron.

Extraído el 2026-10-22 del repo `dataQS` (dos scripts, `metricas_bus.py` y
`buses_en_sucursal.py`, que seguían corriendo ahí) y de `rendimientos.kf` (el
exportador de rutas), para que un equipo que no trabaja en ninguno de esos dos
repos pueda avanzar el panel sin tener que entenderlos enteros.

## Las tres tablas

| Tabla | La escribe | Cron | Universo |
|---|---|---|---|
| `buses_metricas` | `metricas_bus.py` (este repo) | Diario, automático | Toda la categoría BUS, con o sin plan de telemetría |
| `buses_en_sucursal` | `buses_en_sucursal.py` (este repo) | Diario, automático | Buses cuya última posición cae dentro de 200 m de una sucursal |
| `bus_viajes` | `rutas/export_bus_viajes_neon.py` | **Manual**, sin cron | Viajes recientes por bus (visor, no analítica de rutas) |

DDL completo en [`schema.sql`](schema.sql). Las tres son idempotentes por
fecha (`buses_metricas`/`buses_en_sucursal`: DELETE+INSERT del día; `bus_viajes`:
TRUNCATE + reinsert completo cada corrida, sin partición por fecha).

## De dónde salen los datos

```
dataQS (repo aparte, GitHub Actions propio, ventana 08-11 Santiago)
  → corre dataQS.py (pull API Copiloto + cruce con el master)
  → sube a S3:
      s3://.../inner/master_status_inner_qs_ready.csv
      s3://.../inner/campos_internos.csv   (incluye categoria, excluida_90d,
                                             en_panne, modelo_final, gps_speed)
         ↓
panel-buses (este repo, GitHub Actions propio, ventana 09-12 Santiago —
             una hora después de QS a propósito, para que esos dos CSV ya
             estén frescos)
  → cargar.py baja los dos CSV de S3 y los mergea por VIN_norm
  → metricas_bus.py hoy       → Neon: buses_metricas
  → buses_en_sucursal.py      → Neon: buses_en_sucursal
```

**Este repo no corre `dataQS.py` ni tiene acceso a la API de Copiloto.** Lee
nada más los dos CSV que QS ya sube a S3. Si QS no corrió ese día, este repo
simplemente vuelve a escribir sobre los datos del día anterior en los CSV (no
falla, pero tampoco avanza) — es la misma dependencia que ya existía cuando
estos dos scripts vivían dentro de QS.

`cargar.py` es un **espejo angosto** de `reporte.cargar()` del repo QS: solo
reconstruye las ~6 columnas derivadas que estos dos scripts necesitan
(`cat`, `telemetria`, `integracion`, `excluida_90d`, `en_panne`). Si esas
reglas cambian en QS, hay que replicarlas acá a mano — mismo patrón (y mismo
riesgo documentado) que `can_caido.py` en QS.

## Cómo correr cada pieza

```bash
pip install -r requirements.txt
cp .env.example .env   # completar DATABASE_URL + credenciales S3 de solo lectura

python metricas_bus.py hoy        # escribe el día de hoy en buses_metricas
python metricas_bus.py validar    # debug: km y rendimiento de los últimos 30 días
python buses_en_sucursal.py       # radio 200 m por defecto -> buses_en_sucursal.xlsx + Neon
python buses_en_sucursal.py 500   # otro radio, en metros
```

Rutas (`bus_viajes`) es manual y tiene su propio runtime — ver
[`rutas/README.md`](rutas/README.md) antes de tocarlo.

## El cron

`.github/workflows/panel-buses-diario.yml`: mismo patrón de robustez que el de
QS (varios horarios de respaldo en minuto off-peak, guard de ventana ancha en
vez de hora exacta, `concurrency` para serializar disparos) — ver los
comentarios del workflow de QS si hace falta el razonamiento completo de por
qué GitHub Actions necesita ese patrón.

Secrets a configurar en **Settings → Secrets and variables → Actions**:

| Secret | Valor |
|---|---|
| `DATABASE_URL` | El mismo connection string de Neon que usa QS |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Credenciales de **solo lectura** al bucket de QS (no hace falta permiso de escritura) |

## Estado al momento de la extracción (2026-10-22)

- **`metricas_bus.py` / `buses_en_sucursal.py`: corriendo en paralelo con QS.**
  QS todavía los corre también en su propio cron (no se sacaron de ahí
  todavía). Es deliberado: la escritura es idempotente por fecha (el que corra
  último en el día "gana", sin duplicar filas), así que tener los dos corriendo
  un tiempo es una red de seguridad barata mientras se confirma que este repo
  escribe bien. Cuando se confirme, sacar los pasos "Reporte buses en
  sucursal" y "Metricas por bus" de `reporte-diario.yml` en QS.
- **`rutas/export_bus_viajes_neon.py`: portado, sin cron**, por lo descrito en
  `rutas/README.md` (depende de un pipeline de 3.2GB+ ajeno a este repo).
- **Conector GCP: solo credenciales, sin código** — ver
  `rutas/README.md#pendiente-conector-gcp`.
- **No se portó backfill histórico.** La versión de `metricas_bus.py` en QS
  tenía un comando `backfill` que leía los crudos locales (`vehicles_records_*.csv`,
  que QS nunca borra) para repoblar meses de historia. Ese crudo no sale de
  QS, así que ese comando no se portó. Si hace falta rehacer historia, correrlo
  desde QS.

## Relación con otros repos

| Repo | Qué es | Relación con este |
|---|---|---|
| `dataQS` | El pipeline de flota (API Copiloto + master + QuickSight) | Fuente de los dos CSV en S3. No tocar su cron sin coordinar — ver "Estado" arriba |
| `rendimientos.kf` (carpeta local `flespi-routes`) | Rendimiento de combustible / modelos ML, proyecto grande y no relacionado | De ahí sale `rutas/export_bus_viajes_neon.py` y su mart `trips_features` |
| Portal Connect | El frontend real del panel (otro repo, fuera de este proyecto) | Lee las tres tablas de Neon descritas acá. Coordinar cambios de esquema con ese equipo |
