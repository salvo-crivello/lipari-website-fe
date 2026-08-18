import { Footer as FooterComponent } from "@/components/layout/MainComponents"
import { ROUTES } from "@/constant/routes"
import LipariLogo from "@/assets/svg/LipariLogo"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TFooterShellProps } from "@/components/layout/footer/FooterShell.types"

export function FooterShell({ labels: footer }: TFooterShellProps) {
  const copyright = `© ${new Date().getFullYear()} ${footer.companyName}`

  return (
    <FooterComponent className="bg-brand-blue-950 flex flex-col gap-10">
      <LipariLogo className="text-brand-green" />
      <div className="grid grid-cols-2 gap-6 gap-y-10 sm:grid-cols-12">
        <Typo.Span
          variant="display"
          text={footer.valueStatement}
          color="brand"
          className="col-span-2 flex flex-col justify-between gap-8 max-2xl:max-w-150 sm:col-span-8"
        />

        <nav aria-label="Footer" className="flex flex-col gap-6 sm:col-span-2">
          {ROUTES.NAV_ROUTES.map((item) => (
            <ButtonLink
              key={item.href}
              href={item.href}
              text={footer.navRoutes[item.navKey]}
              variant="text"
              color="tertiary"
              surface="dark"
            />
          ))}
        </nav>

        <nav aria-label="Compliance" className="flex flex-col gap-6 sm:col-span-2">
          {ROUTES.COMPLIANCE_ROUTES.map((route) => (
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

        <div className="col-span-2 flex max-w-150 gap-6 max-sm:mt-5 max-sm:grid max-sm:grid-cols-2 sm:col-span-8 sm:items-center sm:gap-20">
          <Typo.P
            text="Seguici sui nostri social"
            className="text-balance max-2xl:text-sm! max-sm:max-w-40 max-sm:text-base!"
            disableMotion
          />
          <div className="flex gap-4 gap-x-8 max-sm:flex-col">
            {ROUTES.SOCIAL_LINKS.map((social) => (
              <ButtonLink
                key={social.label}
                href={social.href}
                text={social.label}
                variant="text"
                color="primary"
                surface="dark"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t-2 border-slate-700 py-10">
        <p className="flex gap-3 text-slate-300 max-sm:mb-4 max-sm:flex-col">
          <span>{copyright}</span>
          <span className="text-brand-green max-sm:hidden">|</span>
          <span>{footer.vatNumber}</span>
          <span className="text-brand-green max-sm:hidden">|</span>
          <span>{footer.address}</span>
        </p>

        <nav aria-label="Legal" className="flex gap-6 max-sm:flex-col sm:gap-10">
          {ROUTES.LEGAL_ROUTES.map((route) => (
            <ButtonLink
              key={route.href}
              href={route.href}
              variant="text"
              color="tertiary"
              surface="dark"
              text={route.title}
            />
          ))}
        </nav>
      </div>
    </FooterComponent>
  )
}
