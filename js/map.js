/* ============================================================
 * Mapa Leaflet + OpenStreetMap
 * Centrado en la UPZ Patio Bonito (centro verificado 4.6404, -74.1693)
 * ============================================================ */
'use strict';

const CENTRO_PATIO_BONITO = [4.6404, -74.1693];
const OSM_TILES = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATRIBUCION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors (ODbL)';

let mapa = null;
let capaMarcadores = null;

/* Inicializa el mapa centrado en Patio Bonito con zoom y desplazamiento. */
function initMap() {
  const contenedor = document.getElementById('map');
  if (!contenedor) return null;

  mapa = L.map('map', {
    center: CENTRO_PATIO_BONITO,
    zoom: 14,
    scrollWheelZoom: true,
    zoomControl: window.innerWidth > 640
  });
  L.tileLayer(OSM_TILES, { attribution: OSM_ATRIBUCION, maxZoom: 19 }).addTo(mapa);
  capaMarcadores = L.layerGroup().addTo(mapa);

  mapa.on('load', function () {
    contenedor.classList.add('mapa-cargado');
  });

  return mapa;
}

/* Icono propio del visor: pincel giratorio sobre fondo spray. */
function iconoGrafiti() {
  const nodo = document.createElement('div');
  nodo.className = 'marcador-grafiti';
  nodo.innerHTML = '<span aria-hidden="true">&#9998;</span>';
  return L.divIcon({
    html: nodo.outerHTML,
    className: 'marcador-grafiti-wrap',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    tooltipAnchor: [0, -38]
  });
}

/* Dibuja un marcador por cada obra del conjunto visible. */
function renderMarcadores(lista) {
  if (!capaMarcadores) return;
  capaMarcadores.clearLayers();

  lista.forEach(function (reg) {
    const marcador = L.marker([reg.latitud, reg.longitud], {
      icon: iconoGrafiti(),
      keyboard: true,
      title: reg.nombre,
      alt: reg.nombre
    }).addTo(capaMarcadores);

    marcador.bindTooltip(reg.nombre, { direction: 'top', offset: [0, -36] });
    marcador.on('click', function () {
      abrirDetalle(reg.id);
    });
  });
}

/* Centra el mapa en la obra elegida (p.ej. desde una tarjeta). */
function centrarEnObra(id) {
  const reg = GRAFFITIS.find(function (g) { return g.id === id; });
  if (!reg || !mapa) return;
  mapa.flyTo([reg.latitud, reg.longitud], 17, { duration: 0.8 });
}