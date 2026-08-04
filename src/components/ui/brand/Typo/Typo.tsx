import { cn, isNotBlankOrEmpty } from "@/utils"
import type { ReactElement } from "react"
import type { TTypoVariants, TTypo, TTypoTag } from "./Typo.types"
import { typoVariants } from "./Typo.styles"
import { MotionTextSplit } from "@/components/motion/MotionTextSplit"

const defaultVariant = {
  h1: "display",
  h2: "sectionTitle",
  h3: "sectionStatement",
  h4: "eyebrow",
  h5: "body",
  p: "body",
  span: "caption"
} satisfies Record<string, TTypoVariants["variant"]>

function createTypo<T extends TTypoTag>(tag: T) {
  function TypoComponent({
    variant = defaultVariant[String(tag) as keyof typeof defaultVariant],
    color = "light",
    className,
    text,
    disableMotion = false,
    ...props
  }: TTypo): ReactElement {
    const Tag = tag as TTypoTag

    return (
      <Tag className={cn(typoVariants({ variant, color }), className)} {...props}>
        {!disableMotion && isNotBlankOrEmpty(text) ? <MotionTextSplit text={text} /> : text}
      </Tag>
    )
  }

  TypoComponent.displayName = `Typo.${String(tag).toUpperCase()}`

  return TypoComponent
}

export const Typo = {
  H1: createTypo("h1"),
  H2: createTypo("h2"),
  H3: createTypo("h3"),
  H4: createTypo("h4"),
  H5: createTypo("h5"),
  P: createTypo("p"),
  Span: createTypo("span")
}
