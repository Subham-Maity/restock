<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Start the server in development mode

```bash
docker-compose up
```

## Start the server in production mode

> Before that, npm installed prisma globally `npm install prisma --save-dev`

- Migrate the database

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma studio
```

Some Cheat Sheet

```bash
nest g module user # Generate a module named user 

nest g controller user # Generate a controller named user

nest g service user # Generate a service named user

```

