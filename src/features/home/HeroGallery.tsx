"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { useScroll, useTransform, motion, type MotionValue } from "motion/react"
import { cn } from "@/utils"
import { TSectionProps } from "@/types/components.types"
import { Section } from "@/components/layout/MainComponents"

type TGalleryImageProps = {
  src: string
  startMarginTop: number
  progress: MotionValue<number>
}

function HeroGallery({ className, ...props }: TSectionProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  })
  const containerX = useTransform(scrollYProgress, [0, 1], ["50%", "-100%"])
  return (
    <Section
      className={cn("relative h-screen items-center overflow-hidden", className)}
      {...props}
      removePadding
    >
      <div ref={galleryRef} className="flex h-fit w-fit items-center">
        <motion.div
          style={{ x: containerX }}
          className={cn("relative flex w-fit items-start gap-10 sm:h-screen sm:gap-20")}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryImage
              key={index}
              src={image.src}
              startMarginTop={image.startMarginTop}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

export default HeroGallery

// ========================================================================
//Sub-components
// ========================================================================

const GALLERY_IMAGES = [
  { src: "/home/hero-gallery-1.jpeg", startMarginTop: 100 },
  { src: "/home/hero-gallery-2.jpeg", startMarginTop: 200 },
  { src: "/home/hero-gallery-3.png", startMarginTop: 300 },
  { src: "/home/hero-gallery-4.jpg", startMarginTop: 400 }
] as const

function GalleryImage({ src, startMarginTop, progress }: TGalleryImageProps) {
  const marginTop = useTransform(progress, [0, 0.8], [startMarginTop, 0])

  return (
    <motion.div
      style={{ marginTop }}
      className={cn("relative aspect-3/4 w-65 shrink-0 overflow-hidden rounded-sm sm:w-100")}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 640px) 400px, 260px"
        className="object-cover"
      />
    </motion.div>
  )
}
