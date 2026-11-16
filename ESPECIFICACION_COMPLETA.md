# Especificación Técnica Completa — Gestoría Turnos Online

## 1. Resumen del Sistema

Sistema web de reservas de turnos para gestoría argentina especializada en atención a extranjeros. Permite que clientes extranjones reserven turnos online para trámites de documentación (DNI, Pasaporte, CUIT/CUIL, etc.) y que el personal administrativo gestione los turnos desde un panel de control.

**Propósito:** Reducir la carga telefónica, disminuir errores de agendamiento y ofrecer una experiencia autodidacta multilingüe.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión mínima |
|------|------------|----------------|
| Runtime | Node.js | ≥ 18 |
| Package manager | npm | ≥ 10 |
| Framework backend | Express | ^4.18.2 |
| Base de datos | SQLite (better-sqlite3, nativo) | ^9.4.3 |
| Alternative DB driver | sql.js (wasm) | ^1.10.3 |
| Hashing | bcryptjs | ^2.4.3 |
| Email | nodemailer | ^6.9.7 |
| Env config | dotenv | ^16.3.1 |
| Frontend CSS | Tailwind CDN | última |
| Fuente | Inter (Google Fonts) | — |
| Lenguaje | Vanilla JS (ESM/UMD commonjs) | — |

### Decisiones arquitectónicas

- **Single-process**: Todo corre en un solo hilo Node; no hay workers ni colas separadas.
- **Base de datos local**: SQLite con modo WAL (`journal_mode = WAL`) para concurrencia mejorada.
- **Sin build step**: HTML/CSS/JS estáticos sirvidos por Express; no hay bundler.
- **Autenticación decorativa**: Admin se autentica con contraseña hardcodeada (`ADMIN_PASSWORD`); no hay middleware real en routes.
- **Notificaciones**: Email usa nodemailer cuando SMTP está configurado; WhatsApp es mock (console.log). Ambas registran logs en tabla `notifications`.

---

## 3. Modelo de Datos (SQLite)

### Tablas principales

#### `admins`
```sql
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Seed**: Un registro creado con `ADMIN_PASSWORD` hash via bcryptjs.

#### `clients`
```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  doc_type TEXT,
  doc_number TEXT,
  language TEXT DEFAULT 'es',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email),
  UNIQUE(phone)
);
```
- **Upsert**: `POST /api/register` inserta o actualiza por email/teléfono.

#### `services`
```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Seed**: 15 servicios predefinidos (DNI internacional, Pasaporte, CUIT, etc.).

#### `time_slots`
```sql
CREATE TABLE time_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service_id INTEGER NOT NULL,
  is_booked BOOLEAN DEFAULT 0,
  client_id INTEGER,
  status TEXT DEFAULT 'available' CHECK(status IN ('available','booked','cancelled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
```
- **Materialización**: `GET /api/slots?date=&service_id=` genera filas ausentes sobre la marcha (no hay job cron).
- **Horario default**: Lun–Vie 09:00–18:00, zona `America/Sao_Paulo` (GMT-3).
- **Duración**: Cada servicio define cuántos minutos ocupa; los slots se calculan en incrementos de duración.

#### `appointments`
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  slot_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','confirmed','in_progress','completed','cancelled')),
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (slot_id) REFERENCES time_slots(id)
);
```

#### `notifications`
```sql
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER,
  type TEXT NOT NULL,
  channel TEXT NOT NULL,
  to_email TEXT,
  to_phone TEXT,
  sent BOOLEAN DEFAULT 0,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
