require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const path = require('node:path');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  connectionTimeoutMillis: 8000,
  idleTimeoutMillis: 10000
});

const MAX_SERVICES_PER_BOOKING = 6;
const MAX_BOOKING_DURATION = 360;

const q = (s, p = []) => pool.query(s, p);
const fail = (status, message) => Object.assign(new Error(message), { status });
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw fail(503, 'Configuración pendiente');
  return s;
};

const sign = (kind, id, ttl) => {
  const p = Buffer.from(JSON.stringify({ kind, id, exp: Date.now() + ttl })).toString('base64url');
  return p + '.' + crypto.createHmac('sha256', secret()).update(p).digest('base64url');
};

function verify(token, kind) {
  try {
    const [p, h, ...rest] = String(token || '').split('.');
    if (rest.length || !p || !h) return null;
    const expected = crypto.createHmac('sha256', secret()).update(p).digest();
    const actual = Buffer.from(h, 'base64url');
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
    const v = JSON.parse(Buffer.from(p, 'base64url'));
    return v.kind === kind && v.exp > Date.now() ? v : null;
  } catch {
    return null;
  }
}

const tx = async fn => {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const result = await fn(c);
    await c.query('COMMIT');
    return result;
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
};

const id = v => {
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n < 1) throw fail(400, 'Identificador inválido');
  return n;
};

const str = (v, max, required = false) => {
  if (v == null) v = '';
  if (typeof v !== 'string' || v.length > max || (required && !v.trim())) throw fail(400, 'Datos inválidos');
  return v.trim();
};

const duration = v => {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 15 || n > 180) throw fail(400, 'Duración inválida');
  return n;
};

const today = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

const dateValue = v => {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) throw fail(400, 'Fecha inválida');
  const d = new Date(v + 'T12:00:00Z');
  if (!Number.isFinite(+d) || d.toISOString().slice(0, 10) !== v) throw fail(400, 'Fecha inválida');
  return d;
};

const parseServiceIds = (rawList, fallbackSingle) => {
  let items;
  if (Array.isArray(rawList)) {
    items = rawList;
  } else if (typeof rawList === 'string' && rawList.trim()) {
    items = rawList.split(',').map(v => v.trim()).filter(Boolean);
  } else if (fallbackSingle !== undefined && fallbackSingle !== null && String(fallbackSingle).trim() !== '') {
    items = [fallbackSingle];
  } else {
    throw fail(400, 'Debe seleccionar al menos un servicio');
  }
  const unique = [];
  for (const item of items) {
    const n = id(item);
    if (!unique.includes(n)) unique.push(n);
  }
  if (!unique.length) throw fail(400, 'Debe seleccionar al menos un servicio');
  if (unique.length > MAX_SERVICES_PER_BOOKING) {
    throw fail(400, `Máximo ${MAX_SERVICES_PER_BOOKING} servicios por turno`);
  }
  return unique;
};

const loadSelectedServices = async (c, serviceIds) => {
  const { rows } = await c.query(
    'SELECT id, name, duration_minutes FROM services WHERE id = ANY($1::int[]) AND is_active = true',
    [serviceIds]
  );
  const byId = new Map(rows.map(r => [r.id, r]));
  if (byId.size !== serviceIds.length) throw fail(404, 'Servicio no encontrado');
  const ordered = serviceIds.map(sid => byId.get(sid));
  const totalDuration = ordered.reduce((sum, s) => sum + s.duration_minutes, 0);
  if (totalDuration > MAX_BOOKING_DURATION) {
    throw fail(400, `La duración total supera el máximo de ${MAX_BOOKING_DURATION} minutos por turno`);
  }
  return { ordered, totalDuration };
};

let schemaReady;
const ensureMultiServiceSchema = () => {
  if (!schemaReady) {
    schemaReady = (async () => {
      await q('ALTER TABLE appointments ADD COLUMN IF NOT EXISTS duration_minutes INTEGER CHECK (duration_minutes IS NULL OR duration_minutes > 0)');
      await q(`CREATE TABLE IF NOT EXISTS appointment_services (
        appointment_id INTEGER NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
        service_id INTEGER NOT NULL REFERENCES services(id),
        duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (appointment_id, service_id)
      )`);
      await q('CREATE INDEX IF NOT EXISTS appointment_services_service_idx ON appointment_services(service_id)');
    })().catch(err => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
};

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'no-referrer');
  if (req.path.startsWith('/api/')) res.set('Cache-Control', 'no-store');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));

