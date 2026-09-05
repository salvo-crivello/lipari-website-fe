import type { VariantProps } from "class-variance-authority"
import type { tagVariants } from "./Tag.styles"

type TTagVariants = VariantProps<typeof tagVariants>

type TTagProps = {
  text: string
} & TTagVariants

export type { TTagProps, TTagVariants }
