export function JobDetailPage({ slug }: { slug: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center py-32">
      <h1 className="text-3xl font-semibold">{slug}</h1>
      <p className="mt-2 text-slate-500">
        Figma frame 537:1651 (Single-Job) — real standalone page (own URL for SEO/shareable
        recruiter links), pending sections build-out.
      </p>
    </main>
  )
}
