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

const VALUE_IMAGES = [
  "/images/culture-talento.jpg",
  "/images/culture-valorizzazione.jpg",
  "/images/culture-community.png",
  "/images/culture-benessere-inclusione.jpg"
] as const

function ValueBlock({
  title,
  description,
  direction = "down",
  className
}: {
  title: string
  description: string
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
      <Typo.H3 text={title} variant="sectionSubTitle" color="dark" />
      <Typo.P text={description} color="dark" splitBy="line" stagger={0.1} />
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

function ValueRowMobile({
  title,
  description,
  image,
  index
}: {
  title: string
  description: string
  image: string
  index: number
}) {
  const imageOnRight = index % 2 === 1

  return (
    <div className="flex flex-col gap-6">
      <ValuePhoto
        src={image}
        className={cn("aspect-4/3 w-4/5", imageOnRight ? "mt-8 ml-auto" : "mr-auto")}
      />
      <ValueBlock
        title={title}
        description={description}
        direction={imageOnRight ? "up" : "down"}
      />
    </div>
  )
}

function ValueShowcase({ values }: TValueShowcaseProps) {
  const [talento, valorizzazione, community, benessere] = values

  return (
    <>
      <div className="col-span-12 flex flex-col gap-16 py-20 lg:hidden">
        {values.map((value, index) => (
          <ValueRowMobile
            key={value.title}
            title={value.title}
            description={value.description}
            image={VALUE_IMAGES[index]}
            index={index}
          />
        ))}
      </div>

      <div className="col-span-12 hidden py-20 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-40">
        <ValuePhoto src="/images/culture-talento.jpg" className="lg:col-span-4 lg:col-start-1" />
        <ValueBlock
          title={talento.title}
          description={talento.description}
          className="lg:col-span-4 lg:col-start-6"
        />

        <ValuePhoto
          src="/images/culture-valorizzazione.jpg"
          className="lg:col-span-6 lg:col-start-2"
        />
        <div className="grid grid-cols-4 gap-x-6 lg:col-span-4 lg:col-end-13">
          <ValuePhoto
            src="/images/culture-teamwork.jpeg"
            className="col-span-3 col-end-5 -translate-y-20"
          />

          <ValueBlock
            title={valorizzazione.title}
            description={valorizzazione.description}
            direction="up"
            className="col-span-4"
          />
        </div>

        <ValueBlock
          title={community.title}
          description={community.description}
          className="lg:col-span-4 lg:col-start-2"
        />
        <div className="translate-y-60 lg:col-span-4 lg:col-end-12">
          <ValuePhoto src="/images/culture-community.png" />
        </div>

        <ValuePhoto
          src="/images/culture-benessere-inclusione.jpg"
          className="aspect-3/4 lg:col-span-5 lg:col-start-2"
        />
        <ValueBlock
          title={benessere.title}
          description={benessere.description}
          className="mt-auto mb-20 lg:col-span-4 lg:col-end-12"
          direction="up"
        />
      </div>
    </>
  )
}

export default ValueShowcase
