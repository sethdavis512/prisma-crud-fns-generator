# Prisma CRUD Fns Generator

## Description

Interpret a Prisma schema and generate common CRUD functions to be used in a web app.

Inspired by [prisma-json-schema-generator](https://github.com/valentinpalkovic/prisma-json-schema-generator).

## Getting started

1. Install

```bash
npm i prisma-crud-fns-generator
```

2. Add code to schema

```prisma
generator crud {
    provider = "prisma-crud-fns-generator"
}
```

3. Run Prisma generate

```bash
prisma generate
```

Input:

```prisma
datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
}

generator crud {
    provider = "prisma-crud-fns-generator"
}

model User {
    id    String @id @default(cuid())
    email String @unique

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    password Password?
    notes    Note[]
}

model Password {
    hash String

    user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId String @unique
}

model Note {
    id    String @id @default(cuid())
    title String
    body  String

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    userId String
}
```

Output:
```
app
└── models
    ├── note.server.ts
    ├── password.server.ts
    └── user.server.ts
```

The template used is based off of the `note.server.ts` [model](https://github.com/remix-run/indie-stack/blob/main/app/models/note.server.ts) from Remix's Indie stack.

## Roadmap

- Write better documentation 🙃
- Make output directory customizable
- Make template customizable

## Development

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
