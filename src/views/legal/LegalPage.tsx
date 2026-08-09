import type { ReactNode } from "react"

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-24">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="prose prose-slate max-w-none">{children}</div>
    </main>
  )
}