const throttle = async (req, key, max) => {
  const ip = req.headers['x-vercel-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const digest = crypto.createHmac('sha256', secret()).update(key + ':' + ip).digest('hex');
  const { rows } = await q(
    "INSERT INTO request_limits(bucket,window_start,hits) VALUES($1,date_trunc('hour',now()),1) ON CONFLICT(bucket) DO UPDATE SET hits=CASE WHEN request_limits.window_start=excluded.window_start THEN request_limits.hits+1 ELSE 1 END,window_start=excluded.window_start RETURNING hits",
    [digest]
  );
  if (rows[0].hits > max) throw fail(429, 'Intenta más tarde');
};

app.post(
  '/api/admin/login',
  wrap(async (req, res) => {
    await throttle(req, 'login', 10);
    const password = str(req.body.password, 200, true);
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash || !(await bcrypt.compare(password, hash))) throw fail(401, 'Credenciales inválidas');
    res.json({ token: sign('admin', 1, 3600000), name: 'Administrador' });
  })
);

app.use('/api/admin', (req, res, next) =>
  verify(req.headers.authorization?.replace(/^Bearer /, ''), 'admin') ? next() : next(fail(401, 'No autorizado'))
);

app.get(
  '/health',
  wrap(async (req, res) => {
    await q('SELECT 1');
    res.json({ ok: true });
  })
);

app.get(
  '/api/services',
  wrap(async (req, res) =>
    res.json((await q('SELECT id,name,description,duration_minutes FROM services WHERE is_active=true ORDER BY name')).rows)
  )
);

app.post(
  '/api/register',
  wrap(async (req, res) => {
    await throttle(req, 'register', 30);
    const b = req.body;
    const email = str(b.email, 254, true).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail(400, 'Email inválido');
    const vals = [
      str(b.full_name, 150, true),
      email,
      str(b.phone, 40, true),
      str(b.country, 100),
      str(b.doc_type, 50),
      str(b.doc_number, 80),
      ['es', 'pt', 'en', 'ru', 'zh'].includes(b.language) ? b.language : 'es',
      str(b.notes, 2500)
    ];
    const { rows } = await q(
      'INSERT INTO clients(full_name,email,phone,country,doc_type,doc_number,language,notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
      vals
    );
    res.json({ success: true, client_id: rows[0].id, registration_token: sign('client', rows[0].id, 900000) });
  })
);

app.get(
  '/api/slots',
  wrap(async (req, res) => {
    await ensureMultiServiceSchema();
    const date = req.query.date;
    const d = dateValue(date);
    const serviceIds = parseServiceIds(req.query.service_ids, req.query.service_id);
    if (date < today() || +d > Date.now() + 91 * 86400000 || [0, 6].includes(d.getUTCDay())) return res.json([]);

    const rows = await tx(async c => {
      const { ordered, totalDuration } = await loadSelectedServices(c, serviceIds);
      const primaryServiceId = ordered[0].id;
      const slotStep =
        ordered.length === 1
          ? ordered[0].duration_minutes
          : ordered.every(s => s.duration_minutes % 30 === 0)
            ? 30
            : 15;

      await c.query(
        "INSERT INTO time_slots(date,time,service_id,status) SELECT $1::date,t::time,$2,'available' FROM generate_series($1::date+time '09:00',$1::date+time '18:00'-make_interval(mins=>$3),make_interval(mins=>$4)) t ON CONFLICT(date,time,service_id) DO NOTHING",
        [date, primaryServiceId, totalDuration, slotStep]
      );

      return (
        await c.query(
          `SELECT
            t.id AS slot_id,
            t.date::text,
            to_char(t.time,'HH24:MI') AS time,
            to_char(t.time + make_interval(mins => $3),'HH24:MI') AS end_time,
            $3::int AS duration_minutes,
            (
              t.status='available'
              AND (t.date+t.time) > (now() AT TIME ZONE 'America/Argentina/Buenos_Aires')
              AND NOT EXISTS(
                SELECT 1
                FROM appointments a
                JOIN time_slots x ON x.id=a.slot_id
                JOIN services s ON s.id=x.service_id
                WHERE a.status<>'cancelled'
                  AND x.date=t.date
                  AND x.time < t.time + make_interval(mins => $3)
                  AND t.time < x.time + make_interval(mins => COALESCE(a.duration_minutes, s.duration_minutes))
              )
            ) AS available
          FROM time_slots t
          WHERE t.date=$1
            AND t.service_id=$2
            AND t.time>=time '09:00'
            AND t.time + make_interval(mins => $3) <= time '18:00'
            AND (extract(epoch from t.time-time '09:00')::int % ($4*60))=0
          ORDER BY t.time`,
          [date, primaryServiceId, totalDuration, slotStep]
        )
      ).rows;
    });
    res.json(rows);
  })
);

