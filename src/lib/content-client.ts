import { fallbackLabels } from "@/content/labels";
import type { TLabels } from "@/types/labels.types";

/**
 * Server-side fetcher, called from Server Components / generateMetadata.
 * Today returns the local fixture; swapping to a real backend call
 * (`fetch(url, { next: { revalidate } })`) is a one-file change.
 * Never call this from a Client Component.
 */
export async function getLabels(): Promise<TLabels> {
  return fallbackLabels;
}
