# Spec Delta

## Purpose

Garantiza que cada obra tenga un enlace real y funcional a Google Maps que lleve al punto de referencia declarado, distinguiendo ubicaciones precisas de aproximadas.

## ADDED Requirements

### Requirement: Enlace "Ver en Google Maps" en cada obra

El sistema SHALL mostrar un enlace con el texto "Ver en Google Maps" para cada obra, tanto en el panel de detalle como en sus tarjetas del listado.

#### Scenario: Enlace presente en el panel

- **WHEN** una obra está seleccionada y su panel está abierto
- **THEN** el enlace "Ver en Google Maps" está visible en el panel

#### Scenario: Enlace presente en la tarjeta

- **WHEN** una obra aparece en el listado
- **THEN** su tarjeta incluye el botón de ubicación hacia Google Maps

### Requirement: Enlace preciso por coordenadas

Cuando el registro tiene coordenadas, el enlace SHALL construirse como búsqueda de Google Maps con esas coordenadas, con el parámetro `query=LATITUD,LONGITUD`.

#### Scenario: Registro con coordenadas

- **WHEN** el registro tiene latitud y longitud
- **THEN** la URL del enlace contiene `query=` seguido de esas coordenadas y abre Google Maps en ese punto

### Requirement: Enlace por punto de referencia sin coordenadas

Cuando el registro sólo tiene ubicación textual, el enlace SHALL usar la búsqueda de Google Maps con el texto del punto de referencia disponible, sin inventar coordenadas.

#### Scenario: Sólo ubicación textual

- **WHEN** el registro no tiene coordenadas
- **THEN** la URL codifica el texto de la ubicación y abre Google Maps buscando ese punto de referencia

### Requirement: Apertura en pestaña nueva segura

El enlace SHALL abrirse en una pestaña nueva mediante `target="_blank"` con `rel="noopener noreferrer"`.

#### Scenario: Activar el enlace

- **WHEN** el usuario activa el enlace de Google Maps
- **THEN** Google Maps se abre en una pestaña nueva y la página del visor no cede control a la página abierta

### Requirement: Sin enlaces falsos

Las URLs de los enlaces SHALL corresponder siempre a la ubicación declarada del registro; no SHALL existir enlaces vacíos, de ejemplo o no funcionales.

#### Scenario: Revisión de todos los registros

- **WHEN** se recorren los enlaces de todas las obras del catálogo
- **THEN** cada enlace tiene un parámetro `query` con la ubicación real del registro y ninguno está vacío o apunta a un destino de ejemplo
