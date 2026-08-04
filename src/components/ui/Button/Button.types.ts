import type { ComponentProps, ElementType } from "react"
import type { VariantProps } from "class-variance-authority"
import type { buttonVariants } from "./Button.styles"
import { HTMLMotionProps } from "motion/react"
import { TButtonHtmlProps } from "@/types/components.types"
import Link from "next/link"

type TButtonVariants = VariantProps<typeof buttonVariants>

type TButtonProps = {
  text?: string
  icon?: ElementType
  iconPos?: "left" | "right"
}

type TButtonMotionProps = Omit<HTMLMotionProps<"button">, "ref">

type TButton = TButtonHtmlProps & TButtonProps & TButtonVariants & TButtonMotionProps

type TButtonLink = ComponentProps<typeof Link> & TButtonProps & TButtonVariants & TButtonMotionProps

export type { TButtonProps, TButtonVariants, TButtonMotionProps, TButton, TButtonLink }
