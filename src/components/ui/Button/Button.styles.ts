import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-mono text-sm font-medium tracking-wide uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-fit",
  {
    variants: {
      variant: {
        primary: "bg-brand-blue text-slate-50 hover:brightness-110",
        secondary: "bg-transparent text-slate-50 ring-2 ring-inset ring-white/40 hover:bg-white/10"
      },
      size: {
        md: "h-12 px-6 py-4",
        lg: "h-14 px-8 py-4 text-sm"
      },
      onlyIcon: {
        true: "px-0!"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)
