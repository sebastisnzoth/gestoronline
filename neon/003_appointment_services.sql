ALTER TABLE appointments ADD COLUMN IF NOT EXISTS duration_minutes INTEGER CHECK (duration_minutes IS NULL OR duration_minutes > 0);

CREATE TABLE IF NOT EXISTS appointment_services (
  appointment_id INTEGER NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL REFERENCES services(id),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (appointment_id, service_id)
);

CREATE INDEX IF NOT EXISTS appointment_services_service_idx ON appointment_services(service_id);
