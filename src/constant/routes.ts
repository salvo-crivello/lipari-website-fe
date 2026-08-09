export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  ABOUT: "/about",
  CULTURE_CAREER: "/culture-career",
  CONTACT: "/contact",
  WHISTLEBLOWING: "/whistleblowing",
  CODE_OF_ETHICS: "/code-of-ethics",
  GENDER_EQUALITY_POLICY: "/gender-equality-policy",
  PRIVACY_POLICY: "/privacy-policy",
  COOKIE_POLICY: "/cookie-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions"
} as const

export const NAV_ROUTES = [
  { href: ROUTES.HOME, navKey: "home" },
  { href: ROUTES.SERVICES, navKey: "services" },
  { href: ROUTES.ABOUT, navKey: "about" },
  { href: ROUTES.CULTURE_CAREER, navKey: "cultureCareer" },
  { href: ROUTES.CONTACT, navKey: "contact" }
] as const

export const COMPLIANCE_ROUTES = [
  { href: ROUTES.WHISTLEBLOWING, title: "Whistleblowing" },
  { href: ROUTES.CODE_OF_ETHICS, title: "Codice Etico" },
  { href: ROUTES.GENDER_EQUALITY_POLICY, title: "Politica di Parità di Genere" }
] as const

export const LEGAL_ROUTES = [
  { href: ROUTES.PRIVACY_POLICY, title: "Privacy Policy" },
  { href: ROUTES.COOKIE_POLICY, title: "Cookie Policy" },
  { href: ROUTES.TERMS_AND_CONDITIONS, title: "Termini e Condizioni" }
] as const

export const SOCIAL_LINKS = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" }
] as const
