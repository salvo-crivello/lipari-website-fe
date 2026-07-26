/**
 * Flat, namespaced key -> already-translated string.
 * Backend resolves locale server-side; this repo never picks a language.
 * This is the wire shape — content-client.ts nests it into TNestedLabels
 * before handing it to components.
 */
export type TLabels = Record<string, string>

/** Dot-namespaced keys nested into an object, for `labels.nav.cta`-style access. */
export type TNestedLabels = {
  nav: {
    services: string
    about: string
    cultureCareer: string
    contact: string
    cta: string
  }
  footer: {
    valueStatement: string
  }
}
