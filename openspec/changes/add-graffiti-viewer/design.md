# Design

## Context

Proyecto greenfield: el repositorio sólo contiene OpenSpec. El brief académico y la investigación de exploración (ver proposal.md — Why) fijan las restricciones: sin API keys, sin paso de build, datos honestos de un sector con cero grafitis documentados en fuentes públicas. Coordenadas verificadas disponibles de la UPZ Patio Bonito (OSM): centro 4.6404, -74.1693; límites 4.6284–4.6542 N / -74.1828–-74.1563 O, más ~15 puntos de anclaje reales (parques, colegio, canal, cancha) obtenidos vía Overpass.

## Goals / Non-Goals

**Goals:**

- Aplicación estática abrible con doble clic y desplegable en GitHub Pages tal cual.
- Estado de búsqueda/filtro/Selección único que alimente lista, mapa y panel sin desincronizarse.
- Cada registro con enlace a Google Maps que funcione hoy (punto real) y escale a obra verificada en campo sin cambiar el esquema.
- Estructura de código en módulos pequeños alineados a los componentes del brief (Header, SearchBar, FilterButtons, Map, GraffitiCard, GraffitiList, GraffitiDetails, Footer).

**Non-Goals:**

- No embeber Google Maps ni usar su API (sólo enlaces externos).
- No backend, base de datos, CMS ni autenticación.
- No paso de build, bundler, transpilación ni framework.
- No incluir datos de Street Art Cities u otras fuentes con licencia restrictiva.
- No servir fotos reales en la primera versión (placeholders hasta que existan fotos propias).

## Decisions

### D1 — Vanilla HTML/CSS/JS sin framework

Alternativas: React+Vite (build, dependencias, curva para proyecto académico), Web Components (overkill para una vista). Justificación: la app es un estado pequeño + render; vanilla abre con doble clic, se clona y funciona, y el brief lo prefiere explícitamente.

### D2 — Datos en `data/graffitis.js`, no `graffitis.json`

`fetch()` sobre `file://` está bloqueado por CORS; un array global (`const GRAFFITIS = [...]`) funciona sin servidor local. Alternativa: JSON + Live Server (más limpio, pero rompe "doble clic"). El archivo sigue siendo trivialmente editable — es JSON con una línea de envoltura. Se carga antes que `app.js` con un `<script>` clásico.

### D3 — Estado centralizado con render unificado

```
estado = { query, categoria, seleccionId }
    |                 |
    +----> render() --+--> tarjetas  +  marcadores  +  panel detalle
```

Un solo ciclo de render a partir de un estado inmutable evita el bug clásico de "el filtro no actualiza el mapa". Alternativa: listeners DOM que mutan cada vista por separado (descartada: fuente de desincronización).

### D4 — Leaflet + tiles OSM (CDN)

Sin API key, sin costo, atribución ODbL obligatoria en el mapa y el pie. Google Maps queda sólo como destino de enlaces. CDN con SRI: un solo script; si el CDN cae, los tiles caerían igual (requieren internet), por lo que local/offline no aporta.

### D5 — Panel único de detalle

El mismo componente se abre desde marcador y tarjeta: modal tipo *bottom-sheet* en móvil, panel flotante lateral en escritorio (misma función `abrirDetalle(id)`). Alternativa: popup de Leaflet para marcadores + modal para tarjetas (descartada: dos implementaciones y UX inconsistente).

### D6 — Enlace de Google Maps derivado, no almacenado

```js
function urlMaps(reg) {
  if (reg.latitud != null && reg.longitud != null)
    return `https://www.google.com/maps/search/?api=1&query=${reg.latitud},${reg.longitud}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(reg.ubicacion)}`;
}
```

No se guarda `googleMapsUrl` en los datos: impide URLs desincronizadas o de ejemplo (RF-03 "sin enlaces falsos"). Los registros semilla siempre tienen coordenadas (del punto de anclaje real), por lo que el link lleva al punto exacto; `ubicacionAproximada: true` sólo controla el badge y la honestidad de la ficha.

### D7 — Semillas: 8–10 registros anclados a puntos verificados

Usar exclusivamente los puntos OSM ya verificados dentro de la UPZ (Parque Altamar 4.6354993/-74.1716524, Parque Las Margaritas, Parque Tintalito, Colegio Rodrigo de Triana, Canal Tintal II, Cancha Tocarema, etc.). Todos con `ubicacionAproximada: true`, `artista: "Artista no identificado"` salvo que la fuente lo verifique, `imagen: null` (placeholder SVG por categoría). Categorías = enum de los filtros: `Arte urbano`, `Mural`, `Graffiti`, `Intervención`, `Otros`.

### D8 — Identidad visual sin dependencias pesadas

Paleta "asfalto + spray": fondo oscuro/gris texturizado con SVG/CSS (ruido y línea de ladrillo sutiles, sin imágenes bitmap), acentos amarillo/aqua. Tipografía del sistema con pesos display (cero peticiones externas de fuente, RNF-04). Contraste verificado AA para texto sobre fondo.

### D9 — Estructura del repo

```
index.html
css/styles.css
js/app.js        # estado + render + wiring
js/map.js        # init Leaflet, marcadores, centrado
js/ui.js         # tarjetas, panel detalle, placeholders
data/graffitis.js
assets/img/      # placeholders SVG
README.md
openspec/
```

## Risks / Trade-offs

- [El visitante llega al punto de anclaje y no encuentra la obra] → Badge "Ubicación aproximada" visible en ficha y tarjeta + nota "Sobre este visor" + README con el flujo de verificación en campo para actualizar el registro a coordenada propia.
- [Muy pocos o ningún grafiti "real" al lanzar] → Las semillas declaran ser ejemplos de estructura anclada a puntos reales; la app no afirma obras no verificadas. El README explica cómo agregar obras reales en 30 s desde Google Maps.
- [Tiles OSM o CDN no cargan] → Atribución siempre visible; si Leaflet no inicializa, mostrar mensaje de error amigable en lugar de un mapa vacío.
- [Acumulación futura de cientos de registros] → La búsqueda sobre array es O(n); suficiente hasta miles de registros (no objetivo actual: decenas).
- [Licencia ODbL olvidada] → Atribución de tiles y datos OSM en el mapa y en el README (tarea explícita en tasks.md).
- [Ruido visual de la identidad "graffiti"] → Límite de contraste y densidad definidos en `viewer-shell`; texturas como acento, no como fondo de texto.

## Migration Plan

1. Implementación en la rama principal directamente (repo sin historial previo).
2. Publicación: `git push` a GitHub; opcionalmente GitHub Pages apuntando a la raíz (la app es estática, sin configuración).
3. Rollback: revert del commit; ningún dato externo ni servicio que migrar.
