import { HeaderShell } from "@/components/layout/header/HeaderShell"
import { NAV_ROUTES } from "@/constant/routes"
import { getLabels } from "@/lib/content-client"

export async function Header() {
  const { nav } = await getLabels()

  const items = NAV_ROUTES.map((item) => ({
    href: item.href,
    label: nav[item.navKey]
  }))

  return <HeaderShell items={items} labels={nav.cta} />
}
