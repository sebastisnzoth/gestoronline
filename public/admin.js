// ===== Admin Panel Logic =====
let authToken = null;

// Check existing session
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    authToken = token;
    showDashboard();
  }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const password = document.getElementById('loginPassword').value;
  
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    const data = await res.json();
    
    if (data.token) {
      authToken = data.token;
      localStorage.setItem('adminToken', data.token);
      showDashboard();
    } else {
      document.getElementById('loginError').classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
  }
});

function showDashboard() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  loadStats();
  loadAppointments();
  loadServices();
}

function logout() {
  localStorage.removeItem('adminToken');
  location.reload();
}

// Load stats
async function loadStats() {
  try {
    const res = await fetch('/api/admin/appointments', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    
    document.getElementById('statTotal').textContent = data.stats.total;
    document.getElementById('statPending').textContent = data.stats.pending;
    document.getElementById('statToday').textContent = data.stats.today;
    document.getElementById('statCompleted').textContent = data.stats.completed;
  } catch (err) {
    console.error('Error loading stats:', err);
  }
}

// Load appointments
async function loadAppointments() {
  const container = document.getElementById('appointmentsList');
  const filter = document.getElementById('filterStatus').value;
  
  container.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>';
  
  try {
    const res = await fetch('/api/admin/appointments', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    
    let turns = data.turns || [];
    if (filter) {
      turns = turns.filter(t => t.status === filter);
    }
    
    if (turns.length === 0) {
      container.innerHTML = '<div class="text-center py-8 text-gray-500">No hay turnos registrados</div>';
      return;
    }
    
    container.innerHTML = turns.map(turn => `
      <div class="border rounded-lg p-4 bg-gray-50">
        <div class="flex justify-between items-start">
          <div>
            <div class="font-semibold text-gray-900">${turn.full_name}</div>
            <div class="text-sm text-gray-500">${turn.email}</div>
            <div class="text-sm text-gray-500">${turn.phone}</div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium status-badge-${turn.status}">
            ${getStatusText(turn.status)}
          </span>
        </div>
        <div class="mt-3 text-sm">
          <div><strong>Servicio:</strong> ${turn.service_name}</div>
          <div><strong>Fecha/Hora:</strong> ${turn.date} ${turn.time}</div>
          ${turn.country ? `<div><strong>País:</strong> ${turn.country}</div>` : ''}
          ${turn.admin_notes ? `<div class="mt-2 text-blue-600"><strong>Nota:</strong> ${turn.admin_notes}</div>` : ''}
        </div>
        <div class="mt-3 flex gap-2">
          ${getActionButtons(turn)}
        </div>
      </div>
    `).join('');
    
  } catch (err) {
    container.innerHTML = '<div class="text-center py-8 text-red-500">Error al cargar turnos</div>';
  }
}

function getStatusText(status) {
  const statuses = {
    pending: '⏳ Pendiente',
    confirmed: '✅ Confirmado',
    in_progress: '🔄 En Curso',
    completed: '✔ Completado',
    cancelled: '❌ Cancelado'
  };
  return statuses[status] || status;
}

function getStatusClass(status) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100';
}

function getActionButtons(turn) {
  const buttons = [];
  
  if (turn.status === 'pending') {
    buttons.push(`<button onclick="updateStatus(${turn.appointment_id}, 'confirmed')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">✓ Confirmar</button>`);
  }
  if (turn.status === 'confirmed' || turn.status === 'pending') {
    buttons.push(`<button onclick="updateStatus(${turn.appointment_id}, 'in_progress')" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs">▶ Iniciar</button>`);
  }
  if (turn.status === 'in_progress') {
    buttons.push(`<button onclick="updateStatus(${turn.appointment_id}, 'completed')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">✔ Completar</button>`);
  }
  buttons.push(`<button onclick="updateStatus(${turn.appointment_id}, 'cancelled')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">✗ Cancelar</button>`);
  
  buttons.push(`<button onclick="toggleNotes(${turn.appointment_id})" class="border border-gray-300 hover:border-gray-400 px-3 py-1 rounded text-xs">📝 Nota</button>`);
  
  return buttons.join('');
}

async function updateStatus(id, status) {
  try {
    const res = await fetch(`/api/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      body: JSON.stringify({ status })
    });
    
    if (res.ok) {
      loadStats();
      loadAppointments();
    }
  } catch (err) {
    console.error(err);
  }
}

function toggleNotes(id) {
  const notes = prompt('Ingrese nota del administrador:');
  if (notes !== null) {
    saveNotes(id, notes);
  }
}

async function saveNotes(id, notes) {
  try {
    await fetch(`/api/admin/appointments/${id}/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      body: JSON.stringify({ admin_notes: notes })
    });
    loadAppointments();
  } catch (err) {
    console.error(err);
  }
}

// Load services
async function loadServices() {
  try {
    const res = await fetch('/api/admin/services', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const services = await res.json();
    
    const container = document.getElementById('servicesList');
    container.innerHTML = services.map(s => `
      <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <div>
          <div class="font-medium">${s.name}</div>
          <div class="text-sm text-gray-500">${s.description || ''}</div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">⏱ ${s.duration_minutes}min</span>
          <label class="flex items-center gap-1 text-sm">
            <input type="checkbox" onchange="toggleService(${s.id}, ${!s.is_active})" ${s.is_active ? 'checked' : ''} />
            Activo
          </label>
          <button onclick="editService(${s.id})" class="text-blue-500 hover:text-blue-700">✏️</button>
          <button onclick="deleteService(${s.id})" class="text-red-500 hover:text-red-700">🗑️</button>
        </div>
      </div>
    `).join('');
    
  } catch (err) {
    console.error(err);
  }
}

function showAddService() {
  document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
  document.getElementById('serviceForm').reset();
  document.getElementById('serviceId').value = '';
  document.getElementById('serviceModal').classList.remove('hidden');
}

function editService(id) {
  // Fetch service details
  fetch('/api/admin/services', {
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
  .then(r => r.json())
  .then(services => {
    const svc = services.find(s => s.id === id);
    if (svc) {
      document.getElementById('modalTitle').textContent = 'Editar Servicio';
      document.getElementById('serviceId').value = svc.id;
      document.getElementById('serviceName').value = svc.name;
      document.getElementById('serviceDesc').value = svc.description || '';
      document.getElementById('serviceDuration').value = svc.duration_minutes;
      document.getElementById('serviceModal').classList.remove('hidden');
    }
  });
}

function closeServiceModal() {
  document.getElementById('serviceModal').classList.add('hidden');
}

document.getElementById('serviceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('serviceId').value;
  const payload = {
    name: document.getElementById('serviceName').value,
    description: document.getElementById('serviceDesc').value,
    duration_minutes: parseInt(document.getElementById('serviceDuration').value)
  };
  
  const url = id ? `/api/admin/services/${id}` : '/api/admin/services';
  const method = id ? 'PUT' : 'POST';
  
  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      body: JSON.stringify(payload)
    });
    
    closeServiceModal();
    loadServices();
  } catch (err) {
    console.error(err);
  }
});

async function deleteService(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  
  try {
    await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    loadServices();
  } catch (err) {
    console.error(err);
  }
}

function toggleService(id, isActive) {
  fetch(`/api/admin/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
    body: JSON.stringify({ is_active: isActive })
  }).then(() => loadServices());
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
  document.getElementById(`tab-${tab}`).classList.add('tab-active');
  
  document.getElementById('content-turnos').classList.toggle('hidden', tab !== 'turnos');
  document.getElementById('content-servicios').classList.toggle('hidden', tab !== 'servicios');
}
