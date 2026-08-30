"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ROUTES } from "@/constant/routes"
import { AREA_IMAGES } from "@/constant/serviceAreaImages"
import { usePointerScrollEffect } from "@/hooks/usePointerScrollEffect"
import type { TLabelsHomepageServicesAreas } from "@/types/labels.types"
import { cn } from "@/utils"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"

const HOVER_SELECTOR = "data-row-index" as const

type TServicesRowProps = {
  labels: readonly TLabelsHomepageServicesAreas[]
}

function ServicesRow({ labels: areas }: TServicesRowProps) {
  const [{ current: hoveredIndex, previous: previousHoveredIndex }, setHover] = useState<{
    current: number | null
    previous: number | null
  }>({ current: null, previous: null })

  usePointerScrollEffect<HTMLElement>(HOVER_SELECTOR, (el) => {
    const next = Number(el.dataset.rowIndex)
    setHover((prev) => (prev.current === next ? prev : { current: next, previous: prev.current }))
  })

  return (
    <ul
      className="col-span-12 mt-20 flex flex-col"
      onMouseLeave={() =>
        setHover((prev) =>
          prev.current === null ? prev : { current: null, previous: prev.current }
        )
      }
    >
      {areas.map((area, index) => {
        const isActive = hoveredIndex === index
        const isLast = index === areas.length - 1
        const wasActive = previousHoveredIndex === index && !isActive

        let originY: number
        if (isActive) {
          if (previousHoveredIndex === null) {
            // Nessun hover precedente
            originY = isLast ? 1 : 0
          } else {
            // C'era già una riga hoverata, il mouse si è spostato su questa
            originY = index > previousHoveredIndex ? 0 : 1
          }
        } else if (wasActive && hoveredIndex !== null) {
          // Questa riga ERA quella hoverata e l'hover si è spostato su altra riga
          originY = hoveredIndex > previousHoveredIndex ? 1 : 0
        } else {
          // Default
          originY = isLast ? 1 : 0
        }

        return (
          <li
            key={area.slug}
            {...{ [HOVER_SELECTOR]: index }}
            className="relative border-t-4 border-slate-200 p-6 last:border-b-4 lg:p-10"
          >
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ left: "50%", x: "-50%", originY }}
              className="bg-brand-blue-950 absolute inset-y-0 z-0 w-screen"
            />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-20">
              <div className="flex gap-6 lg:gap-20">
                <Typo.Span
                  text={String(index + 1)}
                  color={isActive ? "light" : "dark"}
                  className="font-mono text-3xl font-bold"
                />
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative size-62 shrink-0 overflow-hidden rounded-sm"
                >
                  <BrandImage src={AREA_IMAGES[index]} alt="" className="object-cover" />
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 lg:self-stretch">
                <Typo.Span
                  text={area.title}
                  color={isActive ? "light" : "dark"}
                  className={cn(
                    "font-condensed text-3xl font-bold uppercase transition-all duration-400 lg:w-138.25 lg:shrink-0",
                    {
                      "text-slate-100": isActive,
                      "text-slate-900": !isActive
                    }
                  )}
                />
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ButtonLink
                    href={`${ROUTES.SERVICES}/${area.slug}`}
                    icon={ArrowUpRight}
                    aria-label={`Vai a ${area.title}`}
                    text="Read more"
                    variant="fill"
                    color="tertiary"
                    surface="dark"
                    onClick={(event) => !isActive && event.preventDefault()}
                  />
                </motion.div>
              </div>

              <Typo.P
                text={area.content}
                color={isActive ? "light" : "dark"}
                className={cn("transition-all duration-400 lg:w-138.25 lg:shrink-0", {
                  "text-slate-400": isActive,
                  "text-slate-900": !isActive
                })}
                disableMotion
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ServicesRow
