# Parcial P3 - Registro y Login

## Descripcion del proyecto

Modulo de registro y autenticacion de usuarios hecho solo con HTML, CSS y JavaScript, sin frameworks ni backend. Los usuarios se guardan en localStorage y se simula una peticion a un servidor con async/await.

## Tecnologias

- HTML
- CSS (Flexbox)
- JavaScript (DOM, localStorage, async/await)

## Estructura del proyecto

```
/parcial-p3
|-- index.html
|-- styles.css
|-- app.js
|-- README.md
|-- Flujo de Registro.jpg
|-- Flujo de Login.jpg
|-- Esquema del codigo - Funciones y responsabilidades.jpg
```

## Como ejecutar

Abrir el archivo index.html en el navegador. No requiere instalacion ni servidor.

## Validaciones del registro

- Todos los campos son obligatorios
- El email debe tener un formato valido
- La contrasena debe tener al menos 8 caracteres y al menos un numero
- La confirmacion de contrasena debe coincidir
- El usuario debe ser mayor de 18 años
- Hay que aceptar los terminos y condiciones
- No se permiten emails duplicados

## Flujo del proceso

### Proceso de registro

![Flujo de registro](./Flujo%20de%20Registro.jpg)


### Proceso de login

![Flujo de login](./Flujo%20de%20Login.jpg)

### Esquema del codigo

![Esquema del codigo](./Esquema%20del%20codigo%20-%20Funciones%20y%20responsabilidades.jpg)
