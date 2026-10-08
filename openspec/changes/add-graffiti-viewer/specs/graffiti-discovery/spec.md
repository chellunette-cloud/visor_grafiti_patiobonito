# Spec Delta

## Purpose

Permite encontrar grafitis por texto y por categoría, presentando un listado de tarjetas siempre sincronizado con los marcadores del mapa.

## ADDED Requirements

### Requirement: Búsqueda por texto

El sistema SHALL ofrecer un campo de búsqueda que filtre las obras por nombre, artista, ubicación y categoría, actualizando los resultados mientras el usuario escribe.

#### Scenario: Término que coincide

- **WHEN** el usuario escribe un término que coincide con el nombre, artista, ubicación o categoría de una obra
- **THEN** sólo se muestran las obras coincidentes, en el listado y en el mapa

#### Scenario: Sin coincidencias

- **WHEN** ningún registro coincide con el término buscado
- **THEN** el listado muestra un mensaje amigable de "sin resultados" y el mapa queda sin marcadores

### Requirement: Filtros por categoría

El sistema SHALL ofrecer filtros de categoría, incluyendo la opción "Todos" y las categorías presentes en el catálogo, restringiendo el conjunto visible.

#### Scenario: Filtro activo

- **WHEN** el usuario activa el filtro de una categoría (por ejemplo "Mural")
- **THEN** sólo se muestran obras de esa categoría en el listado y en el mapa

#### Scenario: Volver a todos

- **WHEN** el usuario selecciona la opción "Todos"
- **THEN** se restaura el conjunto completo de obras

#### Scenario: Filtro sin resultados

- **WHEN** el filtro seleccionado no tiene obras asociadas
- **THEN** el listado muestra el mensaje de "sin resultados"

### Requirement: Búsqueda y filtro se combinan

El sistema SHALL mostrar sólo las obras que satisfacen a la vez el término de búsqueda y el filtro de categoría activos.

#### Scenario: Ambos criterios activos

- **WHEN** hay un término de búsqueda y un filtro de categoría al mismo tiempo
- **THEN** el resultado es la intersección de ambos criterios, en listado y mapa

### Requirement: Listado de tarjetas

El sistema SHALL mostrar un listado de tarjetas con imagen o placeholder, nombre, artista, ubicación y un botón para ver la ubicación de la obra.

#### Scenario: Listado cargado

- **WHEN** hay obras visibles
- **THEN** cada obra aparece como tarjeta con esos datos y su botón de ubicación

### Requirement: Listado y mapa sincronizados

El conjunto de tarjetas y el conjunto de marcadores SHALL representar siempre las mismas obras.

#### Scenario: Resultados idénticos

- **WHEN** cambian los resultados por búsqueda o filtro
- **THEN** el número de tarjetas coincide con el número de marcadores visibles
