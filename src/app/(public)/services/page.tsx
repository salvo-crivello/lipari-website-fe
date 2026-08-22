import type { Metadata } from "next"

import { ServicesPage } from "@/views/services/ServicesPage"

export const metadata: Metadata = {
  title: "Services"
}

export default async function Page() {
  await new Promise((r) => setTimeout(r, 10000))
  return <ServicesPage />
}