app.post(
  '/api/book',
  wrap(async (req, res) => {
    await ensureMultiServiceSchema();
    await throttle(req, 'book', 30);
    const client = id(req.body.client_id);
    const slot = id(req.body.slot_id);
    if (verify(req.body.registration_token, 'client')?.id !== client) throw fail(401, 'Registro expirado');

    const result = await tx(async c => {
      await c.query('SELECT pg_advisory_xact_lock(772019)');
      const s = (
        await c.query(
          "SELECT t.*,s.duration_minutes FROM time_slots t JOIN services s ON s.id=t.service_id WHERE t.id=$1 AND s.is_active=true AND t.date+t.time>now() AT TIME ZONE 'America/Argentina/Buenos_Aires' FOR UPDATE OF t",
          [slot]
        )
      ).rows[0];
      if (!s || s.status !== 'available') throw fail(409, 'Turno no disponible');

      const requestedIds =
        req.body.service_ids !== undefined ? parseServiceIds(req.body.service_ids) : [s.service_id];
      if (requestedIds[0] !== s.service_id) {
        if (!requestedIds.includes(s.service_id)) throw fail(400, 'El horario no corresponde a los servicios seleccionados');
      }
      const { ordered, totalDuration } = await loadSelectedServices(c, requestedIds);

      const fitsRow = (
        await c.query("SELECT (t.time + make_interval(mins => $2) <= time '18:00') AS fits FROM time_slots t WHERE t.id=$1", [
          slot,
          totalDuration
        ])
      ).rows[0];
      if (!fitsRow?.fits) throw fail(409, 'El horario elegido no alcanza para la duración total de los servicios');

      const conflict = await c.query(
        "SELECT 1 FROM appointments a JOIN time_slots t ON t.id=a.slot_id JOIN services sv ON sv.id=t.service_id WHERE a.status<>'cancelled' AND t.date=$1 AND t.time<$2::time+make_interval(mins=>$3) AND $2::time<t.time+make_interval(mins=>COALESCE(a.duration_minutes, sv.duration_minutes)) LIMIT 1",
        [s.date, s.time, totalDuration]
      );
      if (conflict.rowCount) throw fail(409, 'Turno no disponible');

      const used = await c.query('SELECT 1 FROM appointments WHERE client_id=$1', [client]);
      if (used.rowCount) throw fail(409, 'Registro ya utilizado');

      const a = (
        await c.query(
          "INSERT INTO appointments(client_id,slot_id,status,duration_minutes) VALUES($1,$2,'pending',$3) RETURNING id",
          [client, slot, totalDuration]
        )
      ).rows[0];

      for (let i = 0; i < ordered.length; i++) {
        await c.query(
          'INSERT INTO appointment_services(appointment_id,service_id,duration_minutes,position) VALUES($1,$2,$3,$4)',
          [a.id, ordered[i].id, ordered[i].duration_minutes, i]
        );
      }

      await c.query("UPDATE time_slots SET is_booked=true,client_id=$1,status='booked' WHERE id=$2", [client, slot]);
      return { appointment_id: a.id, services: ordered, total_duration_minutes: totalDuration };
    });

    res.json({
      success: true,
      appointment_id: result.appointment_id,
      services: result.services,
      total_duration_minutes: result.total_duration_minutes,
      notification: 'not_configured'
    });
  })
);

app.get(
  '/api/admin/appointments',
  wrap(async (req, res) => {
    await ensureMultiServiceSchema();
    const stats = (
      await q(
        "SELECT count(*)::int total,count(*) FILTER(WHERE a.status='pending')::int pending,count(*) FILTER(WHERE a.status='confirmed')::int confirmed,count(*) FILTER(WHERE a.status='completed')::int completed,count(*) FILTER(WHERE t.date=(now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date)::int today FROM appointments a JOIN time_slots t ON t.id=a.slot_id"
      )
    ).rows[0];
    const turns = (
      await q(`
        SELECT
          a.id AS appointment_id,
          a.status,
          a.admin_notes,
          a.created_at,
          a.updated_at,
          c.full_name,
          c.email,
          c.phone,
          c.country,
          c.doc_type,
          c.doc_number,
          c.language,
          c.notes AS request_details,
          COALESCE(
            (SELECT string_agg(sv.name, ' + ' ORDER BY aps.position, aps.service_id)
             FROM appointment_services aps
             JOIN services sv ON sv.id = aps.service_id
             WHERE aps.appointment_id = a.id),
            s.name
          ) AS service_name,
          COALESCE(
            (SELECT json_agg(
               json_build_object('id', sv.id, 'name', sv.name, 'duration_minutes', aps.duration_minutes)
               ORDER BY aps.position, aps.service_id
             )
             FROM appointment_services aps
             JOIN services sv ON sv.id = aps.service_id
             WHERE aps.appointment_id = a.id),
            json_build_array(json_build_object('id', s.id, 'name', s.name, 'duration_minutes', s.duration_minutes))
          ) AS services,
          COALESCE(a.duration_minutes, s.duration_minutes) AS total_duration_minutes,
          t.date::text,
          to_char(t.time,'HH24:MI') AS time,
          to_char(t.time + make_interval(mins => COALESCE(a.duration_minutes, s.duration_minutes)),'HH24:MI') AS end_time,
          t.status AS slot_status
        FROM appointments a
        JOIN clients c ON c.id=a.client_id
        JOIN time_slots t ON t.id=a.slot_id
        JOIN services s ON s.id=t.service_id
        ORDER BY t.date DESC, t.time
        LIMIT 500
      `)
    ).rows;
    res.json({ stats, turns });
  })
);

