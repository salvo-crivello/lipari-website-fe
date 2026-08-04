import type { VariantProps } from "class-variance-authority"
import type { Dispatch, PropsWithChildren, KeyboardEvent, SetStateAction } from "react"
import type { accordionItemVariants } from "./Accordion.styles"

type TAccordionRootContext = {
  openId: string | null
  setOpenId: Dispatch<SetStateAction<string | null>>
}

type TAccordionRootProps = PropsWithChildren<{ defaultOpenId?: string | null }>

type TAccordionItemContext = {
  id: string
  expanded: boolean
  toggle: () => void
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
}

type TAccordionItemVariants = VariantProps<typeof accordionItemVariants>

type TAccordionItemProps = PropsWithChildren<
  TAccordionItemVariants & {
    id: string
    className?: string
  }
>

type TAccordionHeaderProps = PropsWithChildren<{ className?: string; hideChevron?: boolean }>
type TAccordionContentProps = PropsWithChildren<{ className?: string }>

export type {
  TAccordionRootContext,
  TAccordionRootProps,
  TAccordionItemContext,
  TAccordionItemVariants,
  TAccordionItemProps,
  TAccordionHeaderProps,
  TAccordionContentProps
}
