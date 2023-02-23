# Social Network REST API

> 📛 Here are Backend files, but look through [Frontend](https://github.com/brvjeo/social-network) part if you're interested

## [🔗Swagger UI Documentation](https://zavod-backend.vercel.app/api-docs/)

## 📚About the Project:

REST API for Social Network

## 🧰Technologies Used:

- Node JS
- NestJS
- PassportJWT
- MongoDB
- Mongoose
- bcryptjs
- SwaggerUI
- class-validator

## 🛠️Setup / Installation:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🚶Approach:

`bcryptjs` is used for hashing passwords with salt before storing them in Database

`jsonwebtoken` is used for creating\decoding crypted Tokens, safely containing info about current user. JWT are stored in cookies.

For hosting the server I chose vercel

## ©️License:

MIT license @Artuchka
