import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Politica di Parità di Genere" }

export default function Page() {
  return (
    <LegalPage title="Politica di Parità di Genere">
      <p>Content pending — provided by legal, not part of the Figma design.</p>
    </LegalPage>
  )
}
