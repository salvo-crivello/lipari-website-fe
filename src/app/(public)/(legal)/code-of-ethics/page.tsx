import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"

export const metadata: Metadata = { title: "Codice Etico" }

export default function Page() {
  return (
    <LegalPage title="Codice Etico">
      <PageInProgress />
    </LegalPage>
  )
}
