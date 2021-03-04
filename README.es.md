# MERNTasks

MERNTasks es un CRUD básico de proyectos y tareas creado como evidencia de mi aprendizaje utilizando la arquitectura MERN. Espero que lo encuentres interesante y cualquier comentario o sugerencia será bien recibido.

## Principales características :clipboard:

* React, React-Router-DOM, Typescript (TSX), Function Components, React Hooks & Context API.
* Axios
* Cypress (Testing)

## En producción :package:

Puedes ver una versión en producción de este proyecto aquí: [MERNTasks](https://affectionate-hodgkin-3670a5.netlify.app/).

### Notas

* **Email**: tester@email.com / **Contraseña**: 123456
* Limitado a un número máximo de 5 usuarios guardados en base de datos.
* Limitado a 10 proyectos por usuario.
* Limitado a 15 tareas por proyecto.

## Comenzando :rocket:

_Estas instrucciones te permitirán generar una copia del proyecto corriendo en tu máquina de forma local para propósitos de desarrollo y de pruebas._

### Configuración previa :gear:
 
1. Configura las variables del servidor y ejecútalo de forma local como lo muestran estas instrucciones: [Servidor](./server/SERVER.es.md). 
2. Cambia la variable `REACT_APP_BACKEND_URL` del archivo `.env` por la URL donde el servidor se encuentre escuchando.

## Instalación :wrench:

Instala todas las dependencias ejecutando el siguiente comando en el directorio del proyecto:

```bash
npm install
```

Ahora puedes ejecutar el proyecto en modo de desarrollo usando:

```bash
npm start
```

Por defecto la aplicación correrá en **http://localhost:3000**.

## Pruebas con Cypress :hammer:

_Este proyecto tiene un pequeño set para pruebas **end-to-end** implementado con Cypress para verificar el comportamiento de la aplicación._

### Ejecutando las pruebas

1. Coloca la URL en la que el servidor se encuentra escuchando en la variable `backendUrl` del archivo `test-data.json` en el directorio `cypress/fixtures`.
2. Ejecuta el siguiente comando en el directorio del proyecto para desplegar la consola de Cypress y selecciona cualquier prueba en el set de pruebas.

```bash
./node_modules/.bin/cypress open
```

## Contruído con :hammer_and_wrench:

* [Create React App](https://github.com/facebook/create-react-app) - Crea aplicaciones en React sin configuración de compilación.

## Licencia :page_with_curl:
[ISC](https://opensource.org/licenses/ISC)
