import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Politica di Parità di Genere" }

export default function Page() {
  return <LegalPage pageName="Politica di Parità di Genere" />
}
