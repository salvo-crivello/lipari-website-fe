import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"

export const metadata: Metadata = { title: "Whistleblowing" }

export default function Page() {
  return (
    <LegalPage title="Whistleblowing">
      <PageInProgress />
    </LegalPage>
  )
}
