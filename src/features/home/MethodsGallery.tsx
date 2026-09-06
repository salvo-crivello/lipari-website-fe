"use client"

import { useRef } from "react"
import { Blocks, Route, Zap, type LucideIcon } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsHomepageMethodsCards } from "@/types/labels.types"
import { cn } from "@/utils"
import { useWindowSize } from "@/hooks/useWindowSize"

type TMethodsGalleryProps = {
  labels: readonly TLabelsHomepageMethodsCards[]
}

const CARD_STYLES = [
  {
    icon: Route,
    bg: "bg-white",
    titleColor: "dark",
    descriptionClassName: "text-slate-500",
    rotation: -4
  },
  {
    icon: Zap,
    bg: "bg-brand-green",
    titleColor: "dark",
    descriptionClassName: "text-slate-700",
    rotation: 3
  },
  {
    icon: Blocks,
    bg: "bg-brand-blue-950",
    titleColor: "light",
    descriptionClassName: "text-slate-300",
    rotation: -2
  }
] as const

const Y_BASE_DESKTOP = 60
const Y_STEP_DESKTOP = 30

function MethodsGallery({ labels: cards }: TMethodsGalleryProps) {
  return (
    <div className="col-span-12 mt-10 grid gap-6 lg:mt-16 lg:grid-cols-3 2xl:mt-20">
      {cards.map((card, index) => (
        <MethodCard
          key={card.title}
          index={index}
          title={card.title}
          description={card.description}
          icon={CARD_STYLES[index].icon}
          bg={CARD_STYLES[index].bg}
          titleColor={CARD_STYLES[index].titleColor}
          descriptionClassName={CARD_STYLES[index].descriptionClassName}
        />
      ))}
    </div>
  )
}

export default MethodsGallery

// ========================================================================
// Sub-components
// ========================================================================

type TMethodCardProps = {
  index: number
  title: string
  description: string
  icon: LucideIcon
  bg: string
  titleColor: "dark" | "light"
  descriptionClassName: string
}

function MethodCard({
  index,
  title,
  description,
  icon: Icon,
  bg,
  titleColor,
  descriptionClassName
}: TMethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useWindowSize()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"]
  })

  const rotationMobile = CARD_STYLES[index]?.rotation ?? 0
  const rotation = isMobile ? rotationMobile : -4
  const stagger = isMobile ? 0 : index * 0.18

  const yStart = isMobile ? 40 : Y_BASE_DESKTOP + index * Y_STEP_DESKTOP

  const rotateZ = useTransform(
    scrollYProgress,
    [stagger, 0.7 + stagger * 0.6, 1],
    [rotation * 2, rotation * 0.8, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [stagger, 0.7 + stagger * 0.6, 1],
    [yStart, yStart * 0.2, 0]
  )
  const scale = useTransform(scrollYProgress, [stagger, 1], [0.96, 1])

  return (
    <motion.div
      ref={cardRef}
      style={isMobile ? { rotateZ, y, scale } : { y }}
      className={cn("flex flex-col gap-6 rounded-sm p-6 lg:gap-10 lg:p-8 2xl:p-10", bg)}
    >
      <Icon
        className={cn(
          "h-16 w-16 lg:h-20 lg:w-20 2xl:h-28 2xl:w-28",
          titleColor === "dark" ? "text-brand-blue-950" : "text-slate-50"
        )}
        strokeWidth={1}
      />

      <div className="flex flex-col gap-2.5">
        <Typo.H3 text={title} color={titleColor} />

        <Typo.P
          text={description}
          color={titleColor}
          className={descriptionClassName}
          splitBy="line"
          stagger={0.1}
        />
      </div>
    </motion.div>
  )
}
