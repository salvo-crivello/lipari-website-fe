import Link from "next/link"
import { Footer as FooterComponent } from "@/components/layout/MainComponents"
import { Logo } from "@/components/ui/brand/Logo/Logo"
import { LEGAL_ROUTES, NAV_ITEMS } from "@/constant/routes"
import { getLabels } from "@/lib/content-client"
import LipariLogo from "@/assets/svg/LipariLogo"

const SOCIAL_LINKS = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" }
] as const

export async function Footer() {
  const labels = await getLabels()
  const [whistleblowingRoutes, complianceRoutes] = [LEGAL_ROUTES.slice(0, 3), LEGAL_ROUTES.slice(3)]

  return (
    <FooterComponent className="bg-brand-blue-950 flex flex-col gap-16 text-slate-50">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-8">
          <div className="group inline-block">
            <LipariLogo className="text-brand-green" />
          </div>
          <p className="font-condensed text-brand-green max-w-2xl text-5xl font-bold text-balance uppercase lg:text-7xl">
            {labels.footer.valueStatement}
          </p>
          <div className="flex flex-wrap items-center gap-10 font-mono text-sm uppercase">
            <span className="text-on-blue-secondary">Seguici</span>
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} className="underline underline-offset-4">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-16">
          <nav aria-label="Footer" className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-green font-medium transition-colors"
              >
                {labels.nav[item.navKey]}
              </Link>
            ))}
          </nav>

          <nav aria-label="Compliance" className="flex flex-col gap-8">
            {whistleblowingRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="hover:text-brand-green font-medium transition-colors"
              >
                {route.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-8 border-t-2 border-slate-700 pt-10">
        <p className="flex flex-wrap items-center gap-3 text-sm">
          <span>{`© ${new Date().getFullYear()} Lipari Consulting & Co SRL`}</span>
          <span className="text-brand-green">|</span>
          <span>P.IVA 05594830969</span>
          <span className="text-brand-green">|</span>
          <span>Ugo Foscolo, 17 - 20099 Sesto San Giovanni (MI)</span>
        </p>

        <nav aria-label="Legal" className="text-on-blue-secondary flex flex-wrap gap-10">
          {complianceRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="hover:text-brand-green transition-colors"
            >
              {route.title}
            </Link>
          ))}
        </nav>
      </div>
    </FooterComponent>
  )
}
