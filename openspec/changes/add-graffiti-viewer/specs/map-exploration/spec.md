# Spec Delta

## Purpose

Permite explorar las obras sobre un mapa interactivo centrado en Patio Bonito, localizando y seleccionando cada grafiti por su posición en el sector.

## ADDED Requirements

### Requirement: Mapa centrado en Patio Bonito

El sistema SHALL mostrar un mapa interactivo centrado en la UPZ Patio Bonito, Bogotá, con zoom y desplazamiento habilitados.

#### Scenario: Carga inicial

- **WHEN** la aplicación termina de cargar
- **THEN** el mapa muestra el sector Patio Bonito centrado y permite acercar, alejar y desplazar

#### Scenario: El usuario explora el mapa

- **WHEN** el usuario aplica zoom o arrastra el mapa
- **THEN** el mapa responde sin perder los marcadores de las obras

### Requirement: Un marcador por cada obra visible

El sistema SHALL mostrar exactamente un marcador por cada grafiti del conjunto actualmente visible, tras aplicar la búsqueda y los filtros activos.

#### Scenario: Sin filtros activos

- **WHEN** no hay término de búsqueda ni filtro de categoría activo
- **THEN** hay un marcador por cada registro del catálogo

#### Scenario: Con filtros activos

- **WHEN** la búsqueda o un filtro reducen el conjunto visible
- **THEN** sólo se muestran marcadores de las obras que siguen visibles

### Requirement: Marcadores identificables

Los marcadores SHALL usar un icono propio, distinguible del fondo del mapa, con tamaño suficiente para poder tocarse en pantallas móviles.

#### Scenario: Distinción sobre el mapa base

- **WHEN** el mapa está cargado
- **THEN** los marcadores se distinguen claramente de las etiquetas y formas del mapa base

### Requirement: Seleccionar un marcador muestra su ficha

Al seleccionar un marcador, el sistema SHALL mostrar la información de la obra correspondiente (ver capability `graffiti-details`).

#### Scenario: Clic o toque en un marcador

- **WHEN** el usuario hace clic o toca un marcador
- **THEN** se muestra la ficha de información de esa obra

### Requirement: Centrar el mapa en una obra seleccionada desde el listado

Cuando el usuario selecciona una obra desde el listado, el sistema SHALL centrar el mapa en la coordenada de esa obra.

#### Scenario: Seleccionar una tarjeta

- **WHEN** el usuario elige una tarjeta del listado
- **THEN** el mapa se centra en la posición de esa obra y su marcador queda visible
