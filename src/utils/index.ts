import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { TLabels } from "@/types/labels.types";

/** Merges conditional Tailwind classes, dropping conflicting utilities instead of applying both. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Dumb lookup, not a resolver — locale resolution already happened
 * server-side before `labels` was fetched.
 */
export function getLabel(labels: TLabels, key: string, fallback = key): string {
  const value = labels[key];
  if (value === undefined && process.env.NODE_ENV !== "production") {
    console.warn(`[getLabel] missing key "${key}"`);
  }
  return value ?? fallback;
}
