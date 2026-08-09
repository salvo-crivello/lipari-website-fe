import { cva } from "class-variance-authority"

export const typoVariants = cva("", {
  variants: {
    variant: {
      display:
        "font-condensed text-6xl leading-none font-bold uppercase text-balance md:text-7xl 2xl:text-9xl",
      sectionTitle:
        "font-condensed text-4xl leading-none font-bold text-balance uppercase lg:text-6xl 2xl:text-8xl",
      sectionStatement: "text-2xl md:text-3xl 2xl:text-4xl font-bold text-pretty",
      eyebrow: "font-mono text-base font-medium uppercase text-balance leading-tight",
      lead: "text-3xl leading-relaxed font-bold text-pretty",
      body: "text-lg sm:text-xl sm:leading-relaxed text-pretty",
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
