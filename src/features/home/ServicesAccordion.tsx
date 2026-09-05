"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { AccordionItem, AccordionRoot, useAccordionRoot } from "@/components/ui/Accordion/Accordion"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"
import { ROUTES } from "@/constant/routes"
import { AREA_IMAGES } from "@/constant/serviceAreaImages"
import { usePointerScrollEffect } from "@/hooks/usePointerScrollEffect"
import type { TLabelsHomepageServicesAreas } from "@/types/labels.types"
import { cn } from "@/utils"
import { useWindowSize } from "@/hooks/useWindowSize"

const HOVER_SELECTOR = "data-area-index" as const

type TServicesAccordionProps = {
  labels: readonly TLabelsHomepageServicesAreas[]
}

function ServicesAccordion({ labels: areas }: TServicesAccordionProps) {
  const { isMobile } = useWindowSize()
  return (
    <AccordionRoot defaultOpenId={areas[0]?.slug}>
      {!isMobile && <ServicesImage labels={areas} />}
      <ServicesAccordionList labels={areas} />
    </AccordionRoot>
  )
}

export default ServicesAccordion

// ========================================================================
// Sub-components - ServicesAccordion
// ========================================================================

function ServicesAccordionList({ labels: areas }: TServicesAccordionProps) {
  const { isLG } = useWindowSize()
  const { openId } = useAccordionRoot()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  usePointerScrollEffect<HTMLElement>(HOVER_SELECTOR, (el) => {
    setHoveredIndex(Number(el.dataset.areaIndex))
  })

  return (
    <ul className="col-span-12 mt-10 flex flex-col lg:col-span-8 lg:col-start-6">
      {areas.map((area, index) => {
        const isOpen = area.slug === openId
        // Niente hover effect sotto lg: solo l'accordion open/close conta.
        const isHovering = isLG && hoveredIndex === index && !isOpen
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
              animate={{
                scaleX: isHovering ? 1 : 0,
                opacity: isOpen ? 0 : 1
              }}
              transition={{
                scaleX: {
                  duration: 0.5,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 0.2
                }
              }}
              style={{ originX: 1 }}
              className="bg-brand-blue-950 absolute inset-y-0 left-0 z-0 w-screen"
            />

            <AccordionItem id={area.slug} className="py-4 sm:pl-4">
              <AccordionItem.Header
                className={cn(
                  "text-left",
                  surface === "dark" ? "text-slate-50" : "text-brand-blue-950"
                )}
                hideChevron
              >
                {area.title}
              </AccordionItem.Header>

              <AccordionItem.Content className="flex items-end max-sm:flex-col">
                <Typo.P
                  text={area.content}
                  color={surface === "dark" ? "light" : "dark"}
                  className={cn(
                    "mr-10 sm:ml-20 2xl:ml-[50%]",
                    surface === "light" && "text-slate-500"
                  )}
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

const ServicesImage = ({ labels: areas }: TServicesAccordionProps) => {
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
            <BrandImage src={activeImage} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
