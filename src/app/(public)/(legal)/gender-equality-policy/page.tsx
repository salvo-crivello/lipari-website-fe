import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"

export const metadata: Metadata = { title: "Politica di Parità di Genere" }

export default function Page() {
  return (
    <LegalPage title="Politica di Parità di Genere">
      <PageInProgress />
    </LegalPage>
  )
}
