# lipari-website-fe

Modern redesign of the Lipari Consulting corporate website — portfolio-grade
rebuild showcasing senior React/TypeScript frontend architecture.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Motion ·
React Hook Form + Zod · Vitest / React Testing Library / Playwright · Yarn

## Architecture

All app code lives under `src/`. Layered: `app` (routing) → `views` (one
folder per page + its own `sections/`) → `components` (`layout`/`ui`/`motion`
— cross-page only) → `hooks`/`content`/`types`/`constant`/`utils` → `lib`
(infra: env validation, data fetching). Dependencies point only downward.
Tests colocated next to source, path aliases via `tsconfig.json`, no global
state manager, no barrel re-exports, Zod-validated env at boot.

## Status

Scaffold complete: routing, tooling (lint/format/test/e2e/git hooks), CI/CD
(GitHub Actions, deploying to Vercel), and folder structure are in place.
Pages are placeholders pending section components.

## Development

```
yarn dev      # start the dev server
yarn lint     # ESLint
yarn test     # unit tests (Vitest)
yarn test:e2e # end-to-end tests (Playwright)
yarn build    # production build
```
