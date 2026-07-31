import { labels } from "@/content/labels"

/**
 * Flat, namespaced key -> already-translated string.
 * Backend resolves locale server-side; this repo never picks a language.
 * This is the wire shape — content-client.ts nests it into TNestedLabels
 * before handing it to components.
 */
export type TLabels = typeof labels
