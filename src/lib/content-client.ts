import { labels as fallbackLabels } from "@/content/labels"
import { jobs as fallbackJobs } from "@/content/jobs"
import type { TLabels } from "@/types/labels.types"
import type { TJob } from "@/types/jobs.types"

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

/**
 * Same fixture-today/backend-tomorrow contract as getLabels(), but for the
 * dynamic open-positions list rather than copy.
 */
export async function getJobs(): Promise<TJob[]> {
  return [...fallbackJobs]
}
