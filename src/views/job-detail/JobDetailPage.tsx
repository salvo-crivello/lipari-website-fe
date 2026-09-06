import { Main } from "@/components/layout/MainComponents"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"
import { getJobBySlug } from "@/lib/content-client"
import { notFound } from "next/navigation"

export async function JobDetailPage({ slug }: { slug: string }) {
  const job = await getJobBySlug(slug)

  if (!job) notFound()

  return (
    <Main>
      <PageInProgress pageName={job.pageContent.title} />
    </Main>
  )
}
