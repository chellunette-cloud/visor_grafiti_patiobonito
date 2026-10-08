/* ============================================================
 * UI: categorías, tarjetas, panel de detalle, enlaces de Google Maps
 * ============================================================ */
'use strict';

const CATEGORIAS = ['Todos', 'Arte urbano', 'Mural', 'Graffiti', 'Intervención', 'Otros'];

/* Convierte una categoría en el nombre del placeholder: Mural -> placeholder-mural */
function slugCategoria(categoria) {
  return ('placeholder-' + (categoria || 'otros'))
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}

/* Enlace a Google Maps, DERIVADO de los datos (nunca guardado en el registro):
 * - con coordenadas: búsqueda por punto exacto (query=lat,lon)
 * - sin coordenadas: búsqueda por el texto de la ubicación
 */
function urlMaps(reg) {
  const base = 'https://www.google.com/maps/search/?api=1&query=';
  const lat = Number(reg.latitud);
  const lon = Number(reg.longitud);
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    return base + lat + ',' + lon;
  }
  return base + encodeURIComponent(reg.ubicacion || 'Patio Bonito, Bogotá');
}

/* Imagen real o placeholder honesto (nunca una imagen falsa). */
function fotoDe(reg) {
  if (reg.imagen) {
    const src = reg.imagen;
    return '<img class="tarjeta-img" src="' + src + '" alt="Fotografía de ' + reg.nombre + '" loading="lazy">';
  }
  const src = 'assets/img/' + slugCategoria(reg.categoria) + '.svg';
  return '<img class="tarjeta-img" src="' + src + '" alt="Imagen no disponible de ' + reg.nombre + '" loading="lazy">';
}

/* Badge visible cuando la ubicación es aproximada. */
function badgeHTML(reg) {
  return reg.ubicacionAproximada ? '<span class="badge">Ubicación aproximada</span>' : '';
}

/* Plantilla de una tarjeta del listado. */
function tarjetaHTML(reg) {
  return '' +
    '<article class="tarjeta' + (window.estado && window.estado.seleccionId === reg.id ? ' seleccionada' : '') + '"' +
    ' tabindex="0" data-id="' + reg.id + '" aria-label="Ver detalle de ' + reg.nombre + '">' +
    fotoDe(reg) +
    '<div class="tarjeta-cuerpo">' +
    '<h3 class="tarjeta-nombre">' + reg.nombre + '</h3>' +
    '<p class="tarjeta-artista">' + reg.artista + '</p>' +
    badgeHTML(reg) +
    '<p class="tarjeta-ubicacion">&#128205; ' + reg.ubicacion + '</p>' +
    '<a class="boton boton-ubicacion" href="' + urlMaps(reg) + '"' +
    ' target="_blank" rel="noopener noreferrer">Ver ubicación</a>' +
    '</div></article>';
}

/* Renderiza el listado de tarjetas y el estado vacío. */
function renderTarjetas(lista) {
  const contenedor = document.getElementById('graffiti-list');
  const vacio = document.getElementById('empty-state');
  if (!contenedor) return;

  contenedor.innerHTML = lista.map(tarjetaHTML).join('');
  if (vacio) vacio.hidden = lista.length > 0;

  contenedor.querySelectorAll('.tarjeta').forEach(function (tarjeta) {
    const elegir = function (e) {
      if (e.target.closest('a')) return; // el enlace hace su propio trabajo
      const id = Number(tarjeta.dataset.id);
      if (window.estado) window.estado.seleccionId = id;
      centrarEnObra(id);
      abrirDetalle(id);
      document.querySelectorAll('.tarjeta').forEach(function (t) {
        t.classList.toggle('seleccionada', t === tarjeta);
      });
    };
    tarjeta.addEventListener('click', elegir);
    tarjeta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elegir(e);
      }
    });
  });
}

/* ===== Panel de detalle (único, compartido entre marcador y tarjeta) ===== */

/* Abre el panel con la información de la obra. */
function abrirDetalle(id) {
  const reg = GRAFFITIS.find(function (g) { return g.id === id; });
  const detalle = document.getElementById('detalle');
  if (!reg || !detalle) return;

  if (window.estado) window.estado.seleccionId = id;

  detalle.innerHTML = '' +
    '<div class="detalle-cabeza">' +
    fotoDe(reg) +
    '<button id="cerrar-detalle" class="detalle-cerrar" aria-label="Cerrar información del grafiti">&times;</button>' +
    '</div>' +
    '<div class="detalle-cuerpo">' +
    '<h2 class="detalle-nombre">' + reg.nombre + '</h2>' +
    '<p class="detalle-artista">' + reg.artista + '</p>' +
    badgeHTML(reg) +
    (reg.categoria ? '<p class="detalle-categoria">Categoría: ' + reg.categoria + '</p>' : '') +
    '<p class="detalle-descripcion">' + reg.descripcion + '</p>' +
    '<p class="detalle-ubicacion">&#128205; ' + reg.ubicacion + '</p>' +
    '<a class="boton boton-maps" href="' + urlMaps(reg) + '"' +
    ' target="_blank" rel="noopener noreferrer">Ver en Google Maps</a>' +
    '</div>';

  detalle.classList.add('abierto');
  detalle.setAttribute('aria-hidden', 'false');
  detalle.removeAttribute('inert');

  const cerrar = document.getElementById('cerrar-detalle');
  if (cerrar) cerrar.addEventListener('click', cerrarDetalle);
  const cerrarBoton = detalle.querySelector('.detalle-cerrar');
  if (cerrarBoton) cerrarBoton.focus();
}

/* Cierra el panel de detalle. */
function cerrarDetalle() {
  const detalle = document.getElementById('detalle');
  if (!detalle) return;
  detalle.classList.remove('abierto');
  detalle.setAttribute('aria-hidden', 'true');
  detalle.setAttribute('inert', '');
  if (window.estado) window.estado.seleccionId = null;
}