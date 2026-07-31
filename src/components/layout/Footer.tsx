import Link from "next/link"
import { Footer as FooterComponent } from "@/components/layout/MainComponents"
import { COMPLIANCE_ROUTES, LEGAL_ROUTES, NAV_ROUTES, SOCIAL_LINKS } from "@/constant/routes"
import { getLabels } from "@/lib/content-client"
import LipariLogo from "@/assets/svg/LipariLogo"
import { ButtonLink } from "../ui/Button/Button"

export async function Footer() {
  const { footer } = await getLabels()

  function getCopyright() {
    return `© ${new Date().getFullYear()} ${footer.companyName}`
  }

  return (
    <FooterComponent className="bg-brand-blue-950 flex flex-col gap-16 text-slate-50">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-8">
          <LipariLogo className="text-brand-green" />
          <p className="font-condensed text-brand-green max-w-2xl text-5xl font-bold text-balance uppercase lg:text-7xl">
            {footer.valueStatement}
          </p>
          <div className="flex flex-wrap items-center gap-10 font-mono text-sm uppercase">
            <span className="text-on-blue-secondary">Seguici</span>
            {SOCIAL_LINKS.map((social) => (
              <ButtonLink
                key={social.label}
                href={social.href}
                text={social.label}
                variant="text"
                color="tertiary"
                surface="dark"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-16">
          <nav aria-label="Footer" className="flex flex-col gap-8">
            {NAV_ROUTES.map((item) => (
              <ButtonLink
                key={item.href}
                href={item.href}
                text={footer.navRoutes[item.navKey]}
                variant="text"
                color="tertiary"
                surface="dark"
                bodyText
              />
            ))}
          </nav>

          <nav aria-label="Compliance" className="flex flex-col gap-8">
            {COMPLIANCE_ROUTES.map((route) => (
              <ButtonLink
                key={route.href}
                href={route.href}
                text={route.title}
                variant="text"
                color="tertiary"
                surface="dark"
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-8 border-t-2 border-slate-700 pt-10">
        <p className="flex flex-wrap items-center gap-3 text-sm">
          <span>{getCopyright()}</span>
          <span className="text-brand-green">|</span>
          <span>{footer.vatNumber}</span>
          <span className="text-brand-green">|</span>
          <span>{footer.address}</span>
        </p>

        <nav aria-label="Legal" className="text-on-blue-secondary flex flex-wrap gap-10">
          {LEGAL_ROUTES.map((route) => (
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
