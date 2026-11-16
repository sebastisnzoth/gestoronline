# Gestoría — Sistema de Turnos

Sistema web de reservas de turnos para gestoría de documentación argentina (DNI, Pasaporte, CUIT/CUIL, etc.), orientado a clientes extranjeros.

## Características

- **Público (5 idiomas)**: wizard de 3 pasos — elegir servicio → elegir día y horario → registrarse y confirmar. Idiomas: español, portugués, inglés, ruso, chino.
- **Panel de administración** (`/admin`):
  - Estadísticas (total, pendientes, de hoy, completados)
  - Listado de turnos con filtros por estado
  - Acciones: confirmar, iniciar, completar, cancelar (libera el slot al completar/cancelar)
  - Notas internas por turno
  - CRUD completo de servicios (alta, edición, activar/desactivar, borrado)
- **Notificaciones**: email (SMTP opcional) y WhatsApp (mock hasta configurar API), registradas en tabla `notifications`.
- **Slots**: días hábiles (lun–vie) 09:00–18:00, con duración según servicio (zona horaria GMT-3).

## Requisitos

- Node.js ≥ 18
- npm

## Instalación y arranque

```bash
npm install
npm start
```

Abre:

- Cliente: http://localhost:3000/
- Admin: http://localhost:3000/admin (password por defecto: `admin123`)

La base de datos SQLite (`data/turnos.db`) se crea y migra automáticamente al arrancar, junto con el usuario admin y los servicios por defecto (seed).

## Configuración

Copia `.env.example` a `.env` y ajusta lo que necesites:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto HTTP (default 3000) |
| `ADMIN_PASSWORD` | Contraseña del admin (default `admin123`) |
| `SMTP_HOST/PORT/USER/PASS/FROM` | SMTP para notificaciones por email (opcional; sin configurar, el envío se omite y se registra en `notifications`) |
| `WHATSAPP_API_URL/KEY` | API de WhatsApp (opcional; actualmente mock que loggea) |
| `DB_PATH` | Ruta del archivo SQLite (default `data/turnos.db`) |

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Arranca el servidor |
| `npm run dev` | Arranca con nodemon (reinicio automático) |
| `npm run seed` | Crea admin y servicios por defecto |

## API

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/admin/login` | Login admin (solo contraseña) → `{ token, name }` |
| POST | `/api/register` | Alta cliente (upsert por email/teléfono) |
| GET | `/api/services` | Servicios activos |
| GET | `/api/slots?date=YYYY-MM-DD&service_id=N` | Horarios disponibles del día |
| POST | `/api/book` | Reserva turno `{ client_id, slot_id }` (transaccional) |
| GET | `/api/admin/appointments` | Estadísticas + listado de turnos |
| PATCH | `/api/admin/appointments/:id/status` | Cambia estado del turno |
| PUT | `/api/admin/appointments/:id/notes` | Guarda notas internas |
| GET/POST/PUT/DELETE | `/api/admin/services(/:id)` | CRUD de servicios |
| GET | `/health` | Health check |

## Estructura

```
server.js     → Express + API REST (booking, admin, notificaciones)
db.js         → SQLite (better-sqlite3, WAL) + migraciones
seed.js       → seed de admin y servicios
public/
  index.html  → wizard de reservas del cliente
  app.js      → lógica del cliente + i18n (es/pt/en/ru/zh)
  admin.html  → panel de administración
  admin.js    → lógica del panel
```
