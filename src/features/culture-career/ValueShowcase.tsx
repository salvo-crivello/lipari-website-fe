"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsCultureCareerPageValues } from "@/types/labels.types"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"
import { cn } from "@/utils"
import { useWindowSize } from "@/hooks/useWindowSize"

type TValueShowcaseProps = {
  values: readonly TLabelsCultureCareerPageValues[]
}

function ValueBlock({
  value,
  direction = "down",
  className
}: {
  value: TLabelsCultureCareerPageValues
  direction?: "up" | "down"
  className?: string
}) {
  const { isMobile } = useWindowSize()
  const blockRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], direction === "down" ? [0, 100] : [0, -100])

  return (
    <motion.div
      ref={blockRef}
      style={{ y: isMobile ? 0 : y }}
      className={cn("flex flex-col gap-6", className)}
    >
      <Typo.H3 text={value.title} variant="sectionSubTitle" color="dark" />
      <Typo.P text={value.description} color="dark" splitBy="line" stagger={0.1} />
    </motion.div>
  )
}

function ValuePhoto({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full overflow-hidden rounded-sm", className)}>
      <BrandImage src={src} alt="" />
    </div>
  )
}

// Mobile can't fit the desktop masonry (no room for a photo beside its own
// text), so it gets its own staggered rhythm instead: photo alternates
// left/right per value, with a small vertical nudge on the offset side, and
// each block keeps the same scroll-parallax direction as its photo's side.
function ValueRowMobile({
  value,
  index
}: {
  value: TLabelsCultureCareerPageValues
  index: number
}) {
  const imageOnRight = index % 2 === 1

  return (
    <div className="flex flex-col gap-6">
      <ValuePhoto
        src={value.image}
        className={cn("aspect-4/3 w-4/5", imageOnRight ? "mt-8 ml-auto" : "mr-auto")}
      />
      <ValueBlock value={value} direction={imageOnRight ? "up" : "down"} />
    </div>
  )
}

function ValueShowcase({ values }: TValueShowcaseProps) {
  const [talento, valorizzazione, community, benessere] = values

  return (
    <>
      <div className="col-span-12 flex flex-col gap-16 py-20 lg:hidden">
        {values.map((value, index) => (
          <ValueRowMobile key={value.title} value={value} index={index} />
        ))}
      </div>

      <div className="col-span-12 hidden py-20 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-40">
        <ValuePhoto src={talento.image} className="lg:col-span-4 lg:col-start-1" />
        <ValueBlock value={talento} className="lg:col-span-4 lg:col-start-6" />

        <ValuePhoto src={valorizzazione.image} className="lg:col-span-6 lg:col-start-2" />
        <div className="grid grid-cols-4 gap-x-6 lg:col-span-4 lg:col-end-13">
          <ValuePhoto
            src="/home/locations-bg.png"
            className="col-span-3 col-end-5 -translate-y-20"
          />

          <ValueBlock value={valorizzazione} direction="up" className="col-span-4" />
        </div>

        <ValueBlock value={community} className="lg:col-span-4 lg:col-start-2" />
        <div className="translate-y-60 lg:col-span-4 lg:col-end-12">
          <ValuePhoto src={community.image} />
        </div>

        <ValuePhoto src={benessere.image} className="aspect-3/4 lg:col-span-5 lg:col-start-2" />
        <ValueBlock
          value={benessere}
          className="mt-auto mb-20 lg:col-span-4 lg:col-end-12"
          direction="up"
        />
      </div>
    </>
  )
}

export default ValueShowcase
