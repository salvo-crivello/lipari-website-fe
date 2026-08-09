import { cva } from "class-variance-authority"

export const accordionItemVariants = cva("w-full text-left relative z-10 border-none", {
  variants: {
    variant: {
      custom: "",
      outline: "border-t-4 border-slate-200"
    },
    size: {
      default: ""
    }
  },
  defaultVariants: {
    variant: "custom",
    size: "default"
  }
})
