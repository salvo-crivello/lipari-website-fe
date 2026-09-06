import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JobDetailPage } from "@/views/job-detail/JobDetailPage"
import { getJobBySlug } from "@/lib/content-client"

type TPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = await getJobBySlug(slug)
  if (!job) return {}

  return {
    title: job.metadata.title,
    description: job.metadata.description
  }
}

export default async function Page({ params }: TPageProps) {
  const { slug } = await params

  return <JobDetailPage slug={slug} />
}
