# lipari-website-fe

Corporate website rebuild for Lipari Consulting.

**What this is:** a portfolio-grade project. The primary objective is
showcasing senior React/TypeScript frontend engineering — architecture,
accessibility, performance, animation — not just shipping a brochure site.
Visual bar: IBM Consulting, Deloitte Digital, Accenture Song, Digital Design
Days.

**What's next (not now):** a Python backend + AI orchestrator (likely a
stateful chat widget) will be added later. Frontend-only for the current
phase — don't build scaffolding for the backend/AI parts yet.

---

## 1. Standing rule

> Every architectural decision should be something a Senior Front-End
> Engineer would make in a real enterprise project. Avoid tutorial-style
> architecture. Don't overengineer — keep it simple but highly maintainable.

This rule already produced the concrete decisions below. Don't re-litigate
them without the user explicitly reopening the topic.

| Decision                                                                                                                                                           | Why                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/` holds all app code; repo root holds only config + `public/`                                                                                                 | Config files (`package.json`, `tsconfig.json`, etc.) and source folders were sitting at the same level — confusing at a glance which is which.                                                                                                                                                      |
| Tests colocated (`Button.tsx` + `Button.test.tsx`, same folder)                                                                                                    | Rename/refactor moves both files together. Only `e2e/` stays top-level (Playwright, not colocatable by nature).                                                                                                                                                                                     |
| Path aliases mandatory (`@/components`, `@/content`, `@/lib`, ...)                                                                                                 | No `../../../../` relative import chains.                                                                                                                                                                                                                                                           |
| Env validation with Zod at boot (`lib/env.ts`)                                                                                                                     | Crash immediately on a missing var instead of a silent runtime `undefined`. Complements, doesn't replace, `.env`/`.env.local` — those hold the raw values, `env.ts` validates/types them.                                                                                                           |
| Route-level `error.tsx` / `not-found.tsx` / `loading.tsx` per segment                                                                                              | No single global catch-all.                                                                                                                                                                                                                                                                         |
| No barrel `index.ts` re-export files                                                                                                                               | Barrels cause circular deps and break tree-shaking at scale — import directly from source. (Exception: `utils/index.ts` _is_ the utils module, not a re-export barrel — see §3.)                                                                                                                    |
| No global state manager for now                                                                                                                                    | Redux Toolkit rejected as overkill for a mostly-static site. If a stateful feature shows up later (e.g. the AI chat widget), reach for **Zustand**, not Redux Toolkit.                                                                                                                              |
| Tailwind stays primary, not SCSS                                                                                                                                   | SCSS was considered and rejected — it would lose the single source of truth for design tokens, purge, and consistency. If SCSS ever comes back, it's a colocated `.module.scss` next to the one component that needs it (complex keyframes, 3rd-party override) — never a full replace of Tailwind. |
| Type-only files end in `.types.ts` (`labels.types.ts`); every `type`/`interface` is `T`-prefixed PascalCase (`Labels` → `TLabels`, `DeepPartial` → `TDeepPartial`) | Enforced as an ESLint rule (`@typescript-eslint/naming-convention` in `eslint.config.mjs`), not just a convention — lint fails on a violation, it doesn't rely on review catching it.                                                                                                               |
| Test files end in `.test.ts`/`.test.tsx`, never `.spec.ts`                                                                                                         | User's explicit preference, applies to both unit tests (Vitest) and e2e (Playwright) — Playwright's default `testMatch` already accepts `.test.ts`, no config change needed.                                                                                                                        |
| React pinned to **18.3.1**, not 19                                                                                                                                 | Explicit user call — React 19 considered not yet stable enough for this project. Next.js 16's peer range (`^18.2.0 \|\| ^19.0.0`) allows this; `create-next-app` had defaulted to 19, that default was overridden.                                                                                  |

---

## 2. Stack

- **Framework:** Next.js (App Router) + React 18 + TypeScript
- **Package manager:** Yarn (node-modules linker, not PnP — avoids friction with Playwright/Husky/editor tooling)
- **Quality:** ESLint, Prettier, Husky, lint-staged, eslint-plugin-jsx-a11y (bundled via `eslint-config-next`, no separate plugin needed)
- **Testing:** Vitest, React Testing Library, Playwright
- **Styling / motion:** Tailwind CSS, Motion React _(do not drop — flagged explicitly by the user once already)_
- **Forms:** React Hook Form + Zod
- **UI utilities:** clsx, class-variance-authority, tailwind-merge, Lucide React (icons)

Next.js handles SEO/meta/prerendering natively via `generateMetadata`
(including on dynamic routes) — no react-helmet needed.

---

## 3. Architecture: layered, not feature-first

Confirmed explicitly: the site is ~6-8 pages, not a multi-team platform.
Feature-first would fragment shared sections for no benefit at this scale.

**The layers, top (routing) to bottom (pure utilities):**

1. **`app/`** — routing only. Each `page.tsx` is a thin wrapper: import the
   matching component from `views/`, export `metadata`, render it. Zero
   business logic, zero JSX beyond the one render call.
2. **`views/`** — one folder per page (`home/`, `about/`, `services/`,
   `service-detail/`, `culture-career/`, `job-detail/`, `contact/`,
   `legal/`), each holding the page's composition component
   (`HomePage.tsx`, ...) plus its own `sections/` subfolder for section
   components used only by that page. A Hero built for the homepage isn't
   reused anywhere else — most "sections" are page-specific, not shared.
   _Note: not named `pages/` — Next.js reserves that exact directory name
   for its legacy Pages Router and will try to route/type-check anything
   inside it, even alongside App Router. Learned this the hard way; keep
   the name `views/`._
3. **`components/`** — only what's genuinely cross-page: `layout/`
   (Header, Footer, Nav), `ui/` (Button, Card, Container, Input, Badge —
   primitives), `motion/` (FadeIn, ScrollReveal, Parallax). No
   `components/sections/` — that's what `views/*/sections/` replaced.
4. **`hooks/`**, **`content/`**, **`types/`**, **`constant/`**, **`utils/`** —
   cross-cutting support, no page/routing awareness:
   - `hooks/` — reusable hooks (`useMediaQuery`, `useReducedMotion`, `useScrollProgress`)
   - `content/` — typed _data only_ (`labels.ts`, later `services.ts`, `team.ts`, job listings). No types, no functions defined here — imports its types from `types/`.
   - `types/` — global TypeScript types shared across the app, one `<name>.types.ts` file per concern (`labels.types.ts` exports `TLabels`, later `service.types.ts` exports `TService`, ...) — see the type-naming rule in §1.
   - `constant/` — static config values (`routes.ts`: nav items, legal page list)
   - `utils/` — `index.ts` holds every pure utility function (`cn`, `getLabel`, future `formatDate`/`slugify`/...); `typeUtils.ts` holds generic TS type helpers (e.g. `TDeepPartial<T>`). `index.ts` here is the module itself, not a re-export barrel — the no-barrel rule in §1 is about files that only re-export _other_ modules.
5. **`lib/`** — infrastructure/integration code, not generic helpers: `env.ts`
   (Zod validation of `process.env` at boot) and `content-client.ts`
   (server-side data fetchers — `getLabels()` today returns a local fixture,
   swapping it for a real backend `fetch` later is a one-file change, see §5).

**Dependency rule — imports only ever point downward, never sideways or up:**

```
app
 └──> views
       └──> components (layout / ui / motion)
             └──> hooks / content / types / constant / utils
                   └──> lib
```

`views/` and `app/` (the composition layers) are also allowed to call
`lib/` directly for data fetching — that's normal for a composition layer,
not a rule violation.

- `ui/` never imports from `views/` — a primitive doesn't know business context.
- `content/` never imports components — it's a leaf, pure typed data.
- `lib/` never imports anything above it — pure infrastructure only.

```
lipari-website-fe/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                    # /
│   │   │   ├── about/page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── culture-career/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── (legal)/
│   │   │   │   ├── whistleblowing/page.tsx
│   │   │   │   ├── code-of-ethics/page.tsx
│   │   │   │   ├── gender-equality-policy/page.tsx
│   │   │   │   ├── privacy-policy/page.tsx
│   │   │   │   ├── cookie-policy/page.tsx
│   │   │   │   └── terms-and-conditions/page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── loading.tsx
│   │   └── layout.tsx
│   ├── views/
│   │   ├── home/{HomePage.tsx, sections/}
│   │   ├── about/{AboutPage.tsx, sections/}
│   │   ├── services/{ServicesPage.tsx, sections/}
│   │   ├── service-detail/{ServiceDetailPage.tsx, sections/}
│   │   ├── culture-career/{CultureCareerPage.tsx, sections/}
│   │   ├── job-detail/{JobDetailPage.tsx, sections/}
│   │   ├── contact/{ContactPage.tsx, sections/}
│   │   └── legal/LegalPage.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── motion/
│   ├── content/
│   ├── types/
│   │   └── labels.types.ts
│   ├── constant/
│   ├── utils/
│   │   ├── index.ts
│   │   └── typeUtils.ts             # TDeepPartial<T>, ...
│   ├── hooks/
│   └── lib/
│       ├── env.ts
│       └── content-client.ts
├── e2e/
├── package.json, tsconfig.json, eslint.config.mjs, next.config.ts,
│   postcss.config.mjs, vitest.config.ts, playwright.config.ts,
│   .prettierrc.json, .env.example
└── CLAUDE.md, README.md
```

---

## 4. Site map

Source: Figma file, page `website` (`341:2`). Shared on every page: nav
(Services / About / Culture & Career / Contact + "LAVORA CON NOI" CTA) and a
dark-navy footer with the link groups shown below.

**Primary pages** (all have a Figma design):

| Route                    | Figma frame              | Notes                                                                                                                                                                 |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                      | HOMEPAGE `443:1183`      | Hi-fi. A stale lo-fi frame also exists under "Desktop - 2" `345:709`, named `HOME` — **ignore it**, it's an old wireframe.                                            |
| `/about`                 | `476:1263`               | Mission/vision, timeline 2007→2024, leader board                                                                                                                      |
| `/services`              | `479:1374`               | Consulting/Technology split, accordion service list                                                                                                                   |
| `/services/[slug]`       | Single-Service `531:852` | Detail template, prev/next nav between services                                                                                                                       |
| `/culture-career`        | `483:1654`               | Culture value blocks, logo strip, open-positions grid                                                                                                                 |
| `/culture-career/[slug]` | Single-Job `537:1651`    | Styled as an overlay w/ close-X in Figma, but **decided: real standalone page, own URL** — SEO for job postings and shareable recruiter links outweigh the modal look |
| `/contact`               | `504:2651`               | Form (Proposta/Domanda tabs)                                                                                                                                          |

**Satellite / legal pages** — footer links only, **no Figma design exists for
these** (confirmed with user). Use one reusable "legal page" template
(`views/legal/LegalPage.tsx`): title + rich-text body. Route slugs are
English regardless of the Italian label shown in the UI:

| Route                     | Footer label (IT, as designed) |
| ------------------------- | ------------------------------ |
| `/whistleblowing`         | Whistleblowing                 |
| `/code-of-ethics`         | Codice Etico                   |
| `/gender-equality-policy` | Politica di Parità di Genere   |
| `/privacy-policy`         | Privacy Policy                 |
| `/cookie-policy`          | Cookie Policy                  |
| `/terms-and-conditions`   | Termini e Condizioni           |

**Design tokens observed in Figma:** dark navy + neon-lime accent palette,
halftone/dither texture overlay on photos, display-sans headlines mixed with
monospace-style micro-labels.

**Figma file reference** (for `get_metadata` / `get_design_context` lookups)
— top-level pages in the file: `0:1` project-feux, `137:439` Components,
`341:2` **website** (the one in use, contains all frames above), `7:2`
project-salamandra-2.0 (a different, unrelated project — don't confuse it
with this one).

---

## 5. Content & language model

**Decided:** all page copy — and dynamic lists like which job positions are
currently open — will ultimately be provided by a backend, in a separate
project, and can be set to any language (English or otherwise) from there.
This is not a frontend i18n-routing concern: the backend decides what
language text comes back as, so there is **no need for an `app/[locale]/...`
route segment**.

**Label/copy resolution — confirmed shape:** the backend resolves locale
server-side and returns already-translated flat key→string pairs (e.g.
`{ "hero.title": "Dalla consulenza on-demand..." }`). The frontend never
receives a per-language object and never picks a language itself — no
country/locale matching logic lives in this repo.

- Fetching happens **server-side** (Server Component / `generateMetadata`),
  via `fetch(url, { next: { revalidate } })` for ISR caching — not
  client-side `useEffect`, and **not browser storage** (localStorage/
  sessionStorage). This is marketing copy: it must be in the initial HTML
  for SEO and to avoid a flash-of-empty-content; storage would only earn
  its keep for user-specific/session-bound data, which this isn't.
- `getLabel(labels, key, fallback?)` (in `utils/index.ts`) is a dumb lookup
  - dev-console-warn on a missing key — not a language resolver. All
    resolution already happened before the fetch.

```
lib/content-client.ts     # getLabels(), getServices()... server-side fetchers
types/labels.types.ts     # type TLabels = Record<string, string>  (flat, namespaced keys: "hero.title", "footer.cta")
content/labels.ts         # the actual data — fixture today, backend response shape tomorrow
utils/index.ts            # getLabel(labels: TLabels, key: string, fallback?: string): string
```

- Right now (frontend-only phase, no backend yet) `content/` holds typed
  static fixtures (`labels.ts`, later `services.ts`, `caseStudies.ts`,
  `team.ts`, job listings) so the UI can be built and tested end-to-end.
- Everything above is shaped behind the same typed interfaces
  (`getServices(): Promise<TService[]>`, `getLabels(): Promise<TLabels>`)
  rather than components importing raw arrays directly, so swapping a
  static fixture for a real backend fetch later is a one-file change, not a
  rewrite across `views/`.
- Don't build the real API client, retries, or loading/error states for
  this yet — just don't paint components into a corner that assumes data
  is synchronous and always local.

---

## 6. Deployment

**Vercel.** Two separate Vercel projects, one per environment:

| Environment | Branch        | Vercel project            |
| ----------- | ------------- | ------------------------- |
| UAT         | `deploy/uat`  | Vercel UAT project        |
| Production  | `deploy/prod` | Vercel Production project |

Production deploys require manual approval via GitHub Environment
protection rules (the `environment: production` gate on the deploy job in
`deploy-prod.yml` — reviewers are configured in repo Settings, not in code).

---

## 7. Commit message convention

Conventional Commits, with a custom prefix format:

```
<version> <[JIRA-ID | GitHub-Issue]> <type>: <description>
```

- `<version>` — project version/release identifier (`v1.0.0`, `v0.2.0`, ...),
  bumped in `package.json` alongside the commit it describes.
- `<[JIRA-ID | GitHub-Issue]>` — `[LIP-123]` or `[#42]`. Omit the brackets
  entirely if no task exists for the change.
- `<type>` — one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`,
  `style`, `build`, `ci`, `perf`.
- `<description>` — short, imperative (`add`, `fix`, `update`, not `added`/
  `fixes`), ideally under 72 chars. Describes intent, not a file list.

```
v0.1.0 [LIP-12] chore: setup frontend architecture and development tooling
v0.2.0 [LIP-18] feat: implement home hero section
v0.2.1 [#34] fix: resolve responsive navigation issue
v0.3.0 [LIP-25] refactor: extract reusable section layout
v0.3.1 [#41] docs: update project architecture
```

One commit = one logical change. No generic descriptions (`update`,
`changes`, `fix stuff`).

---

## 8. Git workflow & branch strategy

Enterprise-oriented branching: separate development, UAT, and production
flows, each promoted through a Pull Request — never pushed directly.

**Branches** (all protected: no deletion, no force-push, PR required):

| Branch        | Purpose                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `main`        | Production baseline / release history — last validated, stable production version. Updated **only** after a successful production deployment. |
| `develop`     | Main integration branch — all completed features merge here first.                                                                            |
| `deploy/uat`  | Triggers the UAT deployment pipeline.                                                                                                         |
| `deploy/prod` | Triggers the production deployment pipeline. Requires PR + approval — production must never deploy accidentally.                              |

**Flow:**

```
feature/<name>  --PR-->  develop  --PR-->  deploy/uat  --PR + approval-->  deploy/prod  --successful deploy-->  main
```

- Feature branches: `feature/<feature-name>` (e.g. `feature/homepage-hero`,
  `feature/contact-form`), always branched from `develop`, always merged
  back to `develop` via PR.
- If a `deploy/prod` release fails, `main` stays on the previous stable
  version — it only advances on a _successful_ production deploy. (e.g.
  `deploy/prod` at `v1.3.0` fails → `main` stays at `v1.2.0`.)

**CI/CD per branch:** `develop` runs code-quality/integration checks;
`deploy/uat` runs the UAT deploy pipeline; `deploy/prod` runs the
production deploy pipeline; `main` is release history / stable baseline.
Pipeline steps (current + planned): install, lint, typecheck, test, build,
version validation, deployment automation, release tracking.

**Versioning:** semantic (`MAJOR.MINOR.PATCH`), tracked through CI/CD so
every environment maps to an exact release version; each deployed
environment must expose its running version. Ties into the `<version>`
prefix in commit messages (§7) — bump `package.json` alongside the commit
that earns a new version.

**Implemented as GitHub Actions:**

- `.github/actions/setup/` — composite action: Node 24, Corepack/Yarn,
  cache restore, `yarn install --immutable`. Used by every job below to
  avoid repeating the same 4 steps in each one.
- `.github/workflows/ci.yml` — lint, typecheck, unit tests, build, and e2e
  (Playwright, chromium only) run in parallel on PRs into `develop` /
  `deploy/uat` / `deploy/prod` / `main`, and on push to `develop` /
  `deploy/uat` / `deploy/prod`.
- `.github/workflows/deploy-uat.yml` — on push to `deploy/uat`: re-runs
  validation, then deploys to the Vercel UAT project via the Vercel CLI
  (`pull` → `build` → `deploy --prebuilt`), gated on the `uat` GitHub
  Environment.
- `.github/workflows/deploy-prod.yml` — on push to `deploy/prod`: re-runs
  validation, then deploys to the Vercel Production project the same way
  (with `--prod` flags), gated on the `production` GitHub Environment, then
  fast-forwards `main` to the deployed commit only after that job succeeds
  (mirrors the "main only advances on successful deploy" rule above — uses
  `git merge --ff-only`, refuses if history diverged).

**Still needs manual, GitHub-side setup (not something committed YAML can do):**

- Required reviewers configured on GitHub Environments (repo Settings →
  Environments): **`uat` has 0 required reviewers** (deploys automatically
  on push to `deploy/uat`, by design — that's the whole point of UAT being
  fast to iterate on) — **`production` has required reviewers** (that's
  what turns `environment: production` in the workflow into an actual
  manual-approval gate, matching the branch-strategy rule that prod must
  never deploy accidentally).
- Set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` as secrets on
  **both** the `uat` and `production` Environments (same secret names,
  different values — `VERCEL_PROJECT_ID` differs because UAT and
  Production are separate Vercel projects, per §6).
- Set the `UAT_SITE_URL` / `PRODUCTION_SITE_URL` repo variables.
