import type { Metadata } from "next"

import { CultureCareerPage } from "@/views/culture-career/CultureCareerPage"

export const metadata: Metadata = {
  title: "Culture & Career"
}

export default function Page() {
  return <CultureCareerPage />
}
