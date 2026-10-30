# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Data backend for Grupo Kaufmann's bus panel: three tables in Neon (Postgres),
plus (since 2026-10-29) its own small frontend in `frontend/` — **Connect
Flotas**, a standalone Vercel project, same pattern as Connect Care / Connect
Talleres (separate project, linked into Portal Connect only via a `vercel.json`
rewrite and an SSO handoff, not shared code). It was extracted from `dataQS`
(`metricas_bus.py`, `buses_en_sucursal.py`) and `rendimientos.kf`
(`rutas/export_bus_viajes_neon.py`) so a team that doesn't work in either of
those repos can advance the panel without having to understand them whole.

The root of the repo (everything except `frontend/`) stays a pure Python data
pipeline — it writes to Neon and does not serve `frontend/` itself.

## `frontend/` — Connect Flotas (Vercel project, Node)

Self-contained: `index.html`/`index.css`/`index.js` (the dashboard — KPIs,
mapa con heatmap/rutas, rendimiento, unidades, conectividad) + `api/data.js`
(the only server code, reads Neon for `dataset=metricas|heat|rutas`). No
login of its own and no `buses_en_sucursal` access here — those stay in
Portal Connect's own `api/flota.js` (`dataset=buses`, the "Buses en Taller"
page).

`dataset=rutas` reads `bus_viajes` (see `rutas/README.md` at the repo root —
**manual export, not on the daily cron**, geometry already decoded/simplified
to `polyline` jsonb at write time). It's a visual overlay of recent trips, by
`vin` (one bus) or `empresa` (capped to the 3 latest trips per bus so the map
doesn't flood) — per the 2026-10-19 product decision, it never
identifies/names routes. With neither param it returns the distinct `vin`
list that have trips, which `index.js` intersects with `metricas` (now also
selecting `vin`) to build the unit picker — avoids a second round-trip just
to know which buses have route data.

Access is a one-time SSO handoff, not a second login: Portal Connect already
holds the real session (SAML/Supabase) and the allowlist
(`api/_allowlist.js` there). When a user clicks the "Connect Flotas" card on
its Inicio page, Portal Connect's `api/flota.js` (`dataset=flotas-sso` —
folded into the same file as `buses`/`metricas`/`pantalla`, not its own
file, to stay under Vercel Hobby's 12-function cap) checks that session +
allowlist and mints a short-lived JWT, then redirects to
`https://connect.grupokaufmann.com/flotas?t=<jwt>` (rewritten by Portal
Connect's `vercel.json` to this project). `frontend/api/data.js` only
verifies that JWT (shared secret `FLOTAS_SSO_SECRET`, set in **both**
projects) — it does not re-check the session or the allowlist, it trusts that
Portal Connect already did.

`@neondatabase/serverless` returns Postgres `numeric` columns as strings, not
numbers — `index.js` sums `km_30d` across rows for the per-empresa charts, so
`api/data.js` casts those fields to `Number` before responding. Don't remove
that cast; without it the sums silently become string concatenation (garbage
numbers, `Infinity` on the km/día KPI) instead of a type error.

Local dev needs Vercel env vars pulled (`vercel env pull` from inside
`frontend/`, requires access to the `connect-flotas` Vercel project) — there's
no `.env.example` for this folder, unlike the Python root.

## Commands

```bash
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL + read-only S3 credentials

python metricas_bus.py hoy        # writes today into buses_metricas (Neon)
python metricas_bus.py validar    # debug: fleet km and rendimiento over the last 30 days
python buses_en_sucursal.py       # 200 m radius by default -> buses_en_sucursal.xlsx + Neon
python buses_en_sucursal.py 500   # different radius, in meters
```

There is no test suite, lint config, or build step in this repo — these CLI
commands (and reading their printed output / the generated `.xlsx`) are the
only way to validate a change.

`rutas/` (table `bus_viajes`) is manual, has its own runtime (Python 3.14,
`polars`), and depends on a 3.2GB+ mart from a different repo. Read
`rutas/README.md` before touching it. It isn't run from this directory in
practice — see "Three different runtimes" below.

## Data flow (read this before touching `cargar.py`, `metricas_bus.py`, or `buses_en_sucursal.py`)

```
dataQS (separate repo, its own GitHub Actions, 08-11 Santiago window)
  runs dataQS.py (pulls Copiloto API, joins with the master)
  uploads to S3:
      s3://.../inner/master_status_inner_qs_ready.csv
      s3://.../inner/campos_internos.csv   (categoria, excluida_90d,
                                             en_panne, modelo_final, gps_speed)
         |
panel-buses (this repo, own GitHub Actions, 09-12 Santiago window —
             one hour after QS, deliberately, so those CSVs are already fresh)
  cargar.py downloads both CSVs from S3 and merges them on VIN_norm
  metricas_bus.py       -> Neon: buses_metricas
  buses_en_sucursal.py  -> Neon: buses_en_sucursal
```

This repo never runs `dataQS.py` and has no access to the Copiloto API — it
only reads the two CSVs that QS already uploaded. If QS didn't run that day,
this repo just rewrites yesterday's data (doesn't fail, doesn't advance).

`cargar.py` is a **deliberately narrow mirror** of `reporte.cargar()` in the
QS repo: it only reconstructs the ~6 derived columns these two scripts need
(`cat`, `telemetria`, `integracion`, `excluida_90d`, `en_panne`). **If those
rules change in QS, they have to be replicated here by hand** — same
documented risk/pattern as `can_caido.py` in QS. Before changing a derivation
rule in `cargar.py`, compare it against `reporte.py:cargar()` in the QS repo.

## The three tables

| Table | Written by | Cron | Universe |
|---|---|---|---|
| `buses_metricas` | `metricas_bus.py` | Daily, automatic | Entire BUS category, with or without telemetry plan |
| `buses_en_sucursal` | `buses_en_sucursal.py` | Daily, automatic | Buses whose last known position falls within 200 m of a sucursal |
| `bus_viajes` | `rutas/export_bus_viajes_neon.py` | **Manual**, no cron | Recent trips per bus (viewer, not route analytics) |

Full DDL is in `schema.sql`, but it's documentation only — the real DDL lives
embedded in the code (`CREATE TABLE IF NOT EXISTS`, no migrations) in `db.py`
(first two tables) and `rutas/export_bus_viajes_neon.py` (`bus_viajes`, since
it runs under a different runtime).

All three are idempotent: `buses_metricas` / `buses_en_sucursal` do
DELETE+INSERT for the day's date; `bus_viajes` does a full TRUNCATE + reinsert
every run (no date partitioning — it's a rolling window of recent trips, not
history).

`buses_metricas` does **not** store km driven or rendimiento (km/L) — those
are computed on read by delta between two dates' snapshots (see
`metricas_bus.calcular_rango()`), so any window (7/30/90 days) comes from the
same table.

## Module map

- **`cargar.py`** — the only place that talks to S3. Downloads+merges the two
  QS CSVs, derives `cat`/`telemetria`/`integracion`/`excluida_90d`/`en_panne`.
  Both `metricas_bus.py` and `geo.py` (and transitively `buses_en_sucursal.py`)
  build on top of its output DataFrame.
- **`geo.py`** — Haversine matching between fleet positions and
  `inputs/talleres.xlsx` (sucursales). `flota_con_posicion()` wraps
  `cargar.cargar()` and filters to rows with a usable GPS fix.
- **`db.py`** — the only place that talks to Neon for `buses_metricas` /
  `buses_en_sucursal` (DDL + DELETE+INSERT writers). `disponible()` gates on
  `DATABASE_URL` being set; callers treat a missing DB as non-fatal, not an
  error.
- **`metricas_bus.py`** / **`buses_en_sucursal.py`** — the two daily
  entrypoints. Both are non-blocking by design: a missing `DATABASE_URL`, S3
  error, or Neon error should not fail the GitHub Actions job (see the
  `continue-on-error: true` steps in the workflow and the try/except in each
  script's `__main__`). Preserve that contract when editing them.
- **`rutas/`** — self-contained sub-pipeline for `bus_viajes`, isolated from
  the rest of the repo on purpose (different Python version, different
  dependencies, different data source). `loader.py` (EWKB/WKT decoding) and
  `geometry.py` (Douglas-Peucker simplification) are verbatim copies from the
  `rendimientos.kf` repo, kept minimal to avoid depending on that repo's full
  ~3.2GB+ ingestion pipeline.

## Three different runtimes

- Root scripts (`cargar.py`, `metricas_bus.py`, `buses_en_sucursal.py`,
  `geo.py`, `db.py`): Python 3.13, pinned in `requirements.txt` to match QS's
  pandas/CSV-reading behavior exactly.
- `rutas/export_bus_viajes_neon.py`: Python 3.14 (`py -3.14`), separate
  `rutas/requirements.txt` (`polars`), and is typically run **from inside a
  checkout of `rendimientos.kf`**, with this repo's `rutas/` passed as a
  dependency — not from this repo's own directory — because it needs that
  repo's `data/marts/trips_features/` parquet mart on disk (or
  `TRIPS_FEATURES_GLOB` pointed at it). It also depends on `buses_metricas`
  already having today's data (reads it for the canonical VIN/empresa/modelo
  list), so `metricas_bus.py hoy` must run first.
