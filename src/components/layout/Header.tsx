import Link from "next/link"
import { Header as HeaderComponent } from "@/components/layout/MainComponents"
import Button from "@/components/ui/Button/Button"
import { Logo } from "@/components/ui/brand/Logo/Logo"
import { NAV_ITEMS } from "@/constant/routes"
import { getLabels } from "@/lib/content-client"

export async function Header() {
  const labels = await getLabels()

  return (
    <HeaderComponent>
      <Link href="/" aria-label="Lipari Consulting — home" className="group shrink-0">
        <Logo />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-10">
        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-condensed hover:text-brand-green text-xl font-medium text-slate-50 transition-colors"
            >
              {labels.nav[item.navKey]}
            </Link>
          ))}
        </nav>

        <Button text={labels.nav.cta} />
      </div>
    </HeaderComponent>
  )
}
