document.addEventListener('DOMContentLoaded', function () {
  // ▼▼▼ Botón de comentario → abre modal ▼▼▼
  const btnComentario = document.getElementById('btnComentario');
  const modal = document.getElementById('modalComentario');
  const closeBtn = document.querySelector('.close');
  const experienciaTexto = document.getElementById('experienciaTexto');
  const btnGuardar = document.getElementById('btnGuardarExperiencia');
  const listaExperiencias = document.getElementById('listaExperiencias');

  // Mostrar modal
  if (btnComentario) {
    btnComentario.addEventListener('click', function () {
      modal.style.display = 'flex';
      experienciaTexto.focus();
    });
  }

  // Cerrar modal (X o fuera)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Cargar experiencias guardadas al inicio
  function cargarExperiencias() {
    const guardadas = JSON.parse(localStorage.getItem('experiencias')) || [];
    if (guardadas.length === 0) {
      listaExperiencias.innerHTML = '<div class="sin-experiencias">Aún no hay experiencias compartidas. ¡Sé el primero! 🌟</div>';
    } else {
      listaExperiencias.innerHTML = '';
      guardadas.slice().reverse().forEach((exp, index) => {
        const div = document.createElement('div');
        div.className = 'experiencia-item';
        div.innerHTML = `
          <p>${exp.texto}</p>
          <small>📅 ${exp.fecha}</small>
        `;
        listaExperiencias.appendChild(div);
      });
    }
  }

  // Guardar nueva experiencia
  if (btnGuardar) {
    btnGuardar.addEventListener('click', function () {
      const texto = experienciaTexto.value.trim();
      if (!texto) {
        alert('Por favor, escribe algo antes de enviar ✍️');
        return;
      }

      const nuevaExp = {
        texto: texto,
        fecha: new Date().toLocaleString('es-BO', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const guardadas = JSON.parse(localStorage.getItem('experiencias')) || [];
      guardadas.push(nuevaExp);
      localStorage.setItem('experiencias', JSON.stringify(guardadas));

      // Limpiar y cerrar
      experienciaTexto.value = '';
      modal.style.display = 'none';

      // Recargar lista
      cargarExperiencias();
    });
  }

  // Cargar al inicio
  cargarExperiencias();
});