import type { Metadata } from "next"
import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Termini e Condizioni" }

export default function Page() {
  return <LegalPage pageName="Termini e Condizioni" />
}
