import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"

export const metadata: Metadata = { title: "Termini e Condizioni" }

export default function Page() {
  return (
    <LegalPage title="Termini e Condizioni">
      <PageInProgress />
    </LegalPage>
  )
}
