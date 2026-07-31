import Link from "next/link"
import { Header as HeaderComponent } from "@/components/layout/MainComponents"
import Button, { ButtonLink } from "@/components/ui/Button/Button"
import { Logo } from "@/components/ui/brand/Logo/Logo"
import { NAV_ROUTES } from "@/constant/routes"
import { getLabels } from "@/lib/content-client"

export async function Header() {
  const { nav } = await getLabels()

  return (
    <HeaderComponent>
      <Link href="/" aria-label="Lipari Consulting — home" className="group shrink-0">
        <Logo />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-10">
        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {NAV_ROUTES.map((item) => (
            <ButtonLink
              key={item.href}
              href={item.href}
              text={nav[item.navKey]}
              color="tertiary"
              variant="text"
            />
          ))}
        </nav>
        <Button text={nav.cta} />
      </div>
    </HeaderComponent>
  )
}