```

---

## 4. Flujo de Reservas (Cliente)

### Wizard de 3 pasos

**Paso 1 — Selección de servicio**
- Usuario ve grid de servicios activos (tarjetas con nombre y descripción breve).
- Al hacer clic, se almacena `currentService = {id, name}` y se habilita Paso 2.

**Paso 2 — Selección de fecha y horario**
- Se muestra selector de fecha (`<input type="date">`).
- Al cambiar fecha, se llama `loadSlots(date)` → `GET /api/slots?date=YYYY-MM-DD&service_id=N`.
- Se renderizan horarios disponibles como botones; los ocupados aparecen deshabilitados.
- Validación de fin de semana (retorna error si la fecha cae en sábado/domingo).
- Al seleccionar slot, `currentSlot = {...}` y se habilita Paso 3.

**Paso 3 — Registro/confirmación**
- Formulario con campos: `full_name`, `email`, `phone`, `country`, `doc_type`, `doc_number`, `language`, `notes`.
- Al enviar:
  1. `POST /api/register` → obtiene `client_id`.
  2. `POST /api/book` con `{client_id, slot_id}` → obtiene `appointment_id`.
- Muestra confirmación con resumen del turno.

### Idiomas (i18n)
- Soporte: `es`, `pt`, `en`, `ru`, `zh`.
- Implementación: objeto JS `translations` con keys por idioma; atributos `data-i18n` en HTML; función `changeLang()` que re-renderiza textos y grilla de servicios.
- Todos los bloques de traducción deben tener las mismas keys (ej: `dateLabel`, `weekendError`, `nextStep`, etc.).

---

## 5. Panel de Administración

### Autenticación
- URL: `/admin`
- Login: formulario con campo `password`.
- Token generado: `btoa(Date.now() + ':' + ADMIN_PASSWORD)` → almacenado en `localStorage.adminToken`.
- No hay middleware de autenticación en rutas API (decorativo).

### Dashboard — Pestaña "Turnos"
- **Estadísticas** (cards): Total, Pendientes, Hoy, Completados.
- **Listado** de turnos con filtros por estado.
- **Acciones por turno**:
  - Confirmar (`PATCH .../status` con `confirmed`)
  - Iniciar (`in_progress`)
  - Completar (`completed`) → libera slot (actualiza `time_slots.status='available'`, `client_id=NULL`)
  - Cancelar (`cancelled`) → same slot liberation
  - Ver/editar notas (`PUT .../notes`)
- Cada fila muestra: nombre cliente, email, teléfono, país, servicio, fecha/hora, estado, notas.

### Dashboard — Pestaña "Servicios"
- Listado CRUD completo:
  - Agregar (`POST /api/admin/services`)
  - Editar (`PUT /api/admin/services/:id`)
  - Activar/desactivar (`is_active` boolean)
  - Eliminar (`DELETE /api/admin/services/:id`)
- Modal para agregar/editar con campos: nombre, descripción, duración (minutos).

---

## 6. API REST

| Método | Ruta | Descripción | Body / Params | Respuesta |
|--------|------|-------------|---------------|-----------|
| POST | `/api/admin/login` | Login admin | `{ password }` | `{ token, name }` |
| POST | `/api/register` | Alta/upsert cliente | `{ full_name, email, phone, country, doc_type, doc_number, language, notes }` | `{ success, client_id }` |
| GET | `/api/services` | Servicios activos | — | `[ {id, name, description, duration_minutes, is_active} ]` |
| GET | `/api/slots` | Horarios disponibles | `?date=YYYY-MM-DD&service_id=N` | `[ {id, date, time, service_id, status, is_booked} ]` |
| POST | `/api/book` | Reservar turno | `{ client_id, slot_id }` | `{ success, appointment_id }` |
| GET | `/api/admin/appointments` | Lista + stats | — | `{ stats:{total,pending,confirmed,completed,today}, turns:[...] }` |
| PATCH | `/api/admin/appointments/:id/status` | Cambiar estado | `{ status }` | `{ success:true }` |
| PUT | `/api/admin/appointments/:id/notes` | Notas internas | `{ admin_notes }` | `{ success:true }` |
| GET | `/api/admin/services` | Lista servicios | — | `[...]` |
| POST | `/api/admin/services` | Crear servicio | `{ name, description, duration_minutes }` | `{ success, id }` |
| PUT | `/api/admin/services/:id` | Actualizar | `{ name, description, duration_minutes, is_active }` | `{ success }` |
| DELETE | `/api/admin/services/:id` | Eliminar | — | `{ success }` |
| GET | `/health` | Health check | — | `{ ok, timestamp }` |

---

## 7. Reglas de Negocio

1. **Slots solo días hábiles**: Lun–Vie; sábados y domingos rechazan reserva.
2. **Horario 09:00–18:00**: Slots generados cada `duration_minutes` dentro del rango.
3. **Zona horaria**: `America/Sao_Paulo` (GMT-3) para todos los cálculos de fecha/hora.
4. **Upset de cliente**: Si email o teléfono ya existen, se actualiza registro existente y se retorna mismo `client_id`.
5. **Transaccionalidad del booking**: Inserción de `appointments`, actualización de `time_slots` e inserción de `notifications` ocurren dentro de `db.transaction()` (desde fix 2026-11-16). Cualquier fallo deshace todo.
6. **Liberación de slot**: Al completar o cancelar turno, `time_slots.status='available'` y `client_id=NULL`.
7. **Notificaciones**:
   - Email: se intenta envío si `emailTransporter` existe; si falla, se registra error.
   - WhatsApp: mock (log console); siempre marca `sent=0` salvo integración futura.
8. **Seguridad básica**: Sin CSRF protection, sin rate limiting, sin middleware de auth en rutas (suficiente para uso interno/local).

---

## 8. Bugs Conocidos y Correcciones Aplicadas

| Bug | Síntoma | Fix aplicado |
|-----|---------|--------------|
| Bind de booleano JS en SQLite | `POST /api/book` retornaba 500: *"SQLite3 can only bind numbers, strings, bigints, buffers, and null"* | Cambio `sent: false` → `sent: 0` en payload; binding usa valor numérico |
| Huérfanos tras fallo de notificación | Appointment y slot quedaban creados pero notificación fallaba | Uso de `db.transaction()` para atomicidad |
| Campo `name` vs `full_name` en registro | Error de constraint NOT NULL | Frontend envía `full_name`; backend espera `full_name` |
| URLs con `&` sin cotización en curl | Errores de shell al testear | Documentar uso de comillas dobles en comandos |
| Escucha IPv6-only | Página no accesible desde browser en algunas configs | Server escucha en `::` (wildcard); verificar firewall/router |

---

## 9. Estructura de Archivos

```
turnos-gestoria/
├── server.js          # Express app, routes, business logic, transactions
├── db.js              # SQLite init, schema migrations, WAL mode
├── seed.js            # Seed de admin y 15 servicios
├── package.json       # Dependencias y scripts
├── .env.example       # Variables de entorno
├── .gitignore         # Excluye data/, node_modules/, .env
├── README.md          # Documentación de uso
└── public/
    ├── index.html     # Wizard de reservas (3 pasos)
    ├── app.js         # Lógica frontend + i18n
    ├── admin.html     # Panel de administración
    └── admin.js       # Lógica frontend admin
