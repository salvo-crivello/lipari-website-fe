import { Main } from "@/components/layout/MainComponents"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"
import { getLabels, isServiceSlug } from "@/lib/content-client"
import { notFound } from "next/navigation"

export async function ServiceDetailPage({ slug }: { slug: string }) {
  if (!isServiceSlug(slug)) notFound()

  const { servicesDetailsPages } = await getLabels()
  const service = servicesDetailsPages[slug]
  const { pageContent } = service

  return (
    <Main>
      <PageInProgress pageName={pageContent.title} />
    </Main>
  )
}
