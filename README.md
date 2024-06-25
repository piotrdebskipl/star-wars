# Star Wars API

This API is for recruitment purposes

## Requirements

Make sure you have installed:

- docker
- docker-compose

## Tech Stack

- Node.js + Expresss + Seqelize
- Postgres

## Installation

### Pre-requests

```
cp .env.dist .env
cp src/config/database.json.dist src/config/database.json
```

### Building application

`docker-compose up --build`

### Running migration up

Run commands inside container

```
npx sequelize-cli db:migrate
```

For testing purposes create another database and run:

```
npx sequelize-cli db:migrate --env test
```

### Running tests

Run command inside container

```
npx jest
```

## API

The API is available default on http://localhost:8080/

### Documentation

Swagger is used for documenting API and it is avalable default on http://localhost:8080/docs/
