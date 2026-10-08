# Spec Delta

## Purpose

Presenta la información de la obra seleccionada en un panel único y coherente, con imagen o placeholder y el estado de precisión de su ubicación.

## ADDED Requirements

### Requirement: Panel de detalle con la información básica

Al seleccionar una obra desde un marcador o desde una tarjeta, el sistema SHALL mostrar un panel con el título, el artista, la descripción, la ubicación y el botón "Ver en Google Maps".

#### Scenario: Selección desde el marcador

- **WHEN** el usuario selecciona un marcador del mapa
- **THEN** se muestra el panel con título, artista, descripción, ubicación y el botón de Google Maps

#### Scenario: Selección desde la tarjeta

- **WHEN** el usuario selecciona una tarjeta del listado
- **THEN** se muestra el mismo panel con la misma información de esa obra

### Requirement: Imagen o placeholder honesto

El panel SHALL mostrar la imagen de la obra cuando exista; cuando no exista, SHALL mostrar un placeholder claramente identificativo de la ausencia de imagen, nunca una imagen falsa, con texto alternativo descriptivo.

#### Scenario: Obra sin fotografía

- **WHEN** el registro no tiene imagen
- **THEN** se muestra un placeholder etiquetado como imagen no disponible, con `alt` descriptivo

#### Scenario: Obra con fotografía

- **WHEN** el registro incluye una imagen
- **THEN** se muestra dicha imagen con un `alt` que describe la obra

### Requirement: Badge de ubicación aproximada

Cuando la ubicación de la obra es aproximada, el panel SHALL mostrar de forma visible el texto "Ubicación aproximada".

#### Scenario: Registro aproximado

- **WHEN** la bandera de precisión del registro está en "aproximada"
- **THEN** el panel muestra el badge "Ubicación aproximada"

#### Scenario: Registro verificado en campo

- **WHEN** la bandera de precisión del registro está en "precisa"
- **THEN** el panel no muestra el badge de aproximación

### Requirement: Categoría visible cuando existe

Cuando el registro incluye categoría, el panel SHALL mostrarla junto a la ubicación de la obra.

#### Scenario: Categoría presente

- **WHEN** el registro de la obra tiene una categoría asignada
- **THEN** la ficha muestra la categoría de la obra
