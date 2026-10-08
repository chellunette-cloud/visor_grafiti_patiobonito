# Spec Delta

## Purpose

Define el armazón de la aplicación: encabezado con identidad, sección informativa, diseño responsive, identidad visual propia y accesibilidad básica.

## ADDED Requirements

### Requirement: Encabezado con identidad del visor

El sistema SHALL mostrar un encabezado con el título "Visor de Grafitis", el subtítulo "Patio Bonito — Bogotá" y una breve descripción del propósito del visor.

#### Scenario: Encabezado visible

- **WHEN** la aplicación carga
- **THEN** el encabezado muestra título, subtítulo y descripción del visor

### Requirement: Sección "Sobre este visor"

El sistema SHALL incluir una sección inferior "Sobre este visor" que explique el propósito del proyecto y una nota de que las ubicaciones mostradas pueden ser aproximadas, recomendando consultar Google Maps para explorar el entorno de cada punto.

#### Scenario: Sección informativa presente

- **WHEN** el usuario llega al final de la página
- **THEN** encuentra la explicación del proyecto y la nota de precisión de ubicaciones

### Requirement: Interfaz responsive

La interfaz SHALL adaptarse a computadores, tablets y celulares; en pantallas pequeñas el mapa y el listado SHALL reorganizarse de manera cómoda, sin solapamientos ni pérdida de funcionalidad.

#### Scenario: Pantalla de computador

- **WHEN** la aplicación se ve en una pantalla de escritorio
- **THEN** el mapa y el listado se muestran lado a lado y ambos son utilizables

#### Scenario: Pantalla de celular

- **WHEN** la aplicación se ve en una pantalla pequeña
- **THEN** mapa y listado se reorganizan verticalmente o mediante pestañas, sin solapamientos, y búsqueda, filtros, tarjetas y marcadores siguen siendo operables

### Requirement: Identidad visual propia

La estética SHALL tener identidad propia inspirada en arte urbano, graffiti y Bogotá (colores urbanos, textura de muro, tipografía moderna), sin saturar la interfaz y manteniendo la legibilidad del texto.

#### Scenario: Legibilidad

- **WHEN** la interfaz está cargada en cualquier sección
- **THEN** el texto mantiene contraste suficiente sobre sus fondos y la información se lee sin esfuerzo

### Requirement: Accesibilidad básica

Los controles SHALL tener nombres claros, las imágenes SHALL usar atributo `alt`, y la búsqueda, los filtros y las tarjetas SHALL ser navegables y activables con el teclado.

#### Scenario: Navegación por teclado

- **WHEN** el usuario navega con la tecla Tab
- **THEN** puede alcanzar el campo de búsqueda, los filtros y las tarjetas, y activarlos con Enter o Espacio
