# Proposal

## Why

El repositorio está vacío y el proyecto académico "Visor de Grafitis de Patio Bonito" necesita una primera versión funcional: mapa, fichas, búsqueda, filtros y enlaces reales a Google Maps. No existe ningún catálogo público de grafitis del sector con coordenadas verificadas (verificado durante la exploración: OSM registra 0 obras en la UPZ; Street Art Cities restringe su licencia; Google Maps no es consultable sin API key), por lo que el visor debe funcionar con datos honestos: puntos de anclaje reales verificados y ubicaciones marcadas como aproximadas, dejando un flujo sencillo para que el usuario registre obras reales en campo.

## What Changes

- Aplicación web estática en vanilla HTML/CSS/JS con Leaflet + OpenStreetMap (sin paso de build, sin API keys).
- Fuente única de datos editable (`data/graffitis.js`) con registros semilla anclados a puntos de referencia reales de Patio Bonito verificados en OSM, marcados como "Ubicación aproximada", con artista por defecto "Artista no identificado" y sin coordenadas inventadas.
- Mapa centrado en la UPZ Patio Bonito con marcadores seleccionables, zoom y desplazamiento.
- Búsqueda por nombre/artista/ubicación/categoría y filtros por categoría que afectan simultáneamente al listado y a los marcadores del mapa.
- Listado de tarjetas (imagen, nombre, artista, ubicación) que al seleccionarse centra el mapa en la obra.
- Panel único de detalle compartido entre marcador y tarjeta: título, artista, descripción, ubicación, imagen o placeholder y badge de aproximación.
- Enlace "Ver en Google Maps" derivado de los datos (coordenadas reales del punto, o búsqueda por punto de referencia cuando sólo hay ubicación aproximada), abriendo en pestaña nueva con `rel="noopener noreferrer"`.
- Interfaz responsive con identidad visual propia inspirada en arte urbano/Bogotá, placeholders gráficos para imágenes no disponibles y accesibilidad básica (contraste, `alt`, navegación por teclado).
- Sección "Sobre este visor" con nota de precisión de ubicaciones y `README.md` completo (instalación, uso, cómo agregar grafitis, enlaces de Google Maps, créditos y limitaciones), listo para subir a GitHub.

## Capabilities

### New Capabilities

- `graffiti-catalog`: fuente única y editable de los registros de grafitis, con el esquema de datos y las reglas de honestidad (nada de artistas inventados, ubicaciones aproximadas siempre marcadas, coordenadas sólo de puntos verificados).
- `map-exploration`: mapa interactivo centrado en Patio Bonito con marcadores por obra, zoom/desplazamiento, selección de marcador y centrado del mapa en una obra elegida.
- `graffiti-discovery`: búsqueda libre, filtros por categoría y listado de tarjetas, todos sincronizados entre sí y con el mapa, incluido el estado de "sin resultados".
- `graffiti-details`: panel de información de la obra seleccionada (título, artista, descripción, ubicación, imagen o placeholder, badge de aproximación).
- `external-location-links`: enlaces funcionales "Ver en Google Maps" construidos desde coordenadas o punto de referencia, abiertos en pestaña nueva sin opener.
- `viewer-shell`: armazón de la aplicación — encabezado con identidad, sección "Sobre este visor" con nota de precisión, layout responsive, identidad visual propia y accesibilidad básica.

### Modified Capabilities

(ninguno — proyecto nuevo, no hay specs existentes)

## Impact

- Todo el código es nuevo: `index.html`, `css/`, `js/`, `data/`, `assets/`, `README.md`.
- Dependencias: Leaflet (CDN con posibilidad de local) y tiles OpenStreetMap con su atribución obligatoria; ningún servicio requiere API key.
- Sin rompimientos: no existe implementación previa.
- Fuentes externas: OSM/ODbL (atribución requerida); datos de anclaje verificados vía Nominatim/Overpass; ninguna fuente con licencia restrictiva (Street Art Cities descartado).
- El `README.md` y la estructura del repo forman parte del entregable.
