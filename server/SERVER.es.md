# MERNTasks - Server

MERNTasks - Server es el proyecto de Node.js que complementa a la aquitectura de MERN por medio de un servidor Express trabajando en conjunto con una base de datos de MongoDB.

## Principales características :clipboard:

* Express con Express-Validator y autenticación por JWT
* Mongoose
* Typescript

## Comenzando :rocket:

### Configuración previa :gear:

Configura las variables de entorno del archivo `.env` de la siguiente forma:

* `DB_MONGO`: la URI de la base de datos de MongoDB.
* `PORT`: el puerto donde correrá el servidor de express.
* `SECRET`: la palabra secreta para encriptar y validar los JWT.

## Instalación :wrench:

Instala todas las dependencias ejecutando el siguiente comando en el directorio del servidor:

```bash
npm install
```

Ahora puedes ejecutar el proyecto en modo de desarrollo usando:

```bash
npm run watch-ts
```

## Building :package:

Para generar una versión compilada del MERNTasks - Server en un directorio `dist`, ejecuta el siguiente comando:

```bash
npm run build:dev
```

Ahora puedes ejecutar esta versión compilada con el siguiente comando: 

```bash
npm start
```

## Contruído con :hammer_and_wrench:

* [Express](https://expressjs.com/es/) - Infraestructura web rápida, minimalista y flexible para Node.js.
* [Mongoose](https://mongoosejs.com/) - Elegante modelado de objetos de MongoDB para Node.js.
* [JWT](https://github.com/auth0/node-jsonwebtoken) - Una implementación de JSON Web Tokens.

## Licencia :page_with_curl:
[ISC](https://opensource.org/licenses/ISC)
