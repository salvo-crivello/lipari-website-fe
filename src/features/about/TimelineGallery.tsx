"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsAboutpageTimelineItems } from "@/types/labels.types"
import { cn } from "@/utils"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"
import { useWindowSize } from "@/hooks/useWindowSize"

type TTimelineGalleryProps = {
  labels: readonly TLabelsAboutpageTimelineItems[]
}

const COLUMN_PATTERN = [0, 2, 1, 2, 0, 1] as const
const COLUMN_START_CLASS = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"] as const
const SM_COLUMN_START_CLASS = ["sm:col-start-1", "sm:col-start-2"] as const

function TimelineGallery({ labels: items }: TTimelineGalleryProps) {
  return (
    <div className="col-span-12 mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0 2xl:mt-20">
      {items.map((item, index) => {
        const column = COLUMN_PATTERN[index % COLUMN_PATTERN.length]
        const smColumn = index % SM_COLUMN_START_CLASS.length
        return (
          <TimelineCard
            key={item.year}
            item={item}
            index={index}
            row={index + 1}
            columnClassName={cn(SM_COLUMN_START_CLASS[smColumn], COLUMN_START_CLASS[column])}
          />
        )
      })}
    </div>
  )
}

export default TimelineGallery

// ========================================================================
// Sub-components
// ========================================================================

type TTimelineCardProps = {
  item: TLabelsAboutpageTimelineItems
  index: number
  row: number
  columnClassName: string
}

function TimelineCard({ item, index, row, columnClassName }: TTimelineCardProps) {
  const { isMobile } = useWindowSize()
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * index, -100 * index * 0.5])

  return (
    <motion.div
      ref={cardRef}
      style={{ y: isMobile ? 0 : y, gridRow: row }}
      className={cn("@container flex flex-col gap-5", columnClassName)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm">
        <BrandImage src={`/home/${item.year}.png`} />
      </div>
      <Typo.Span
        text={item.year}
        color="dark"
        className="font-mono text-[clamp(3rem,40cqw,20rem)] leading-none font-black uppercase"
        splitBy="letter"
        stagger={0.15}
      />
      <Typo.Span
        text={item.description}
        color="dark"
        variant="eyebrow"
        className="text-pretty text-slate-500 lg:text-lg"
      />
    </motion.div>
  )
}
