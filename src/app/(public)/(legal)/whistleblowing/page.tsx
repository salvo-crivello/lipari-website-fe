import type { Metadata } from "next"

import { LegalPage } from "@/views/legal/LegalPage"

export const metadata: Metadata = { title: "Whistleblowing" }

export default function Page() {
  return <LegalPage pageName="Whistleblowing" />
}
