import { FooterShell } from "@/components/layout/footer/FooterShell"
import { getLabels } from "@/lib/content-client"

export async function Footer() {
  const { footer } = await getLabels()

  return <FooterShell labels={footer} />
}
