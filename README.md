# 📌 Call Stats API

Call Stats API is a project built using NestJS framework and relies on various essential dependencies such as Prisma,
Swagger, and more. It utilizes libraries for authentication, data validation, scheduling, and API documentation. The
project also includes tools like Prettier, ESLint, and Jest for code formatting, linting, and testing.

## 🔍 Table of Contents

- [📁 Project Structure](#-project-structure)

- [📝 Project Summary](#-project-summary)

- [💻 Stack](#-stack)

- [⚙️ Setting Up](#%EF%B8%8F-setting-up)

- [🚀 Run Locally](#-run-locally)

## 📁 Project Structure

```bash
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── prisma
│   └── schema.prisma
├── src
│   ├── app.module.ts
│   ├── common
│   ├── config
│   ├── main.ts
│   ├── metadata.ts
│   ├── call-stats
│   └── imports
├── test
├── tsconfig.build.json
└── tsconfig.json
```

## 📝 Project Summary

- [src](src): Main source code directory.
- [src/common](src/common): Contains common code used throughout the project.
- [src/config](src/config): Stores project configuration files.
- [src/call-stats](src/call-stats): Handles call stats related functionality.
- [src/imports](src/imports): Handles import related functionality.
- [test](test): Contains test files for the project.
- [prisma](prisma): Directory for Prisma ORM-related code and configuration.

## 💻 Stack

- [prisma/client](https://www.npmjs.com/package/prisma): Prisma ORM client for database access.
- [nestjs/prisma](https://www.npmjs.com/package/@nestjs/prisma): Prisma integration for NestJS projects.
- [nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express): Platform adapter for NestJS
  applications using Express.
- [nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger): Swagger module for NestJS to automatically generate
  API documentation.
- [nestjs/throttler](https://www.npmjs.com/package/@nestjs/throttler): Request throttling module for NestJS.
- [nestjs/config](https://www.npmjs.com/package/@nestjs/config): Configuration module for NestJS applications.

## ⚙️ Setting Up

To run this project, you will need to add the following environment variables to your `.env` file in root folder

```.env
IMPORT_ENDPOINT_URL=
DATABASE_URL=
PORT=8008

# Security
CORS_ENABLED= # Optional
CORS_ORIGIN= # Optional

```

## 🚀 Run Locally

1. Install the dependencies:

```bash
pnpm install
```

2. Run migrations:

```bash
pnpm migrate:dev

pnpm prisma:generate
```

3. Start the development mode:

```bash
pnpm start:dev
```

4. Open browser and go to

```
http://localhost:8080/swagger
```
