"use client"

import { useRef } from "react"
import { Blocks, Route, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabels } from "@/types/labels.types"
import { cn } from "@/utils"

type TMethodCard = TLabels["homepage"]["methods"]["cards"][number]

type TMethodsGalleryProps = {
  labels: readonly TMethodCard[]
}

// Card visuals aren't in the labels fixture (labels is copy-only) — index-matched
// to homepage.methods.cards, same order as the Figma source.
const CARD_STYLES = [
  { icon: Route, bg: "bg-white", title: "dark", desc: "text-slate-500" },
  { icon: Zap, bg: "bg-brand-green", title: "dark", desc: "text-slate-700" },
  { icon: Blocks, bg: "bg-brand-blue-950", title: "light", desc: "text-slate-300" }
] as const

function MethodsGallery({ labels: cards }: TMethodsGalleryProps) {
  return (
    <div className="col-span-12 mt-10 grid gap-6 lg:mt-16 lg:grid-cols-3 2xl:mt-20">
      {cards.map((card, index) => (
        <MethodCard key={card.title} card={card} style={CARD_STYLES[index]} />
      ))}
    </div>
  )
}

export default MethodsGallery

// ========================================================================
// Sub-components
// ========================================================================

type TMethodCardProps = {
  card: TMethodCard
  style: (typeof CARD_STYLES)[number]
}

function MethodCard({ card, style }: TMethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  // Light translateY drift for as long as the card is on screen — not a
  // one-shot reveal-on-enter, it keeps tracking scroll the whole time the
  // card is visible (same offset idiom as HeroGallery's per-image progress).
  const y = useTransform(scrollYProgress, [0, 1], [24, -24])
  const Icon = style.icon

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className={cn("flex flex-col gap-6 rounded-sm p-6 lg:gap-10 lg:p-8 2xl:p-10", style.bg)}
    >
      <Icon
        className={cn(
          "h-16 w-16 lg:h-20 lg:w-20 2xl:h-28 2xl:w-28",
          style.title === "dark" ? "text-brand-blue-950" : "text-slate-50"
        )}
        strokeWidth={1}
      />
      <div className="flex flex-col gap-2.5">
        <Typo.H3 text={card.title} color={style.title} />
        <Typo.P text={card.description} color={style.title} className={style.desc} />
      </div>
    </motion.div>
  )
}
