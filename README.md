> > > > > > Admin Panel & Main Web App

#### 🌐 Client User

The client user is the version of the client that is currently running on our production server. It's used for the
front-end of our web app. Here are the technologies we use:

- Redux
- Next.js
- TypeScript
- Material-UI
- Axios
- Formik
- Yup
- React Hook Form
- React Query
- Async Thunk
- RTK Query
- Shadcn
- Headless UI
- React Icons
- React Toastify
- Context API
- more...

> - **Start the client** : `npm run dev`
---

#### 🎛️ Client Admin Panel

The client admin panel is also running on our production server. It's used for the front-end of our admin panel. We use
the same technologies as the client user.

> - **Start the client** : `npm run dev`
---

#### 🖥️ Server v2

Server v2 is the version of the server that's currently running on our production server. It's used for both the admin
panel and the web app. Here are the technologies we use:

- Express
- Redis
- MongoDB
- Mongoose
- Passport
- JWT
- TypeScript
- AWS
- Docker
- Sharp
- NodeMailer
- Zod
- more...

You can check out our API documentation on [Swagger]()

> - **Start the server in development mode** : `npm run dev`
>
> - **Start the server in production mode** : `npm run prod`
>
> - **Start the server in docker development mode** : `docker-compose -f docker-compose.dev.yml up -d`
>
> - **Start the server in docker production mode** : `docker-compose -f docker-compose.prod.yml up -d`
---

> > > > > > Chat Service

#### 💬 Client Chat Service

This component is used for the chat service of both the web app and the admin panel.

> - **Start the client** : `npm run dev`

---

#### 💻 Server Chat Service

The server chat service is used for the chat service of both the web app and the admin panel. Here are the technologies
we use:

- NestJs
- GraphQL
- Apollo
- Prisma
- PostgresSQL
- TypeScript
- Redis
- Socket.io
- Docker
- AWS
- NodeMailer
- Sharp
- more...

> - **Start the server** : `docker-compose up`
---