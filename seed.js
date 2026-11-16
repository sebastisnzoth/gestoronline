require('dotenv').config();
const { getDb, closeDb } = require('./db');
const bcrypt = require('bcryptjs');

console.log('🌱 Sembrando datos iniciales...');

const db = getDb();

// Crear admin por defecto
const adminEmail = process.env.ADMIN_EMAIL || 'admin@gestoria.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const existingAdmin = db.prepare('SELECT id FROM admins WHERE email = ?').get(adminEmail);

if (!existingAdmin) {
  const hash = bcrypt.hashSync(adminPassword, 10);
  db.prepare('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)').run(
    adminEmail,
    hash,
    'Administrador'
  );
  console.log('✅ Admin creado:', adminEmail);
}

// Servicios de gestoría para extranjeros
const services = [
  { name: 'DNI (Documento Nacional de Identidad)', desc: 'Trámite de DNI para extranjeros residentes', duration: 30 },
  { name: 'Pasaporte Argentino', desc: 'Obtención o renovación de pasaporte argentino', duration: 45 },
  { name: 'CUIT/CUIL', desc: 'Clave Única de Identificación Tributaria', duration: 30 },
  { name: 'Radición de Extranjero', desc: 'Radlicación temporal o permanente', duration: 60 },
  { name: 'Residencia Temporal', desc: 'Solicitud de residencia temporal', duration: 45 },
  { name: 'Residencia Permanente', desc: 'Solicitud de residencia permanente', duration: 45 },
  { name: 'Matrimonio / Unión Civil', desc: 'Legalización de documentos matrimoniales', duration: 30 },
  { name: 'Certificado de Antecedentes', desc: 'Certificado penal argentino para extranjeros', duration: 30 },
  { name: 'Apostilla de Documentos', desc: 'Apostilla de La Haya para documentos extranjeros', duration: 30 },
  { name: 'Traducción Jurada', desc: 'Gestión de traducciones juradas', duration: 30 },
  { name: 'Nacionalidad Argentina', desc: 'Solicitud de nacionalidad por opción o residência', duration: 60 },
  { name: 'Partida de Nacimiento', desc: 'Copia simple/auténtica del registro civil', duration: 30 },
  { name: 'Papeleta de Votación', desc: 'Inscripción electoral para extranjeros', duration: 15 },
  { name: 'Licencia de Conducir', desc: 'Canje de licencia extranjera por argentina', duration: 30 },
  { name: 'Consulta General', desc: 'Consultas sobre cualquier trámite de documentación', duration: 30 },
];

// Insertar servicios
const insertService = db.prepare(`
  INSERT OR IGNORE INTO services (name, description, duration_minutes) 
  VALUES (?, ?, ?)
`);

for (const svc of services) {
  insertService.run(svc.name, svc.desc, svc.duration);
}
console.log(`✅ ${services.length} servicios cargados`);

closeDb();
console.log('\n🎉 Datos iniciales sembrados correctamente!');
console.log('   - Admin: ' + adminEmail);
console.log('   - Password: ' + adminPassword);
