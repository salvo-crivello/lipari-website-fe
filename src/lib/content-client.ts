import { fallbackLabels } from "@/content/labels"
import type { TNestedLabels } from "@/types/labels.types"

function nestLabels(flat: typeof fallbackLabels): TNestedLabels {
  return {
    nav: {
      services: flat["nav.services"],
      about: flat["nav.about"],
      cultureCareer: flat["nav.cultureCareer"],
      contact: flat["nav.contact"],
      cta: flat["nav.cta"]
    },
    footer: {
      valueStatement: flat["footer.valueStatement"]
    }
  }
}

/**
 * Server-side fetcher, called from Server Components / generateMetadata.
 * Today returns the local fixture; swapping to a real backend call
 * (`fetch(url, { next: { revalidate } })`) is a one-file change — the
 * backend still returns the flat wire shape, nested here before returning.
 * Never call this from a Client Component.
 */
export async function getLabels(): Promise<TNestedLabels> {
  return nestLabels(fallbackLabels)
}
