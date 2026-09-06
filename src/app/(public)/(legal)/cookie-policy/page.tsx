import type { Metadata } from "next"
import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Cookie Policy" }

export default function Page() {
  return <LegalPage pageName="Cookie Policy" />
}
