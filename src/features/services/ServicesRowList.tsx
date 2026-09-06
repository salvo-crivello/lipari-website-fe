"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ROUTES } from "@/constant/routes"
import { AREA_IMAGES } from "@/constant/serviceAreaImages"
import { usePointerScrollEffect } from "@/hooks/usePointerScrollEffect"
import { useWindowSize } from "@/hooks/useWindowSize"
import { cn } from "@/utils"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"

const HOVER_SELECTOR = "data-row-index" as const

export type TServicesRow = {
  title: string
  slug: string
  description: string
}

type TServicesRowListProps = {
  services: TServicesRow[]
}

function ServicesRowList({ services }: TServicesRowListProps) {
  const { isLG, isSM } = useWindowSize()
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
      {services.map((service, index) => {
        const isActive = isSM && hoveredIndex === index
        const isLast = index === services.length - 1
        const wasActive = previousHoveredIndex === index && !isActive

        let originY: number
        if (isActive) {
          if (previousHoveredIndex === null) {
            originY = isLast ? 1 : 0
          } else {
            originY = index > previousHoveredIndex ? 0 : 1
          }
        } else if (wasActive && hoveredIndex !== null) {
          originY = hoveredIndex > previousHoveredIndex ? 1 : 0
        } else {
          originY = isLast ? 1 : 0
        }

        return (
          <ServiceRow
            key={service.slug}
            index={index}
            title={service.title}
            slug={service.slug}
            description={service.description}
            image={AREA_IMAGES[index]}
            isActive={isActive}
            originY={originY}
            isLG={isLG}
          />
        )
      })}
    </ul>
  )
}

export default ServicesRowList

// ========================================================================
// Sub-components
// ========================================================================

type TServiceRowProps = {
  index: number
  title: string
  slug: string
  description: string
  image: string
  isActive: boolean
  originY: number
  isLG: boolean
}

function ServiceRow({
  index,
  title,
  slug,
  description,
  image,
  isActive,
  originY,
  isLG
}: TServiceRowProps) {
  return (
    <li
      {...{ [HOVER_SELECTOR]: index }}
      className="relative border-t-4 border-slate-200 py-6 last:border-b-4 lg:py-10"
    >
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ left: "50%", x: "-50%", originY }}
        className="bg-brand-blue-950 absolute inset-y-0 z-0 w-screen"
      />

      <div className="relative z-10 flex flex-col gap-6 md:grid md:grid-cols-[auto_1fr] md:items-start md:gap-x-10 md:gap-y-6 lg:grid-cols-12">
        <div className="flex gap-6 sm:max-lg:row-span-2 lg:col-span-4 lg:gap-10">
          <Typo.Span
            text={String(index + 1)}
            color={isActive ? "light" : "dark"}
            className="font-mono text-3xl font-bold"
          />
          <div
            className={cn(
              "relative isolate aspect-square w-62 shrink-0 overflow-hidden rounded-sm transition-opacity duration-300",
              {
                "opacity-0": !isActive && isLG,
                "opacity-100": isActive && isLG
              }
            )}
          >
            <BrandImage src={image} alt="" className="object-cover" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6 md:col-start-2 lg:col-span-4 lg:self-stretch">
          <Typo.Span
            text={title}
            color={isActive ? "light" : "dark"}
            variant="sectionSubTitle"
            className={cn("transition-all duration-400", {
              "text-slate-100": isActive,
              "text-slate-900": !isActive
            })}
          />
          {isLG && (
            <motion.div
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: isActive ? 0.15 : 0.1, delay: isActive ? 0.4 : 0 }}
            >
              <ButtonLink
                href={`${ROUTES.SERVICES}/${slug}`}
                icon={ArrowUpRight}
                aria-label={`Vai a ${title}`}
                text="Read more"
                variant="fill"
                color="tertiary"
                surface="dark"
                onClick={(event) => !isActive && event.preventDefault()}
              />
            </motion.div>
          )}
        </div>

        <Typo.P
          text={description}
          color={isActive ? "light" : "dark"}
          className={cn("transition-all duration-400 md:col-start-2 lg:col-span-4", {
            "text-slate-400": isActive,
            "text-slate-900": !isActive
          })}
          disableMotion
        />

        {!isLG && (
          <ButtonLink
            href={`${ROUTES.SERVICES}/${slug}`}
            icon={ArrowUpRight}
            aria-label={`Vai a ${title}`}
            text="Read more"
            variant="fill"
            color="tertiary"
            surface={"light"}
            onClick={(event) => !isActive && event.preventDefault()}
            className="ml-auto sm:col-span-2"
          />
        )}
      </div>
    </li>
  )
}
