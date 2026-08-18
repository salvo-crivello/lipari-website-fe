export abstract class ROUTES {
  public static readonly HOME = "/"
  public static readonly SERVICES = "/services"
  public static readonly ABOUT = "/about"
  public static readonly CULTURE_CAREER = "/culture-career"
  public static readonly CONTACT = "/contact"
  public static readonly WHISTLEBLOWING = "/whistleblowing"
  public static readonly CODE_OF_ETHICS = "/code-of-ethics"
  public static readonly GENDER_EQUALITY_POLICY = "/gender-equality-policy"
  public static readonly PRIVACY_POLICY = "/privacy-policy"
  public static readonly COOKIE_POLICY = "/cookie-policy"
  public static readonly TERMS_AND_CONDITIONS = "/terms-and-conditions"

  public static readonly NAV_ROUTES = [
    { href: ROUTES.HOME, navKey: "home" },
    { href: ROUTES.SERVICES, navKey: "services" },
    { href: ROUTES.ABOUT, navKey: "about" },
    { href: ROUTES.CULTURE_CAREER, navKey: "cultureCareer" },
    { href: ROUTES.CONTACT, navKey: "contact" }
  ] as const

  public static readonly COMPLIANCE_ROUTES = [
    { href: ROUTES.WHISTLEBLOWING, title: "Whistleblowing" },
    { href: ROUTES.CODE_OF_ETHICS, title: "Codice Etico" },
    { href: ROUTES.GENDER_EQUALITY_POLICY, title: "Politica di Parità di Genere" }
  ] as const

  public static readonly LEGAL_ROUTES = [
    { href: ROUTES.PRIVACY_POLICY, title: "Privacy Policy" },
    { href: ROUTES.COOKIE_POLICY, title: "Cookie Policy" },
    { href: ROUTES.TERMS_AND_CONDITIONS, title: "Termini e Condizioni" }
  ] as const

  public static readonly SOCIAL_LINKS = [
    { href: "#", label: "LinkedIn" },
    { href: "#", label: "Instagram" },
    { href: "#", label: "Facebook" }
  ] as const
}
