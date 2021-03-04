# MERNTasks

MERNTasks is a basic CRUD of projects and tasks created as an evidence of my learning using MERN architecture. Hope you find interesting and any comment or suggestion will be well received.

Guía en [español](./README.es.md) :page_facing_up:.

## Main features :clipboard:

* React, React-Router-DOM, Typescript (TSX), Function Components, React Hooks & Context API.
* Axios
* Cypress

## Production :package:

You can see a production version of this project here: [MERNTasks](https://affectionate-hodgkin-3670a5.netlify.app/).

### Notes

* **Email**: tester@email.com / **Password**: 123456
* Limited to a maximum number of 5 users in db.
* Limited to 10 projects in db, per user.
* Limitet to 15 tasks in db, per project.

## Getting started :rocket:

_This instructions allow you to generate a copy of the project running on your local machine for development and testing purposes._

### Pre-configuration :gear:

1. Configure the server variables and run it locally as shown in these instructions: [Server](./server/SERVER.md). 
2. Change `REACT_APP_BACKEND_URL` variable in `.env` file with the URL where server is listening.

## Installation :wrench:

Install all dependencies by running next command in the project directory:

```bash
npm install
```

Now you can run the project in development mode using:

```bash
npm start
```

By default, app will run on **http://localhost:3000**.

## Testing with Cypress :hammer:

_This project has a small **end-to-end** Test set implemented with Cypress to verify app's behavior._

### Running tests

1. Set the URL where the server is listening in the variable `backendUrl` in the file` testdata.json` inside directory `cypress/fixtures`.
2. Run the following command in the project directory to display Cypress console and run any option of the Test set.

```bash
./node_modules/.bin/cypress open
```

## Built with :hammer_and_wrench:

* [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.

## License :page_with_curl:
[ISC](https://opensource.org/licenses/ISC)
