# Spec Delta

## Purpose

Mantiene la fuente única de verdad del visor: un catálogo de grafitis editable por separado del código, con reglas de honestidad que impiden presentar como ciertos datos no verificados.

## ADDED Requirements

### Requirement: Catálogo editable sin tocar la interfaz

El sistema SHALL almacenar todos los registros de grafitis en una única fuente de datos editable sin modificar el código de la interfaz; agregar, editar o eliminar un registro SHALL reflejarse en todos los componentes que consumen el catálogo.

#### Scenario: Agregar un registro nuevo

- **WHEN** se agrega un registro completo a la fuente de datos y se recarga la aplicación
- **THEN** el registro aparece en el mapa, en el listado, en la búsqueda y en los filtros sin editar ningún otro archivo

#### Scenario: Editar un registro existente

- **WHEN** se cambia la descripción o el nombre de un registro en la fuente de datos
- **THEN** la ficha y la tarjeta de esa obra muestran el nuevo valor tras recargar

### Requirement: Esquema de registro

Cada registro SHALL incluir al menos: identificador único, nombre, artista, descripción, categoría, ubicación textual, latitud, longitud y la bandera de precisión de ubicación.

#### Scenario: Registro completo

- **WHEN** se inspecciona cualquier registro del catálogo
- **THEN** los nueve campos obligatorios están presentes y el identificador es único

### Requirement: Sin atribuciones inventadas

El sistema SHALL mostrar "Artista no identificado" cuando un registro no tenga un autor verificado; está prohibido presentar cualquier nombre de artista no respaldado por la fuente.

#### Scenario: Registro sin autor verificado

- **WHEN** un registro no incluye un artista verificado
- **THEN** la ficha y la tarjeta muestran el texto "Artista no identificado"

### Requirement: Ubicaciones aproximadas siempre marcadas

El sistema SHALL tratar como aproximada toda ubicación cuya coordenada no esté verificada en el sitio, mediante la bandera de precisión del registro; ningún dato no verificado SHALL presentarse como preciso.

#### Scenario: Registro no verificado en campo

- **WHEN** la ubicación de un registro corresponde a un punto no verificado en sitio
- **THEN** su bandera de precisión está en "aproximada" y los componentes la tratan como tal

### Requirement: Registros semilla anclados a puntos reales

Cada registro inicial SHALL usar coordenadas de un punto de referencia real y verificable dentro de Patio Bonito, y SHALL declararse aproximado salvo verificación en campo.

#### Scenario: Coordenadas válidas en la UPZ

- **WHEN** se inspeccionan las coordenadas de los registros semilla
- **THEN** caen dentro de los límites de la UPZ Patio Bonito y corresponden a un punto de referencia existente del sector

#### Scenario: Verificación en campo posterior

- **WHEN** un visitante verifica una obra en su sitio y actualiza el registro con la coordenada real y la bandera en "precisa"
- **THEN** el registro deja de tratarse como aproximado en toda la interfaz