```

---

## 10. Despliegue (Comando Único)

```bash
cd /camino/al/proyecto
npm install
cp .env.example .env      # opcional: ajustar SMTP si se desea email real
npm start                  # inicia en http://localhost:3000
```

- **Cliente**: http://localhost:3000/
- **Admin**: http://localhost:3000/admin (contraseña: `admin123` por defecto)
- **Health**: http://localhost:3000/health

La base de datos `data/turnos.db` se crea automáticamente al primer arranque con todas las tablas y seeds.

---

## 11. Endpoints para Integración Futura

| Endpoint | Uso sugerido |
|----------|--------------|
| `GET /api/slots` | Consumir desde app móvil o sitio externo |
| `POST /api/book` | Webhook de integración con CRM |
| `GET /api/admin/appointments` | Dashboard externo con autenticación propia |
| Webhooks (futuro) | Notificar cambios de estado a plataformas externas |

---

## 12. Notas para Mantenimiento

- **Backup**: Copiar archivo `data/turnos.db` periódicamente (es autosufficient).
- **Logs**: Konsola Node muestra errores de SMTP y WhatsApp; revisar si se activa email real.
- **Escalabilidad**: Para alto volumen, migrar a PostgreSQL/MySQL y reemplazar `better-sqlite3` por driver async.
- **Seguridad**: Agregar middleware `cors`, rate-limit, y auth real con JWT/session antes de exponer a internet.
