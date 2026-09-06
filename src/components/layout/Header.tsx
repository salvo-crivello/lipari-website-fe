import { HeaderShell } from "@/components/layout/header/HeaderShell"
import { getLabels } from "@/lib/content-client"

export async function Header() {
  const { nav } = await getLabels()

  return <HeaderShell labels={nav} />
}
