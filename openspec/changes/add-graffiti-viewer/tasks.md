# Tasks

## 1. Estructura base

- [x] 1.1 Crear la estructura de carpetas (`css/`, `js/`, `data/`, `assets/img/`) y `index.html` con encabezado, barra de búsqueda, filtros, contenedor de mapa, listado, contenedor de panel de detalle y pie; verificar abriendo con doble clic que la página carga sin errores en consola
- [x] 1.2 Crear `css/styles.css` enlazado desde `index.html` con variables de paleta (asfalto + acentos spray) y estilos base; verificar que la paleta se aplica al abrir la página
- [x] 1.3 Crear `README.md` con los 10 encabezados del entregable (nombre, descripción, objetivo, tecnologías, instalación, ejecución, agregar grafitis, enlaces de Google Maps, créditos, limitaciones); verificar que el archivo existe con los 10 encabezados
- [x] 1.4 Revisar `index.html` confirmando que la única dependencia externa es el CDN de Leaflet y que ningún archivo requiere API key ni paso de build; verificar con la lista de scripts/enlaces del HTML

## 2. Catálogo de datos

- [x] 2.1 Crear `data/graffitis.js` con `const GRAFFITIS = [...]` y 8–10 registros semilla que cumplan los 9 campos del esquema (id único, nombre, artista, descripcion, categoria, ubicacion, latitud, longitud, ubicacionAproximada), anclados a los puntos OSM verificados del design D7, todos con `ubicacionAproximada: true` y artista "Artista no identificado" salvo fuente verificable; verificar en consola que los id son únicos y que todas las coordenadas caen dentro de 4.6284–4.6542 N / -74.1828–-74.1563 O
- [x] 2.2 Crear los placeholders SVG por categoría en `assets/img/` y hacer que `imagen: null` muestre el placeholder de su categoría; verificar que una tarjeta sin foto muestra el placeholder con texto alternativo
- [x] 2.3 Documentar en `README.md`, dentro de "Cómo agregar nuevos grafitis", la receta de 30 s desde Google Maps (buscar el punto → clic largo → copiar coordenadas → pegar en `data/graffitis.js` → bandera de precisión); verificar que los nombres de campos del ejemplo coinciden exactamente con `data/graffitis.js`

## 3. Mapa

- [x] 3.1 Inicializar Leaflet en `js/map.js` centrado en 4.6404, -74.1693 (zoom inicial del sector) con atribución ODbL visible; verificar que los tiles cargan, el mapa está centrado en Patio Bonito y zoom/pan funcionan
- [x] 3.2 Renderizar un marcador por obra visible con icono propio, y que al seleccionarlo se llama a `abrirDetalle(id)`; verificar que al hacer clic en un marcador se abre la ficha de esa obra
- [x] 3.3 Implementar `centrarEnObra(id)` y conectarlo a la selección de tarjetas; verificar que al elegir una tarjeta el mapa se centra en la coordenada de esa obra y su marcador queda visible

## 4. Descubrimiento

- [x] 4.1 Implementar el estado central `{ query, categoria, seleccionId }` en `js/app.js` con un ciclo de render unificado que repinta tarjetas, marcadores y panel; verificar que un cambio de estado actualiza listado y mapa a la vez
- [x] 4.2 Implementar la búsqueda por nombre, artista, ubicación y categoría que filtra mientras se escribe; verificar con un término que coincide con cada uno de los cuatro campos y con uno inexistente
- [x] 4.3 Implementar los filtros de categoría con la opción "Todos" y su intersección con la búsqueda; verificar: filtro "Mural" muestra sólo murales, "Todos" restaura el conjunto, y búsqueda + filtro devuelven la intersección
- [x] 4.4 Implementar el estado "sin resultados" con mensaje amigable en el listado y mapa sin marcadores; verificar con un término inexistente y con un filtro sin obras
- [x] 4.5 Verificar la sincronización listado↔mapa: tras cada búsqueda o filtro, el número de tarjetas coincide con el número de marcadores visibles

## 5. Panel de detalle

- [x] 5.1 Implementar `abrirDetalle(id)` en `js/ui.js` con un único panel (bottom-sheet en móvil, panel flotante en escritorio) que muestre título, artista, descripción, ubicación y categoría; verificar que el panel es idéntico al abrirlo desde un marcador y desde una tarjeta
- [x] 5.2 Implementar la imagen real o el placeholder honesto dentro del panel con `alt` descriptivo; verificar ambos casos (registro con `imagen: null` y registro con ruta de imagen)
- [x] 5.3 Implementar el badge "Ubicación aproximada" condicionado a `ubicacionAproximada`; verificar que aparece en los registros semilla y desaparece al cambiar la bandera a `false`

## 6. Enlaces de Google Maps

- [x] 6.1 Implementar `urlMaps(registro)`: con coordenadas → `query=LATITUD,LONGITUD`; sin coordenadas → `query=` con la ubicación textual codificada; verificar con un snippet en consola la URL de todos los registros
- [x] 6.2 Agregar el botón "Ver en Google Maps" en el panel de detalle y en cada tarjeta con `target="_blank"` y `rel="noopener noreferrer"`; verificar que el enlace abre Google Maps en una pestaña nueva sin referir la página del visor
- [x] 6.3 Auditar que ningún registro produce enlace vacío ni de ejemplo; verificar recorriendo el catálogo que toda URL tiene un `query` no vacío con la ubicación real del registro
- [x] 6.4 Documentar en `README.md`, dentro de "Cómo funcionan los enlaces de Google Maps", la lógica derivada (coordenadas vs. punto de referencia) y por qué las URLs no se guardan en los datos; verificar que la documentación coincide con `urlMaps()`

## 7. Armazón visual y experiencia

- [x] 7.1 Completar el encabezado ("Visor de Grafitis" / "Patio Bonito — Bogotá" / descripción) y la sección "Sobre este visor" con la nota de precisión de ubicaciones; verificar los textos del spec `viewer-shell`
- [x] 7.2 Implementar el layout responsive: lado a lado en escritorio, apilado sin solapamientos en móvil; verificar en anchos de 1440, 768 y 375 px con las herramientas del navegador que mapa, listado, búsqueda y filtros siguen operables
- [x] 7.3 Aplicar la identidad visual propia (textura de muro en CSS, paleta spray, tipografía del sistema) sin saturar la interfaz; verificar legibilidad y contraste del texto sobre cada fondo
- [x] 7.4 Verificar accesibilidad: `alt` en todas las imágenes, nombres claros en botones y campos, y recorrido completo con teclado Tab desde búsqueda → filtros → tarjetas activables con Enter o Espacio

## 8. Documentación final e integración

- [x] 8.1 Completar `README.md`: instalación y ejecución (doble clic / servidor estático), tecnologías, créditos de fuentes (OSM/ODbL con atribución, verificación vía Nominatim/Overpass) y limitaciones de precisión de ubicaciones; verificar que los 10 puntos del entregable tienen contenido real, sin marcadores "TODO"
- [x] 8.2 Ejecutar la prueba de integración del brief contra los escenarios de los specs: búsqueda, filtros, marcadores, selección de ficha y enlaces de Google Maps; verificar cada flujo observando el comportamiento esperado en el navegador
- [x] 8.3 Ejecutar la prueba de integración responsive completa (HU-07) en computador, tablet y celular simulado; verificar que el flujo entrar → buscar → filtrar → seleccionar → abrir Google Maps funciona en cada tamaño
- [x] 8.4 Inicializar el repositorio git con un `.gitignore` mínimo y hacer el commit inicial; verificar con `git status` que el repo queda limpio y listo para subir a GitHub

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
