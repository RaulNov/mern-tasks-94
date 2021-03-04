# MERNTasks - Server

MERNTasks - Server is the Node.js project that complements the MERN architecture through an Express server working in conjunction with a MongoDB database.

Guía en [español](./SERVER.es.md) :page_facing_up:.

## Main features :clipboard:

* Express with Express-Validator & JWT Authorization
* Mongoose
* Typescript

## Getting started :rocket:

### Pre-configuration :gear:

Set the environment variables of the `.env` file as follows:

* `DB_MONGO`: the URI of the MongoDB database.
* `PORT`: the port where the express server will run.
* `SECRET`: the secret word to encrypt and validate JWT.

## Installation :wrench:

Install all dependencies by running next command in the server directory:

```bash
npm install
```

Now you can run the project in development mode using:

```bash
npm run watch-ts
```

## Building :package:

To generate a compiled version of the MERNTasks - Server in a `dist` directory, run the following command:

```bash
npm run build:dev
```

Now you can run this compiled version with the following command:

```bash
npm start
```

## Built with :hammer_and_wrench:

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
* [JWT](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens.

## License :page_with_curl:
[ISC](https://opensource.org/licenses/ISC)
