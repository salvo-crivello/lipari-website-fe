import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges conditional Tailwind classes, dropping conflicting utilities instead of applying both. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
