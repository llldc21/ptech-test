# P-Tech Backend Test

This project is about testing for the job of back-end developer at P-Tech

## Getting Started

Clone the project on your machine and follow the prerequisites and installation.

### Prerequisites

You will need to have in your machine:

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) or [NPM](https://docs.npmjs.com/cli/install)
- [Docker](https://docs.docker.com/desktop/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

### Installing

After verifying that your machine meets the requirements, follow the commands:

1. Install the dependencies

```
yarn install
```

2. Create a file called .env and place the following parameters in it:

```
TOKEN
PORT
```

These values can be filled in as you prefer, but cannot be empty as this would compromise the functioning of the application.
The `TOKEN` field must be a string whereas the`PORT` field must be an integer.

3. Finally, run the command below to start the database, run the migrations and start the api.

```
yarn start:all
```

The command above starts the database that runs in the Docker, then runs all migrations of the application and finally runs the application, if one of these steps returns an error message it is possible (and necessary) to run the commands one by one.

Starts the database:

```
yarn db:init
```

Run migrations:

```
 yarn migration:run
```

Launch the application

```
yarn start:dev
```

## Built With

- [Typescript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [TypeORM](https://typeorm.io/#/) - Amazing ORM for TypeScript nd Javascript
- [JWT](https://www.npmjs.com/package/jsonwebtoken) - For creating tokens
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - For password encryption
- [Postgres](https://www.postgresql.org/) - For the database
