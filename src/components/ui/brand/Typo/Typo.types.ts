import { VariantProps } from "class-variance-authority"
import { typoVariants } from "./Typo.styles"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

type TTypoVariants = VariantProps<typeof typoVariants>

type TTypoTag = keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span">

type TTypoProps<T extends TTypoTag> = {
  text?: string
  className?: string
} & ComponentPropsWithoutRef<T>

type TTypo = TTypoProps<TTypoTag> & TTypoVariants

export type { TTypoVariants, TTypoTag, TTypoProps, TTypo }
