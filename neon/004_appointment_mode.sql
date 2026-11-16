ALTER TABLE appointments ADD COLUMN IF NOT EXISTS appointment_mode text NOT NULL DEFAULT 'unspecified' CHECK (appointment_mode IN ('unspecified','whatsapp','in_person'));
