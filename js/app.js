/* ============================================================
 * Estado central + orquestación
 * un solo estado { query, categoria, seleccionId } alimenta
 * tarjetas, marcadores y panel: lista y mapa nunca se desincronizan.
 * ============================================================ */
'use strict';

const estado = { query: '', categoria: 'Todos', seleccionId: null };

/* Obras visibles según búsqueda y filtro (intersección). */
function getVisibles() {
  const q = estado.query.trim().toLowerCase();
  return GRAFFITIS.filter(function (g) {
    if (estado.categoria !== 'Todos' && g.categoria !== estado.categoria) return false;
    if (!q) return true;
    return [g.nombre, g.artista, g.ubicacion, g.categoria].join(' ').toLowerCase().indexOf(q) !== -1;
  });
}

/* Render unificado: repinta tarjetas + marcadores con el mismo conjunto. */
function render() {
  const visibles = getVisibles();
  renderTarjetas(visibles);
  renderMarcadores(visibles);
}

/* Crea los botones de filtro a partir de CATEGORIAS. */
function renderFiltros() {
  const contenedor = document.getElementById('filter-buttons');
  if (!contenedor) return;
  contenedor.innerHTML = CATEGORIAS.map(function (cat) {
    return '<button class="filtro' + (cat === 'Todos' ? ' activo' : '') + '" data-cat="' + cat + '">' + cat + '</button>';
  }).join('');
}

function initApp() {
  renderFiltros();

  const buscador = document.getElementById('search-input');
  if (buscador) {
    buscador.addEventListener('input', function () {
      estado.query = buscador.value;
      render();
    });
  }

  const filtros = document.getElementById('filter-buttons');
  if (filtros) {
    filtros.addEventListener('click', function (e) {
      const boton = e.target.closest('button[data-cat]');
      if (!boton) return;
      estado.categoria = boton.dataset.cat;
      filtros.querySelectorAll('.filtro').forEach(function (b) {
        b.classList.toggle('activo', b === boton);
      });
      render();
    });
  }

  // Escape cierra el panel de detalle.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarDetalle();
  });

  render();
}

/* Exposición para consola/testeo y para los módulos clásicos. */
window.estado = estado;
window.getVisibles = getVisibles;
window.render = render;
window.abrirDetalle = abrirDetalle;
window.cerrarDetalle = cerrarDetalle;
window.centrarEnObra = centrarEnObra;
window.urlMaps = urlMaps;
window.GRAFFITIS = GRAFFITIS;

/* Arranque: el mapa primero (Leaflet), luego el estado y los listeners. */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initMap();
    initApp();
  });
} else {
  initMap();
  initApp();
}