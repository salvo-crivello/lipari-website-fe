import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Codice Etico" }

export default function Page() {
  return (
    <LegalPage title="Codice Etico">
      <p>Content pending — provided by legal, not part of the Figma design.</p>
    </LegalPage>
  )
}
