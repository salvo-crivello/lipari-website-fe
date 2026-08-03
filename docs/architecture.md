# Architecture: layered, not feature-first

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
   (real `Header.tsx`/`Footer.tsx`, plus `MainComponents.tsx` — generic
   `Header`/`Main`/`Section`/`Footer` layout primitives that the real
   Header/Footer compose their content inside of, instead of writing raw
   `<header>`/`<footer>` tags with padding/max-width repeated per file),
   `ui/` (Button, Card, Container, Input, Badge — primitives, each in its
   own folder — see root CLAUDE.md §1), `ui/brand/` (Logo and other one-off
   brand assets, not reusable primitives), `motion/` (FadeIn, ScrollReveal,
   Parallax). No `components/sections/` — that's what `views/*/sections/`
   replaced.
4. **`hooks/`**, **`content/`**, **`types/`**, **`constant/`**, **`utils/`** —
   cross-cutting support, no page/routing awareness:
   - `hooks/` — reusable hooks (`useMediaQuery`, `useReducedMotion`, `useScrollProgress`)
   - `content/` — typed _data only_ (`labels.ts`, later `services.ts`, `team.ts`, job listings). No types, no functions defined here — imports its types from `types/`.
   - `types/` — global TypeScript types shared across the app, one `<name>.types.ts` file per concern (`labels.types.ts` exports `TLabels`, later `service.types.ts` exports `TService`, ...) — see the type-naming rule in root CLAUDE.md §1.
   - `constant/` — static config values (`routes.ts`: nav items, legal page list)
   - `utils/` — `index.ts` holds every pure utility function (`cn`, `getLabel`, future `formatDate`/`slugify`/...); `typeUtils.ts` holds generic TS type helpers (e.g. `TDeepPartial<T>`). `index.ts` here is the module itself, not a re-export barrel — the no-barrel rule in root CLAUDE.md §1 is about files that only re-export _other_ modules.
5. **`lib/`** — infrastructure/integration code, not generic helpers: `env.ts`
   (Zod validation of `process.env` at boot) and `content-client.ts`
   (server-side data fetchers — `getLabels()` today returns a local fixture,
   swapping it for a real backend `fetch` later is a one-file change, see
   `docs/content-model.md`).

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
│   │   ├── layout/           # Header.tsx, Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button/{Button.tsx, Button.test.tsx, Button.types.ts, Button.styles.ts}
│   │   │   └── brand/
│   │   │       └── Logo/{Logo.tsx, Logo.test.tsx, Logo.types.ts}
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
