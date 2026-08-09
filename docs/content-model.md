# Content & language model

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
