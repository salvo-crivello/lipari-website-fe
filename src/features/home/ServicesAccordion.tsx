"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { AccordionItem, AccordionRoot, useAccordionRoot } from "@/components/ui/Accordion/Accordion"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ROUTES } from "@/constant/routes"
import { usePointerScrollEffect } from "@/hooks/usePointerScrollEffect"
import type { TLabels } from "@/types/labels.types"
import { cn } from "@/utils"

const HOVER_SELECTOR = "data-area-index" as const

const AREA_IMAGES = [
  "/home/careers-cta.png",
  "/home/hero-gallery-1.jpeg",
  "/home/locations-bg.png",
  "/home/team-maria-castellana.png",
  "/home/hero-gallery-3.png",
  "/home/careers-cta.png"
] as const

type TServiceArea = TLabels["homepage"]["services"]["areas"][number]

type TServicesAccordionProps = {
  areas: readonly TServiceArea[]
}

function ServicesAccordion({ areas }: TServicesAccordionProps) {
  return (
    <AccordionRoot defaultOpenId={areas[0]?.slug}>
      <ServicesImage areas={areas} />
      <ServicesAccordionList areas={areas} />
    </AccordionRoot>
  )
}

export default ServicesAccordion

// ========================================================================
// Sub-components - ServicesAccordion
// ========================================================================

function ServicesAccordionList({ areas }: TServicesAccordionProps) {
  const { openId } = useAccordionRoot()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  usePointerScrollEffect<HTMLElement>(HOVER_SELECTOR, (el) => {
    setHoveredIndex(Number(el.dataset.areaIndex))
  })

  useEffect(() => {
    console.log("hover states:", { openId, hoveredIndex })
  }, [openId, hoveredIndex])

  return (
    <ul className="col-span-12 flex flex-col lg:col-span-8 lg:col-start-6">
      {areas.map((area, index) => {
        const isOpen = area.slug === openId
        const isHovering = !isOpen && hoveredIndex === index
        const isLast = index === areas.length - 1
        const surface = isHovering ? "dark" : "light"

        return (
          <li
            key={area.slug}
            {...{ [HOVER_SELECTOR]: index }}
            onMouseLeave={() => hoveredIndex === index && setHoveredIndex(null)}
            className={cn("relative border-t-4 border-slate-200", isLast && "border-b-4")}
          >
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovering ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ originX: 1 }}
              className="bg-brand-blue-950 absolute inset-y-0 left-0 z-0 w-screen"
            />

            <AccordionItem id={area.slug} className="pl-4">
              <AccordionItem.Header
                className={cn(surface === "dark" ? "text-slate-50" : "text-brand-blue-950")}
                hideChevron
              >
                {area.title}
              </AccordionItem.Header>

              <AccordionItem.Content className="flex items-end gap-6 pt-10">
                <Typo.P
                  text={area.content}
                  color={surface === "dark" ? "light" : "dark"}
                  className={cn("ml-20", surface === "light" && "text-slate-500")}
                  disableMotion
                />
                <ButtonLink
                  href={`${ROUTES.SERVICES}/${area.slug}`}
                  icon={ArrowUpRight}
                  aria-label={`Vai a ${area.title}`}
                  variant="outline"
                  color="tertiary"
                  surface={surface}
                  onClick={(event) => event.stopPropagation()}
                />
              </AccordionItem.Content>
            </AccordionItem>
          </li>
        )
      })}
    </ul>
  )
}

// ========================================================================
// sub-component - ServicesImage
// ========================================================================

const ServicesImage = ({ areas }: TServicesAccordionProps) => {
  const { openId } = useAccordionRoot()
  const openIndex = areas.findIndex((area) => area.slug === openId)
  const activeImage = AREA_IMAGES[openIndex === -1 ? 0 : openIndex]

  return (
    <div className="relative col-span-12 mt-10 lg:col-span-4 lg:mt-16">
      <div className="sticky top-40 aspect-square w-full overflow-hidden rounded-sm">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image src={activeImage} alt="" fill className="object-cover" />
            <div className="bg-brand-green absolute inset-0 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
