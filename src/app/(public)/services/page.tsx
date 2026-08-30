import type { Metadata } from "next"

import { ServicesPage } from "@/views/services/ServicesPage"

export const metadata: Metadata = {
  title: "Services"
}

export default function Page() {
  return <ServicesPage />
}
