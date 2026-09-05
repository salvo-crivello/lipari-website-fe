import type { Metadata } from "next"

import { ServiceDetailPage } from "@/views/service-detail/ServiceDetailPage"

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return { title: slug }
}

export default function Page() {
  return <ServiceDetailPage />
}
