import { labels as fallbackLabels } from "@/content/labels"
import type { TLabels } from "@/types/labels.types"

/**
 * Server-side fetcher, called from Server Components / generateMetadata.
 * Today returns the local fixture; swapping to a real backend call
 * (`fetch(url, { next: { revalidate } })`) is a one-file change — the
 * backend still returns the flat wire shape, nested here before returning.
 * Never call this from a Client Component.
 */
export async function getLabels(): Promise<TLabels> {
  return fallbackLabels
}
