# Visor de Grafitis de Patio Bonito

## 1. Nombre del proyecto

**Visor de Grafitis de Patio Bonito** — Bogotá, Colombia.

## 2. Descripción

Aplicación web estática e interactiva que muestra el arte urbano del sector de Patio Bonito sobre un mapa
(Leaflet + OpenStreetMap), con listado de tarjetas, búsqueda, filtros por categoría y, para cada obra,
un enlace funcional a Google Maps que lleva al punto de referencia declarado.

## 3. Objetivo

Visibilizar el arte urbano de Patio Bonito y facilitar la exploración de sus ubicaciones: entrar, ver el mapa,
seleccionar un grafiti, leer su información y abrir su ubicación en Google Maps en pocos pasos.

## 4. Tecnologías utilizadas

- **HTML5 + CSS3 + JavaScript** (vanilla, sin frameworks ni paso de build).
- **Leaflet 1.9.x** (CDN) + tiles de **OpenStreetMap**.
- Google Maps **sólo como enlace externo** — no se embebe su mapa ni se usa su API.

## 5. Cómo instalarlo

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd intro_visor
   ```
2. No hay dependencias que instalar. El único requisito es abrir `index.html` (aunque los tiles del mapa
   y Leaflet se cargan desde internet, por lo que se necesita conexión).

## 6. Cómo ejecutarlo

- **Doble clic:** abre `index.html` directamente en el navegador.
- **Servidor estático (opcional):** `python -m http.server` o `npx serve` desde la raíz del proyecto
  y abre `http://localhost:8000`.

## 7. Cómo agregar nuevos grafitis

Todos los datos viven en **una sola fuente editable**: `data/graffitis.js`, en el array `GRAFFITIS`.
Cada registro tiene 9 campos:

```js
{
  id: 10,                      // entero, único
  nombre: "Nombre de la obra",
  artista: "Artista no identificado",
  descripcion: "Breve descripción.",
  categoria: "Mural",          // Arte urbano | Mural | Graffiti | Intervención | Otros
  ubicacion: "Punto de referencia, Patio Bonito, Bogotá",
  latitud: 4.6400,             // coordenadas del punto
  longitud: -74.1700,
  ubicacionAproximada: true,   // true = se muestra el badge "Ubicación aproximada"
  imagen: null                 // ruta de una foto o null (usa placeholder)
}
```

**Receta de 30 segundos desde Google Maps:**

1. Abre Google Maps y busca el punto real donde está la obra.
2. En el celular, mantén presionado el punto y copia las coordenadas que aparecen;
   en el computador, haz clic derecho sobre el punto y elige «¿Qué hay aquí?».
3. Pega un nuevo objeto en `GRAFFITIS` con esas coordenadas en `latitud` y `longitud`.
4. Si **verificaste la obra en su sitio**, pon `ubicacionAproximada: false`;
   si todavía no, déjalo en `true` — la interfaz lo marcará como aproximado.

Reglas de honestidad de este proyecto: jamás se inventa un artista (por defecto se usa
«Artista no identificado»), jamás se inventa una coordenada (se usa un punto de referencia real
del sector) y toda ubicación no verificada se declara aproximada.

## 8. Cómo funcionan los enlaces de Google Maps

Los enlaces se **derivan de los datos en cada render** (no se guardan URLs a mano, lo que evita
enlaces desactualizados o falsos):

- Con coordenadas → `https://www.google.com/maps/search/?api=1&query=LATITUD,LONGITUD`
  (lleva al punto exacto).
- Sin coordenadas → `https://www.google.com/maps/search/?api=1&query=<ubicación codificada>`
  (busca el punto de referencia por su texto).

Todos los enlaces abren en pestaña nueva con `target="_blank"` y `rel="noopener noreferrer"`.

## 9. Créditos de las fuentes de datos e imágenes

- **Mapa y datos geográficos:** © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, licencia **ODbL**. Los puntos de
  referencia del sector (parques, colegio, canal, canchas) fueron verificados vía la API de
  OpenStreetMap (Nominatim / Overpass) dentro de la UPZ Patio Bonito.
- **Fotografías:** por ahora no hay fotografías originales; cada obra muestra un *placeholder* SVG
  por categoría hasta que se agregue una imagen real.
- **Arte urbano:** los registros semilla son de ejemplo y no atribuyen artista ni obra concreta
  mientras no haya una fuente verificable.

## 10. Limitaciones de precisión de las ubicaciones

- Las coordenadas iniciales corresponden a **puntos de referencia reales del sector** (parque,
  estación, canal, colegio), **no** a la ubicación exacta verificada de cada obra.
- Toda obra sin verificación en campo se muestra con el badge **«Ubicación aproximada»**.
- Si un registro apunta a un punto de referencia y quieres la ubicación exacta de la obra,
  verifícala en sitio (o con Google Maps) y actualiza `latitud`, `longitud` y
  `ubicacionAproximada: false` en `data/graffitis.js`.
- El arte urbano es efímero: una obra puede desaparecer o repintarse. Verifica antes de visitarla.