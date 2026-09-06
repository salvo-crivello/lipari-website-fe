import type { Metadata } from "next"
import { ServiceDetailPage } from "@/views/service-detail/ServiceDetailPage"
import { getLabels, isServiceSlug } from "@/lib/content-client"

type TPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { slug } = await params
  if (!isServiceSlug(slug)) return {}

  const { servicesDetailsPages } = await getLabels()
  const service = servicesDetailsPages[slug]

  return {
    title: service.metadata.title,
    description: service.metadata.description
  }
}

export default async function Page({ params }: TPageProps) {
  const { slug } = await params

  return <ServiceDetailPage slug={slug} />
}