- GitHub Actions (`.github/workflows/panel-buses-diario.yml`): Python 3.13,
  runs only the two daily scripts. `rutas/` is never run there.

## Cron / GitHub Actions

`.github/workflows/panel-buses-diario.yml` fires at several backup times
(`:37`, offset from QS's `:17` to avoid contending for the same runner
minute) inside a Santiago 09-12 window, with a runtime guard that skips
actual work outside that window (GitHub Actions schedules drift/get dropped).
`concurrency` serializes overlapping runs. Both daily steps use
`continue-on-error: true` — a script failing doesn't fail the job.

Secrets required: `DATABASE_URL` (same Neon connection string as QS),
`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (read-only access to QS's S3
bucket).

## Relationship to other repos

| Repo | What it is | Relationship to this one |
|---|---|---|
| `dataQS` | The fleet pipeline (Copiloto API + master + QuickSight) | Source of the two CSVs in S3. Don't touch its cron without coordinating — as of extraction (2026-10-22), QS still runs `metricas_bus.py`/`buses_en_sucursal.py` itself too, in parallel, as a safety net |
| `rendimientos.kf` (local folder `flespi-routes`) | Fuel efficiency / ML models, large unrelated project | Source of `rutas/export_bus_viajes_neon.py` and its `trips_features` mart |
| Portal Connect | The company portal (separate repo) | Reads `buses_en_sucursal`/`buses_metricas` itself for its own "Buses en Taller" page, and mints the SSO token that lets users into this repo's `frontend/` (Connect Flotas). Coordinate schema changes with that team, and keep `FLOTAS_SSO_SECRET` in sync in both Vercel projects if it's ever rotated |

Known gap: a GCP connector was provisioned (credentials only, in
`rendimientos.kf`'s `.env`: `BASEDEDATOSGCP`/`USUARIOGCP`/`PASSWORDGCP`) for a
possibly fresher trips data source, but no code uses it anywhere — it's
unbuilt, not half-finished. See `rutas/README.md` for details before starting
that work.

Historical backfill (a `backfill` command that repopulated months of history
from QS's raw `vehicles_records_*.csv`) was not ported — that raw data never
leaves QS. If backfill is needed, run it from the QS repo instead.
