"use client"

import { useRef } from "react"
import { Blocks, Route, Zap, type LucideIcon } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsHomepageMethodsCards } from "@/types/labels.types"
import { cn } from "@/utils"

type TMethodsGalleryProps = {
  labels: readonly TLabelsHomepageMethodsCards[]
}

// Card visuals aren't in the labels fixture (labels is copy-only) — index-matched
// to homepage.methods.cards, same order as the Figma source.
const CARD_STYLES = [
  { icon: Route, bg: "bg-white", titleColor: "dark", descriptionClassName: "text-slate-500" },
  {
    icon: Zap,
    bg: "bg-brand-green",
    titleColor: "dark",
    descriptionClassName: "text-slate-700"
  },
  {
    icon: Blocks,
    bg: "bg-brand-blue-950",
    titleColor: "light",
    descriptionClassName: "text-slate-300"
  }
] as const

function MethodsGallery({ labels: cards }: TMethodsGalleryProps) {
  return (
    <div className="col-span-12 mt-10 grid gap-6 lg:mt-16 lg:grid-cols-3 2xl:mt-20">
      {cards.map((card, index) => (
        <MethodCard
          key={card.title}
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
  title: string
  description: string
  icon: LucideIcon
  bg: string
  titleColor: "dark" | "light"
  descriptionClassName: string
}

function MethodCard({
  title,
  description,
  icon: Icon,
  bg,
  titleColor,
  descriptionClassName
}: TMethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
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
