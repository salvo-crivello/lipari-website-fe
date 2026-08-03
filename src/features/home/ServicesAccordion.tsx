"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabels } from "@/types/labels.types"
import { cn } from "@/utils"

type TServiceArea = TLabels["homepage"]["services"]["areas"][number]

type TServicesAccordionProps = {
  areas: readonly TServiceArea[]
}

function ServicesAccordion({ areas }: TServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="col-span-12 flex flex-col lg:col-span-8 lg:col-start-5">
      {areas.map((area, index) => (
        <AccordionRow
          key={area.title}
          area={area}
          isOpen={openIndex === index}
          isLast={index === areas.length - 1}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}

export default ServicesAccordion

// ========================================================================
// Sub-components
// ========================================================================

type TAccordionRowProps = {
  area: TServiceArea
  isOpen: boolean
  isLast: boolean
  onToggle: () => void
}

function AccordionRow({ area, isOpen, isLast, onToggle }: TAccordionRowProps) {
  return (
    <div className={cn("border-t-4 border-slate-200", isLast && "border-b-4")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-10 text-left"
      >
        <Typo.H3 text={area.title} color="dark" className="uppercase" />
        <ChevronDown
          className={cn(
            "text-brand-blue-950 size-8 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && area.content && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Typo.P text={area.content} color="dark" className="pb-10 text-slate-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
