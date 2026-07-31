import { cva } from "class-variance-authority"

export const typoVariants = cva("", {
  variants: {
    variant: {
      display: "font-condensed text-5xl leading-none font-bold text-balance uppercase lg:text-8xl",
      sectionTitle:
        "font-condensed text-4xl leading-tight font-bold text-balance uppercase lg:text-6xl",
      sectionStatement: "text-3xl leading-relaxed font-bold text-pretty",
      eyebrow: "font-mono text-base font-normal uppercase tracking-wide",
      lead: "text-3xl leading-relaxed font-bold text-pretty",
      body: "text-xl leading-loose font-medium text-pretty",
      caption: "text-sm leading-normal font-normal text-pretty"
    },
    color: {
      light: "text-slate-50",
      dark: "text-brand-blue-950",
      brand: "text-brand-green",
      inherit: ""
    }
  },
  defaultVariants: {
    color: "light"
  }
})
