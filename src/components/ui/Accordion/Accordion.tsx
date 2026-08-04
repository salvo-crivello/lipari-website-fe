"use client"

import { createContext, forwardRef, KeyboardEvent, useContext, useState } from "react"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/utils"
import { accordionItemVariants } from "./Accordion.styles"
import type {
  TAccordionContentProps,
  TAccordionHeaderProps,
  TAccordionItemContext,
  TAccordionItemProps,
  TAccordionRootContext,
  TAccordionRootProps
} from "./Accordion.types"

const AccordionRootContext = createContext<TAccordionRootContext>({
  openId: null,
  setOpenId: () => {}
})

export const useAccordionRoot = () => useContext(AccordionRootContext)

/**
 * Root container that coordinates the expanded AccordionItem.
 */
export function AccordionRoot({ children, defaultOpenId = null }: TAccordionRootProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  return (
    <AccordionRootContext.Provider value={{ openId, setOpenId }}>
      {children}
    </AccordionRootContext.Provider>
  )
}

// ========================================================================
// Sub-components - AccordionItem
// ========================================================================

const AccordionItemContext = createContext<TAccordionItemContext>({
  id: "",
  expanded: false,
  toggle: () => {},
  handleKeyDown: () => {}
})

export const useAccordionItem = () => useContext(AccordionItemContext)

/**
 * A single accordion item provider.
 */
const AccordionItemBase = forwardRef<HTMLDivElement, TAccordionItemProps>(
  ({ children, id, variant, size, className, ...props }, ref) => {
    const { openId, setOpenId } = useAccordionRoot()
    const expanded = openId === id

    function toggle() {
      setOpenId((current) => (current === id ? null : id))
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      toggle()
    }

    return (
      <AccordionItemContext.Provider value={{ id, expanded, toggle, handleKeyDown }}>
        <div
          ref={ref}
          aria-expanded={expanded}
          className={cn(accordionItemVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)

// ========================================================================
// Sub-components - AccordionItem.Header & AccordionItem.Content
// ========================================================================

/**
 * Clickable accordion header.
 */
const Header = forwardRef<HTMLButtonElement, TAccordionHeaderProps>(
  ({ children, className, hideChevron = false }, ref) => {
    const { expanded, toggle, handleKeyDown } = useAccordionItem()

    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-4 py-10 text-2xl font-bold uppercase transition-all duration-500",
          className
        )}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {children}
        {!hideChevron && (
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="shrink-0"
          >
            <Plus className="size-7" strokeWidth={2} />
          </motion.div>
        )}
      </button>
    )
  }
)

/**
 * Expandable accordion content.
 */
const Content = forwardRef<HTMLDivElement, TAccordionContentProps>(
  ({ children, className }, ref) => {
    const { expanded, id } = useAccordionItem()

    return (
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            ref={ref}
            id={`accordion-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn("overflow-hidden", className)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

AccordionItemBase.displayName = "AccordionItem"
Header.displayName = "AccordionItem.Header"
Content.displayName = "AccordionItem.Content"

export const AccordionItem = Object.assign(AccordionItemBase, { Header, Content })
