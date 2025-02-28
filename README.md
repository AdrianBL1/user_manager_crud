# CRUD USER MANAGER #1 with NODE.JS

Administrador de Usuarios CRUD desarrollado en JavaScript y Node.JS.

# Demostración

## Autenticación

<div align="center">
    <img src="/docs/capturas/auth.jpeg" alt="Autenticación">
</div>

## Dashboard

<div align="center">
    <img src="/docs/capturas/dashboard.jpg" alt="Dashboard">
</div>

## Altas

<div align="center">
    <img src="/docs/capturas/altas.jpeg" alt="Altas">
</div>

## Bajas

<div align="center">
    <img src="/docs/capturas/bajas.jpeg" alt="Bajas">
</div>

## Cambios

<div align="center">
    <img src="/docs/capturas/cambios.jpeg" alt="Cambios">
</div>

## Consultas

<div align="center">
    <img src="/docs/capturas/consultas.jpeg" alt="Consultas">
</div>
<div align="center">
    <img src="/docs/capturas/consultas_2.jpeg" alt="Consultas">
</div>

## Estructura del Proyecto
```bash
master/
├── 404.html
├── altas.html
├── bajas.html
├── cambios.html
├── consultas.html
├── dashboard.html
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── Server.js
├── node_modules
│   └── (Archivos de Node.js)
├── css/
├──  ├── estilos.css
│    └── login.css
├── db/
│   └── (Base de datos no disponible)
├── docs/
│   ├── (capturas)
│   └── comandos_node.txt <- Instrucciones para configurar el proyecto
├── img/
│   └── user.png
└── js/
    ├── altas/
    │   ├── altas_ui.js <- Interfaz
    │   └── altas.js    <- Controlador
    ├── auth/
    │   ├── index_ui.js <- Interfaz
    │   └── index.js    <- Controlador
    ├── bajas/
    │   ├── bajas_ui.js <- Interfaz
    │   └── bajas.js    <- Controlador
    ├── cambios/
    │   ├── cambios_ui.js <- Interfaz
    │   └── cambios.js    <- Controlador
    ├── consultas/
    │   ├── consultas_ui.js <- Interfaz
    │   └── consultas.js    <- Controlador
    ├── dashboard/
    │   ├── dashboard_ui.js <- Interfaz
    │   └── dashboard.js    <- Controlador
    ├── Ajax.js
    ├── BD.js
    ├── Requisicion.js
    ├── Respuesta.js
    ├── Servicios.js
    └── ui.js <- Librería creada para generar la Interfaz
```


## Descripción de Archivos

### HTML

- **404.html**: Página de error 404.
- **altas.html**: Página para altas de usuarios.
- **bajas.html**: Página para bajas de usuarios.
- **cambios.html**: Página para cambios de usuarios.
- **consultas.html**: Página para consultas de usuarios.
- **dashboard.html**: Página principal del dashboard.
- **index.html**: Página de login.

### CSS

- **css/estilos.css**: Estilos generales del proyecto.
- **css/login.css**: Estilos específicos para la página de login.

### JavaScript

- **js/Ajax.js**: Manejo de peticiones AJAX.
- **js/altas/altas_ui.js**: Interfaz de usuario para altas.
- **js/altas/altas.js**: Lógica de negocio para altas.
- **js/auth/index_ui.js**: Interfaz de usuario para autenticación.
- **js/auth/index.js**: Lógica de negocio para autenticación.
- **js/bajas/bajas_ui.js**: Interfaz de usuario para bajas.
- **js/bajas/bajas.js**: Lógica de negocio para bajas.
- **js/BD.js**: Conexión y manejo de la base de datos.
- **js/cambios/cambios_ui.js**: Interfaz de usuario para cambios.
- **js/cambios/cambios.js**: Lógica de negocio para cambios.
- **js/consultas/consultas_ui.js**: Interfaz de usuario para consultas.
- **js/consultas/consultas.js**: Lógica de negocio para consultas.
- **js/dashboard/dashboard_ui.js**: Interfaz de usuario para el dashboard.
- **js/Requisicion.js**: Manejo de requisiciones.
- **js/Respuesta.js**: Manejo de respuestas.
- **js/Servicios.js**: Servicios generales.
- **js/ui.js**: Utilidades para la interfaz de usuario.

### Otros

- **comandos_node.txt**: Comandos para iniciar y configurar el proyecto.
- **package.json**: Configuración del proyecto y dependencias.
- **Server.js**: Servidor principal del proyecto.
- **usuarios.sql**: Script SQL para la base de datos de usuarios.

## Configuración del Proyecto

1. Iniciar el `package.json` desde la terminal de Visual Studio o una terminal del S.O.

    ```sh
    npm init --y
    ```

2. En el archivo  creado en el paso anterior, indicar que se trabajará con módulos para poder utilizar `import` y `export` con las librerías.

    ```json
    "type": "module"
    ```

3. Instalar la dependencia `nodemon` para activar el demonio que se encarga de autocargar el desarrollo.

    ```sh
    npm i -E -D nodemon
    ```

4. En el archivo , crear una entrada `script` para no tener que invocar `nodemon` a cada rato.

    ```json
    "scripts": {
        "dev": "nodemon ./index.js"
    }
    ```

5. Para poner en marcha el script, ejecutar el siguiente comando en la terminal:

    ```sh
    npm run dev
    ```

## Clases y Métodos

###  (Server.js)

- **Métodos**:
  - : Maneja las peticiones GET.
  - : Maneja las peticiones POST.
  - : Obtiene la extensión de un archivo.
  - : Devuelve el tipo de contenido basado en la extensión.
  - : Verifica si un texto es JSON válido.
  - : Verifica si un archivo es binario.
  - : Muestra la página de error 404.

### `dashboard_ui` (js/dashboard/dashboard_ui.js)

- **Métodos**:
  - : Constructor de la clase.
  - : Procesa la interfaz.
  - : Verifica si es un elemento.
  - : Fija los eventos.
  - : Configura la interfaz.
  - : Configura la página actual.
  - : Carga los datos.
  - : Maneja el clic para ir a altas.
  - : Maneja el clic de búsqueda.
  - : Maneja el clic para la página anterior.
  - : Maneja el clic para la página siguiente.
  - : Maneja el clic para cerrar sesión.
  - : Recupera datos.
  - : Muestra un mensaje.

## SQL

- **Consultas**:
  - `CONSULTAS`: Consulta de nombres.
  - `CONSULTAS_NOMBRE`: Consulta de nombres por coincidencia.
  - `CONSULTAS_EDAD`: Consulta de nombres por edad.
  - `CONSULTAS_EDADENRANGO`: Consulta de nombres por rango de edad.
  - `CONSULTAS_ACCESO`: Consulta de acceso.

## Licencia

Este proyecto está bajo la Licencia MIT.