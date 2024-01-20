# Codeshare.app

[Codeshare.app](https://codeshare.app) A mininal code bin sharing app, I wanted a simple but powerful for devs pastebin so, I created this small tool using monaco editor, I've made is as frictionless as possible, kept the UI similar to VS Code.

## Pending tasks

1. Keyboard shortcuts
2. Diff editor
3. Refactor (lot of code repeated, didn't think it through) - make common and reuse components and composables
4. Sharable diff editor
5. File icons (feels like a lot of work)
6. Password protected bins (simple password based middleware)

## Stack

- [Nuxt 3](https://nuxt.com)
- [Tailwindcss](https://tailwindcss.com)
- [Nuxt UI](https://ui.nuxt.com)
- [Turso Database](https://turso.tech)
- [Monaco editor](https://microsoft.github.io/monaco-editor/)

## ENV Vars

TURSO_DB_TOKEN - Database token

TURSO_DB_URL - Database url

## Local setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```


## What's tracked in the app?
- Visitor count
- Snippets created count