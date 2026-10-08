/* ============================================================
 * VISOR DE GRAFITIS DE PATIO BONITO — fuente única de datos
 * ============================================================
 * Cómo agregar o editar un grafiti (receta corta):
 *   1. Abre Google Maps y ubica el punto real de la obra.
 *   2. Mantén presionado el punto (móvil) o haz clic derecho
 *      (computador) y copia las coordenadas (latitud, longitud).
 *   3. Pega un nuevo objeto en el array GRAFFITIS con los 9 campos.
 *   4. Si verificaste la obra en su sitio, pon
 *      `ubicacionAproximada` en `false`; si no, déjalo en `true`
 *      y la interfaz la marcará como aproximada.
 * ============================================================ */
'use strict';

const GRAFFITIS = [
  {
    id: 1,
    nombre: "Mural junto al Parque Altamar",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla): ancla la estructura del visor a un punto real del sector. La obra concreta aún no está verificada en campo.",
    categoria: "Mural",
    ubicacion: "Parque Altamar, Patio Bonito, Bogotá",
    latitud: 4.6354993,
    longitud: -74.1716524,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 2,
    nombre: "Grafiti en el Parque Las Margaritas",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado al Parque Las Margaritas, punto de referencia real del sector. Reemplaza estos datos cuando la obra esté verificada.",
    categoria: "Graffiti",
    ubicacion: "Parque Las Margaritas, Patio Bonito, Bogotá",
    latitud: 4.6347596,
    longitud: -74.1753824,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 3,
    nombre: "Intervención en el Parque Metropolitano Gibraltar",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla). El punto de anclaje es el Parque Metropolitano Gibraltar, ubicación real dentro de la UPZ Patio Bonito.",
    categoria: "Intervención",
    ubicacion: "Parque Metropolitano Gibraltar, Patio Bonito, Bogotá",
    latitud: 4.6413876,
    longitud: -74.1804497,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 4,
    nombre: "Arte urbano en el Parque Tintalito",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado al Parque Tintalito, en el límite suroriente del sector. Verifica la obra en sitio antes de marcarla como precisa.",
    categoria: "Arte urbano",
    ubicacion: "Parque Tintalito, Patio Bonito, Bogotá",
    latitud: 4.6303654,
    longitud: -74.1700070,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 5,
    nombre: "Mural en el sector de Tierra Buena",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado al Parque Tierra Buena. La pieza mural aún no está documentada en fuentes públicas.",
    categoria: "Mural",
    ubicacion: "Parque Tierra Buena, Patio Bonito, Bogotá",
    latitud: 4.6516708,
    longitud: -74.1732515,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 6,
    nombre: "Grafiti en la Cancha Tocarema",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado a la Cancha Tocarema, punto de reunión real del barrio. Actualiza estos datos con la obra verificada.",
    categoria: "Graffiti",
    ubicacion: "Cancha Tocarema, Patio Bonito, Bogotá",
    latitud: 4.6441746,
    longitud: -74.1599698,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 7,
    nombre: "Intervención junto al Canal Tintal II",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado a un tramo verificado del Canal Tintal II, límite occidental del sector. Ubicación aproximada.",
    categoria: "Intervención",
    ubicacion: "Canal Tintal II, Patio Bonito, Bogotá",
    latitud: 4.6476553,
    longitud: -74.1814598,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 8,
    nombre: "Muro con arte urbano frente al Colegio Rodrigo de Triana",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado al Colegio Distrital Rodrigo de Triana — Sede B. La intervención en el muro aún no está verificada.",
    categoria: "Arte urbano",
    ubicacion: "Colegio Rodrigo de Triana, Patio Bonito, Bogotá",
    latitud: 4.6407668,
    longitud: -74.1695683,
    ubicacionAproximada: true,
    imagen: null
  },
  {
    id: 9,
    nombre: "Pieza en el Parque de los Soldaditos",
    artista: "Artista no identificado",
    descripcion: "Registro de ejemplo (semilla) anclado al Parque de los Soldaditos. Categoría de ejemplo para probar los filtros del visor.",
    categoria: "Otros",
    ubicacion: "Parque de los Soldaditos, Patio Bonito, Bogotá",
    latitud: 4.6422090,
    longitud: -74.1599442,
    ubicacionAproximada: true,
    imagen: null
  }
];