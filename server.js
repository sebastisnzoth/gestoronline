require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const path = require('path');
const { getDb, closeDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Transports para notificaciones
let emailTransporter = null;
if (process.env.SMTP_HOST) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : null,
  });
}

// ===== ADMIN AUTH =====
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = btoa(`${Date.now()}:${ADMIN_PASSWORD}`);
    res.json({ token, name: 'Administrador' });
  } else {
    res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

// ===== CLIENTES =====
app.post('/api/register', (req, res) => {
  try {
    const db = getDb();
    const { full_name, email, phone, country, doc_type, doc_number, language, notes } = req.body;
    
    // Verificar si ya existe
    const existing = db.prepare('SELECT id FROM clients WHERE email = ? OR phone = ?').get(email, phone);
    
    let clientId;
    if (existing) {
      clientId = existing.id;
      db.prepare(`UPDATE clients SET full_name=?, country=?, doc_type=?, doc_number=?, language=?, notes=? WHERE id=?`)
        .run(full_name, country, doc_type, doc_number, language, notes, clientId);
    } else {
      const result = db.prepare(`INSERT INTO clients (full_name, email, phone, country, doc_type, doc_number, language, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(full_name, email, phone, country, doc_type, doc_number, language || 'es', notes || '');
      clientId = result.lastInsertRowid;
    }
    
    res.json({ success: true, client_id: Number(clientId), message: 'Registro exitoso' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// ===== SERVICIOS =====
app.get('/api/services', (req, res) => {
  try {
    const db = getDb();
    const services = db.prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY name").all();
    res.json(services);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Horarios disponibles para una fecha y servicio (materializa slots en BD)
app.get('/api/slots', (req, res) => {
  try {
    const db = getDb();
    const { date, service_id } = req.query;
    
    if (!date || !service_id) {
      return res.status(400).json({ error: 'Faltan parámetros: date, service_id' });
    }
    
    const service = db.prepare('SELECT duration_minutes FROM services WHERE id = ?').get(service_id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    
    const duration = service.duration_minutes || 30;
    const today = new Date();
    const dateObj = new Date(date + 'T12:00:00');
    // Solo se permiten fechas a partir de hoy
    if (dateObj < new Date(today.toDateString())) {
      return res.json([]);
    }
    // Solo días hábiles (lun-vie)
    const day = dateObj.getDay();
    if (day === 0 || day === 6) {
      return res.json([]);
    }
    
    const slots = [];
    const findSlot = db.prepare('SELECT id, status, client_id FROM time_slots WHERE date = ? AND time = ? AND service_id = ?');
    const insertSlot = db.prepare("INSERT INTO time_slots (date, time, service_id, status) VALUES (?, ?, ?, 'available')");
    
    for (let h = 9; h < 18; h++) {
      for (let m = 0; m < 60; m += duration) {
        // El turno debe terminar antes de las 18:00
        if (h + Math.ceil(m / 60) > 18) continue;
        
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        let slot = findSlot.get(date, timeStr, service_id);
        
        if (!slot) {
          // Materializar el slot en la base de datos
          const r = insertSlot.run(date, timeStr, service_id);
          slot = { id: Number(r.lastInsertRowid), status: 'available', client_id: null };
        }
        
        slots.push({
          date,
          time: timeStr,
          available: slot.status === 'available',
          slot_id: slot.id
        });
      }
    }
    
    res.json(slots);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Reservar turno
app.post('/api/book', async (req, res) => {
  try {
    const db = getDb();
    const { client_id, slot_id } = req.body;
    
    const slot = db.prepare('SELECT * FROM time_slots WHERE id = ?').get(slot_id);
    if (!slot || slot.status !== 'available') {
      return res.status(400).json({ error: 'Turno no disponible' });
    }
    
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(client_id);
    if (!client) return res.status(400).json({ error: 'Cliente no encontrado' });
    
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Todo el alta de turno en una transacción: si falla la notificación,
    // appointment y slot se deshacen (no quedan huérfanos).
    const createAppointment = db.transaction(() => {
      const apptId = db.prepare(`INSERT INTO appointments (client_id, slot_id, status) VALUES (?, ?, 'pending')`)
        .run(client_id, slot_id).lastInsertRowid;

      db.prepare('UPDATE time_slots SET is_booked = 1, client_id = ?, status = ? WHERE id = ?')
        .run(client_id, 'booked', slot_id);

      // better-sqlite3 solo enlaza números/cadenas/buffers/null: usamos 0/1, no booleanos JS.
      db.prepare(
        'INSERT INTO notifications (appointment_id, type, channel, to_email, to_phone, sent, error) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(apptId, 'appointment_created', 'email', client.email, client.phone, 0, null);

      return Number(apptId);
    });

    const appointmentId = createAppointment();

    // Enviar email (si configurado)
    if (emailTransporter) {
      try {
        await sendEmailNotification(client, slot);
        db.prepare('UPDATE notifications SET sent = 1 WHERE appointment_id = ? AND channel = "email"')
          .run(appointmentId);
      } catch (e) {
        console.log('Error envando email:', e.message);
        db.prepare('UPDATE notifications SET sent = 0, error = ? WHERE appointment_id = ? AND channel = "email"')
          .run(e.message.slice(0, 200), appointmentId);
      }
    }

    // WhatsApp (mock hasta configurar)
    sendWhatsAppNotification(client, slot).catch(() => {});

    res.json({ success: true, appointment_id: appointmentId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

async function sendEmailNotification(client, slot) {
  const subject = 'Confirmación de Turno - Gestoría';
  const html = `
    <h2>¡Turno confirmado!</h2>
    <p>Hola ${client.full_name}, tu turno ha sido registrado correctamente.</p>
    <ul>
      <li><strong>Servicio:</strong> [Nombre del servicio]</li>
      <li><strong>Fecha:</strong> ${slot.date}</li>
      <li><strong>Hora:</strong> ${slot.time}</li>
    </ul>
    <p>Te esperamos en la gestoría.</p>
  `;
  
  await emailTransporter.sendMail({
    from: process.env.SMTP_FROM || 'gestoria@ejemplo.com',
    to: client.email,
    subject,
    html
  });
}

async function sendWhatsAppNotification(client, slot) {
  // Placeholder para integración con WhatsApp API
  console.log(`[WSP-MOCK] To: ${client.phone} | Mensaje: Turno confirmado - ${slot.date} ${slot.time}`);
}

// ===== PANEL DE CONTROL (Admin API) =====
app.get('/api/admin/appointments', (req, res) => {
  const db = getDb();
  const stats = {
    total: db.prepare('SELECT COUNT(*) as c FROM appointments').get().c,
    pending: db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'pending'").get().c,
    confirmed: db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'confirmed'").get().c,
    completed: db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'completed'").get().c,
    today: db.prepare(`
      SELECT COUNT(*) as c FROM appointments a 
      JOIN time_slots t ON a.slot_id = t.id 
      WHERE t.date = DATE('now')
    `).get().c
  };
  
  const turnos = db.prepare(`
    SELECT 
      a.id as appointment_id, a.status, a.admin_notes, a.created_at, a.updated_at,
      c.full_name, c.email, c.phone, c.country, c.doc_type, c.doc_number, c.language,
      s.name as service_name, t.date, t.time, t.status as slot_status
    FROM appointments a
    JOIN clients c ON a.client_id = c.id
    JOIN time_slots t ON a.slot_id = t.id
    JOIN services s ON t.service_id = s.id
    ORDER BY t.date DESC, t.time ASC
  `).all();
  
  res.json({ stats, turns: turnos });
});

app.patch('/api/admin/appointments/:id/status', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }
  
  db.prepare('UPDATE appointments SET status = ?, updated_at = datetime("now") WHERE id = ?').run(status, id);
  
  if (status === 'completed' || status === 'cancelled') {
    db.prepare('UPDATE time_slots SET status = "available", client_id = NULL WHERE id IN (SELECT slot_id FROM appointments WHERE id = ?)').run(id);
  }
  
  res.json({ success: true });
});

app.put('/api/admin/appointments/:id/notes', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { admin_notes } = req.body;
  
  db.prepare('UPDATE appointments SET admin_notes = ?, updated_at = datetime("now") WHERE id = ?').run(admin_notes, id);
  res.json({ success: true });
});

app.get('/api/admin/services', (req, res) => {
  const db = getDb();
  const services = db.prepare('SELECT * FROM services ORDER BY name').all();
  res.json(services);
});

app.post('/api/admin/services', (req, res) => {
  const db = getDb();
  const { name, description, duration_minutes } = req.body;
  
  const result = db.prepare('INSERT INTO services (name, description, duration_minutes) VALUES (?, ?, ?)').run(name, description, duration_minutes);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.put('/api/admin/services/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { name, description, duration_minutes, is_active } = req.body;
  
  db.prepare('UPDATE services SET name=?, description=?, duration_minutes=?, is_active=? WHERE id=?').run(name, description, duration_minutes, is_active, id);
  res.json({ success: true });
});

app.delete('/api/admin/services/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ===== HORARIOS =====
app.get('/api/admin/horarios', (req, res) => {
  // Retorna horarios existentes o default
  const defaultSchedule = Array.from({length: 5}, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
    start: '09:00',
    end: '18:00'
  }));
  res.json(defaultSchedule);
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Página principal: http://localhost:${PORT}/`);
  console.log(`   Panel admin:      http://localhost:${PORT}/admin`);
  console.log(`   Usuario: ${process.env.ADMIN_EMAIL || 'admin@gestoria.com'}`);
  console.log(`   Password: ${ADMIN_PASSWORD}\n`);
});
