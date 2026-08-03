import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merges conditional Tailwind classes, dropping conflicting utilities instead of applying both. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @returns `true` when code is running in a browser environment.
 */
export const isBrowser = () => typeof window !== "undefined"

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @param value - Value to check.
 * @returns `true` if the value is `null` or `undefined`.
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined

/**
 * Checks whether a value is considered "empty".
 * Supported types: string, array, object, Map, Set.
 *
 * @param value - Value to check.
 * @returns `true` if the value is empty.
 */
export const isBlankOrEmpty = (
  value: unknown
): value is null | undefined | "" | [] | Record<string, never> => {
  if (isNullOrUndefined(value)) return true

  if (typeof value === "string") return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0

  if (typeof value === "object") {
    if (value instanceof Map || value instanceof Set) return value.size === 0
    return Object.keys(value).length === 0
  }

  return false
}

/**
 * Negation of {@link isBlankOrEmpty}.
 *
 * @param value - Value to check.
 */
export const isNotBlankOrEmpty = <T>(
  value: T | null | undefined
): value is Exclude<T, null | undefined> => !isBlankOrEmpty(value)

/**
 * Negation of {@link isNullOrUndefined}.
 *
 * @param value - Value to check.
 */
export const isNotNullOrUndefined = <T>(value: T | null | undefined): value is T =>
  !isNullOrUndefined(value)
