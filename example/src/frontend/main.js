const apiBase = '/api/curriculums';
const cvForm = document.getElementById('cv-form');
const cvList = document.getElementById('cv-list');
const cvDetails = document.getElementById('cv-details');

async function fetchCurriculums() {
  // No endpoint para listar todos, así que listamos IDs por intento
  let html = '';
  for (let id = 1; id < 1000; id++) {
    const res = await fetch(`${apiBase}/${id}`);
    if (res.status === 200) {
      const cv = await res.json();
      html += `<div class="cv-item">
        <b>${cv.fullName}</b> (v${cv.version})
        <button onclick="viewCV(${cv.id})">Ver</button>
        <button onclick="editCV(${cv.id})">Editar</button>
        <button onclick="deleteCV(${cv.id})">Borrar</button>
      </div>`;
    }
  }
  cvList.innerHTML = html || '<i>No hay currículums.</i>';
}

window.viewCV = async function(id) {
  const res = await fetch(`${apiBase}/${id}`);
  if (res.status === 200) {
    const cv = await res.json();
    cvDetails.innerHTML = `<h3>${cv.fullName}</h3>
      <pre>${cv.content}</pre>
      <small>Creado: ${cv.createdAt} | Versión: ${cv.version}</small>`;
  }
};

window.editCV = async function(id) {
  const res = await fetch(`${apiBase}/${id}`);
  if (res.status === 200) {
    const cv = await res.json();
    document.getElementById('cvId').value = cv.id;
    document.getElementById('fullName').value = cv.fullName;
    document.getElementById('content').value = cv.content;
  }
};

window.deleteCV = async function(id) {
  if (!confirm('¿Borrar este currículum?')) return;
  await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
  await fetchCurriculums();
  cvDetails.innerHTML = '';
};

cvForm.onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('cvId').value;
  const fullName = document.getElementById('fullName').value;
  const content = document.getElementById('content').value;
  if (id) {
    await fetch(`${apiBase}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, content })
    });
  } else {
    await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, content })
    });
  }
  cvForm.reset();
  document.getElementById('cvId').value = '';
  await fetchCurriculums();
};

fetchCurriculums();
