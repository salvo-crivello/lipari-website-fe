import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center gap-2 rounded-full font-mono text-sm font-medium tracking-wide uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Shape: button shape style.
      variant: {
        fill: "",
        outline: "border-2 bg-transparent",
        ghost: "bg-transparent",
        text: "bg-transparent"
      },
      // Family: brand color - via compoundVariants
      color: {
        primary: "",
        secondary: "",
        tertiary: ""
      },
      // Contrast: background behind the button - via compoundVariants
      surface: {
        dark: "",
        light: ""
      },
      size: {
        md: "h-12 px-6 py-4",
        lg: "h-14 px-8 py-4 text-sm"
      },
      onlyIcon: {
        true: "px-0! aspect-square"
      },
      bodyText: {
        true: "font-sans text-md normal-case tracking-normal"
      }
    },
    compoundVariants: [
      // FILL
      {
        variant: "fill",
        color: "primary",
        class: "bg-brand-blue text-slate-50 hover:brightness-110"
      },
      {
        variant: "fill",
        color: "secondary",
        class: "bg-brand-green text-brand-blue-950 hover:brightness-110"
      },
      {
        variant: "fill",
        color: "tertiary",
        surface: "dark",
        class: "bg-white/10 text-slate-50 hover:bg-white/15"
      },
      {
        variant: "fill",
        color: "tertiary",
        surface: "light",
        class: "bg-slate-300 text-slate-900 hover:bg-slate-400"
      },

      // OUTLINE
      {
        variant: "outline",
        color: "primary",
        surface: "light",
        class: "border-brand-blue text-brand-blue hover:bg-brand-blue/10"
      },
      {
        variant: "outline",
        color: "primary",
        surface: "dark",
        class: "border-brand-blue-400 text-brand-blue-400 hover:bg-brand-blue-400/10"
      },
      {
        variant: "outline",
        color: "secondary",
        surface: "light",
        class: "border-brand-green-700 text-brand-green-700 hover:bg-brand-green/10"
      },
      {
        variant: "outline",
        color: "secondary",
        surface: "dark",
        class: "border-brand-green text-brand-green hover:bg-brand-green/10"
      },
      {
        variant: "outline",
        color: "tertiary",
        surface: "light",
        class: "border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-brand-blue"
      },
      {
        variant: "outline",
        color: "tertiary",
        surface: "dark",
        class: "border-white/40 text-slate-50 hover:bg-white/10"
      },

      // GHOST (no border, background only appears on hover)
      {
        variant: "ghost",
        color: "primary",
        surface: "light",
        class: "text-brand-blue hover:bg-brand-blue/10"
      },
      {
        variant: "ghost",
        color: "primary",
        surface: "dark",
        class: "text-brand-blue-400 hover:bg-brand-blue-400/10"
      },
      {
        variant: "ghost",
        color: "secondary",
        surface: "light",
        class: "text-brand-green-700 hover:bg-brand-green/10"
      },
      {
        variant: "ghost",
        color: "secondary",
        surface: "dark",
        class: "text-brand-green hover:bg-brand-green/10"
      },
      {
        variant: "ghost",
        color: "tertiary",
        surface: "light",
        class: "text-slate-700 hover:bg-slate-200"
      },
      {
        variant: "ghost",
        color: "tertiary",
        surface: "dark",
        class: "text-slate-50 hover:bg-white/10"
      },

      // TEXT (no border, no background ever — underline on hover)
      {
        variant: "text",
        color: "primary",
        surface: "light",
        class: "!p-0 !h-fit text-brand-blue hover:underline"
      },
      {
        variant: "text",
        color: "primary",
        surface: "dark",
        class: "!p-0 !h-fit text-brand-blue-400 hover:underline"
      },
      {
        variant: "text",
        color: "secondary",
        surface: "light",
        class: "!p-0 !h-fit text-brand-green-700 hover:underline"
      },
      {
        variant: "text",
        color: "secondary",
        surface: "dark",
        class: "!p-0 !h-fit text-brand-green hover:underline"
      },
      {
        variant: "text",
        color: "tertiary",
        surface: "light",
        class: "!p-0 !h-fit text-slate-700 hover:underline"
      },
      {
        variant: "text",
        color: "tertiary",
        surface: "dark",
        class: "!p-0 !h-fit text-slate-50 hover:underline"
      }
    ],
    defaultVariants: {
      variant: "fill",
      color: "primary",
      surface: "dark",
      size: "md"
    }
  }
)
