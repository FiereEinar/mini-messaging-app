# Mini Messaging App

A small messaging app that has a live chat feature built in Typescript with the use of socket.io, it also uses PostgreSQL database with Prisma ORM.

## Getting Started

clone the repo first

```bash
git clone https://github.com/FiereEinar/mini-messaging-app
cd mini-messaging-app
```

make sure you have postgres installed in your machine and start it, in windows its:

```bash
net start postgresql-x64-16
```

also make sure that you fill up the .env variables

if you're having trouble starting a local postgres server, refer to the postgres documentation

from here you can start a local dev server in both frontend and backend

run the server:

```bash
cd server
npm install
npm run dev
```

run the client

```bash
cd client
npm install
npm run dev
```

and you can now go to localhost and see the app running!
