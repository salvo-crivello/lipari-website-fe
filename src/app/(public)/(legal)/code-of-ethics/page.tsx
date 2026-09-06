import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Codice Etico" }

export default function Page() {
  return <LegalPage pageName="Codice Etico" />
}