app.patch(
  '/api/admin/appointments/:id/status',
  wrap(async (req, res) => {
    const target = req.body.status;
    const n = id(req.params.id);
    await tx(async c => {
      await c.query('SELECT pg_advisory_xact_lock(772019)');
      const a = (await c.query('SELECT * FROM appointments WHERE id=$1 FOR UPDATE', [n])).rows[0];
      if (!a) throw fail(404, 'Turno no encontrado');
      const transitions = {
        pending: ['confirmed', 'in_progress', 'cancelled'],
        confirmed: ['in_progress', 'cancelled'],
        in_progress: ['completed', 'cancelled'],
        completed: [],
        cancelled: []
      };
      if (a.status === target) return;
      if (!transitions[a.status]?.includes(target)) throw fail(409, 'Cambio inválido');
      await c.query('UPDATE appointments SET status=$1,updated_at=now() WHERE id=$2', [target, n]);
      if (target === 'cancelled') {
        await c.query("UPDATE time_slots SET status='available',is_booked=false,client_id=NULL WHERE id=$1", [a.slot_id]);
      }
    });
    res.json({ success: true });
  })
);

app.put(
  '/api/admin/appointments/:id/notes',
  wrap(async (req, res) => {
    await q('UPDATE appointments SET admin_notes=$1,updated_at=now() WHERE id=$2', [
      str(req.body.admin_notes, 2000),
      id(req.params.id)
    ]);
    res.json({ success: true });
  })
);

app.get(
  '/api/admin/services',
  wrap(async (req, res) => res.json((await q('SELECT * FROM services ORDER BY name')).rows))
);

app.post(
  '/api/admin/services',
  wrap(async (req, res) => {
    const b = req.body;
    const row = (
      await q('INSERT INTO services(name,description,duration_minutes) VALUES($1,$2,$3) RETURNING id', [
        str(b.name, 150, true),
        str(b.description, 1000),
        duration(b.duration_minutes)
      ])
    ).rows[0];
    res.json({ success: true, id: row.id });
  })
);

app.put(
  '/api/admin/services/:id',
  wrap(async (req, res) => {
    await ensureMultiServiceSchema();
    const b = req.body;
    const n = id(req.params.id);
    await tx(async c => {
      await c.query('SELECT pg_advisory_xact_lock(772019)');
      const old = (await c.query('SELECT * FROM services WHERE id=$1 FOR UPDATE', [n])).rows[0];
      if (!old) throw fail(404, 'Servicio no encontrado');
      const d = b.duration_minutes === undefined ? old.duration_minutes : duration(b.duration_minutes);
      if (
        d !== old.duration_minutes &&
        (
          await c.query(
            "SELECT 1 FROM appointments a JOIN time_slots t ON t.id=a.slot_id LEFT JOIN appointment_services aps ON aps.appointment_id=a.id WHERE a.status<>'cancelled' AND (t.service_id=$1 OR aps.service_id=$1) LIMIT 1",
            [n]
          )
        ).rowCount
      ) {
        throw fail(409, 'Servicio con reservas: crea uno nuevo para cambiar duración');
      }
      await c.query('UPDATE services SET name=$1,description=$2,duration_minutes=$3,is_active=$4 WHERE id=$5', [
        b.name === undefined ? old.name : str(b.name, 150, true),
        b.description === undefined ? old.description : str(b.description, 1000),
        d,
        typeof b.is_active === 'boolean' ? b.is_active : old.is_active,
        n
      ]);
    });
    res.json({ success: true });
  })
);

app.delete(
  '/api/admin/services/:id',
  wrap(async (req, res) => {
    await q('UPDATE services SET is_active=false WHERE id=$1', [id(req.params.id)]);
    res.json({ success: true });
  })
);

app.get('/api/admin/horarios', (req, res) =>
  res.json(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ({ day, start: '09:00', end: '18:00' })))
);

app.use((err, req, res, next) => {
  const status = err.status || (err.code === '23505' ? 409 : 500);
  res.status(status).json({ error: status === 500 ? 'Error interno' : err.status ? err.message : 'Conflicto' });
});

if (require.main === module && !process.env.VERCEL) app.listen(process.env.PORT || 3000);
module.exports = app;
