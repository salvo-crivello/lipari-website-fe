/**
 * Flat, namespaced key -> already-translated string.
 * Backend resolves locale server-side; this repo never picks a language.
 */
export type TLabels = Record<string, string>;
