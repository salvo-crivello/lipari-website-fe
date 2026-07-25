import type { Metadata } from "next";

import { JobDetailPage } from "@/views/job-detail/JobDetailPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JobDetailPage slug={slug} />;
}
