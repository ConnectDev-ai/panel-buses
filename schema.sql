-- Esquema de Neon para el panel de buses. Referencia de lectura; el DDL real
-- vive embebido en el código y se aplica solo (CREATE TABLE IF NOT EXISTS,
-- perezoso, sin migraciones separadas) — ver db.py y rutas/export_bus_viajes_neon.py.

-- Escrita por metricas_bus.py (este repo). DELETE+INSERT por fecha (idempotente).
-- Foto diaria por bus: odómetro, litros, horas, posición, conectividad.
-- Kilometraje y rendimiento NO se guardan: se calculan al leer por delta entre
-- dos fechas, así cualquier ventana (7/30/90 días) sale de la misma tabla.
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

-- Escrita por buses_en_sucursal.py (este repo). DELETE+INSERT por fecha.
-- Buses cuya última posición conocida cae dentro del radio de una sucursal.
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

-- Escrita por rutas/export_bus_viajes_neon.py (manual, NO en el cron diario).
-- TRUNCATE + re-insert completo en cada corrida (no particiona por fecha).
-- polyline en [lon, lat] -- Leaflet necesita invertir a [lat, lon] al leer.
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
