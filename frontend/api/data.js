// api/data.js — GET /api/data?dataset=metricas|heat
// Backend propio de este proyecto (Connect Flotas), separado de portalConnect
// a propósito (igual que Connect Care / Connect Talleres son proyectos
// aparte). No hay login propio acá: el acceso se resuelve en portalConnect
// (sesión SAML/Supabase + allowlist), que al hacer clic en la tarjeta de
// Inicio mintea un JWT de un solo uso (ver api/flotas-sso.js en portalConnect)
// y redirige a /flotas?t=<jwt>. Este endpoint solo valida ESE token — no
// vuelve a chequear sesión ni allowlist, confía en que portalConnect ya lo
// hizo antes de firmar el JWT.
//
// Mismo Neon (rol portal_ro) que panel-buses y portalConnect. Las queries son
// las mismas que tenía portalConnect/api/flota.js (dataset=metricas, heat)
// antes de mudarse acá — incluye el cast a Number: @neondatabase/serverless
// devuelve columnas `numeric` como string, y el panel suma entre filas
// (km por empresa, km/día) con `+`, que concatena strings si no se castea.

const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');

const DATABASE_URL       = (process.env.DATABASE_URL || '').trim();
const FLOTAS_SSO_SECRET  = process.env.FLOTAS_SSO_SECRET || '';

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!DATABASE_URL) return res.status(503).json({ error: 'no configurado' });

  const dataset = String((req.query || {}).dataset || '').toLowerCase();
  if (dataset !== 'metricas' && dataset !== 'heat') {
    return res.status(400).json({ error: 'dataset inválido' });
  }

  const auth  = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (!token) return res.status(401).json({ error: 'no autorizado' });

  try {
    const payload = jwt.verify(token, FLOTAS_SSO_SECRET, { algorithms: ['HS256'] });
    if (payload.purpose !== 'flotas') {
      return res.status(403).json({ error: 'token no corresponde a esta app' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'token inválido o vencido' });
  }

  try {
    const sql = neon(DATABASE_URL);
    let rows;

    if (dataset === 'metricas') {
      rows = await sql`
        WITH f AS (SELECT max(fecha) AS hoy FROM buses_metricas),
             a AS (SELECT max(fecha) AS antes FROM buses_metricas, f
                   WHERE fecha <= f.hoy - INTERVAL '30 days'),
             d AS (
               SELECT h.*, (f.hoy - a.antes) AS ndias,
                      COALESCE(h.odo_can,h.odo_gps)-COALESCE(p.odo_can,p.odo_gps) AS dkm,
                      h.litros - p.litros AS dlit
               FROM buses_metricas h CROSS JOIN f CROSS JOIN a
               LEFT JOIN buses_metricas p ON p.vin=h.vin AND p.fecha=a.antes
               WHERE h.fecha=f.hoy)
        SELECT fecha::text AS fecha, patente, empresa, modelo,
               round(COALESCE(odo_can,odo_gps)::numeric,0) AS odometro,
               round(horas::numeric,0) AS horas_motor,
               dias_sin_gps, dias_sin_can, telemetria,
               CASE WHEN dkm > 0 AND dkm < 2000*ndias THEN round(dkm::numeric,0) END AS km_30d,
               CASE WHEN dkm > 0 AND dlit > 0 AND dkm/dlit BETWEEN 0.5 AND 8
                    THEN round((dkm/dlit)::numeric,2) END AS rinde_kml,
               lat, lon
        FROM d ORDER BY km_30d DESC NULLS LAST
      `;
      const num = v => (v === null || v === undefined ? null : Number(v));
      rows = rows.map(r => ({
        ...r,
        odometro: num(r.odometro), horas_motor: num(r.horas_motor),
        dias_sin_gps: num(r.dias_sin_gps), dias_sin_can: num(r.dias_sin_can),
        km_30d: num(r.km_30d), rinde_kml: num(r.rinde_kml),
        lat: num(r.lat), lon: num(r.lon),
      }));
      res.setHeader('Cache-Control', 'private, max-age=300');
      return res.json(rows);
    }

    // heat: densidad de posiciones de los últimos 90 días, redondeada a
    // ~100 m (3 decimales) — mismo criterio que preview/gen_preview.py.
    rows = await sql`
      WITH f AS (SELECT max(fecha) AS hoy FROM buses_metricas)
      SELECT round(lat::numeric, 3) AS lat, round(lon::numeric, 3) AS lon,
             empresa, count(*)::int AS n
      FROM buses_metricas, f
      WHERE fecha > f.hoy - INTERVAL '90 days'
        AND lat IS NOT NULL AND lon IS NOT NULL
      GROUP BY 1, 2, 3
    `;
    res.setHeader('Cache-Control', 'private, max-age=300');
    return res.json(rows.map(r => [Number(r.lat), Number(r.lon), r.n, r.empresa || '—']));
  } catch (err) {
    console.error('[api/data]', err.message);
    return res.status(500).json({ error: 'error interno' });
  }
};
