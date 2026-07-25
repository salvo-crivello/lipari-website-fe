import { Button } from "@/components/ui/Button";
import { getLabels } from "@/lib/content-client";

export async function HomePage() {
  const labels = await getLabels();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-950 px-6 py-32 text-center text-white">
      <h1 className="text-4xl font-semibold tracking-tight">
        Dalla consulenza on-demand ai progetti end-to-end
      </h1>
      <p className="max-w-xl text-slate-300">is coming soon.</p>
      <Button>{labels.nav.cta}</Button>
    </main>
  );
}
