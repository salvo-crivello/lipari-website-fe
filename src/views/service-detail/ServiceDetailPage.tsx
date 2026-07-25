export function ServiceDetailPage({ slug }: { slug: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center py-32">
      <h1 className="text-3xl font-semibold">{slug}</h1>
      <p className="mt-2 text-slate-500">
        Figma frame 531:852 (Single-Service) — pending sections build-out + prev/next nav.
      </p>
    </main>
  );
}
