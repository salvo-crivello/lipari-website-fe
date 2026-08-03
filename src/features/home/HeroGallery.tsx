"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { useScroll, useTransform, motion, type MotionValue } from "motion/react"
import { cn } from "@/utils"

type TGalleryImageProps = {
  src: string
  startMarginTop: number
  width: string
  aspect: string
  progress: MotionValue<number>
}

function HeroGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  })
  const containerX = useTransform(scrollYProgress, [0, 1], ["50vw", "-50vw"])
  return (
    <div ref={galleryRef} className="relative">
      <div className="flex h-screen w-screen items-center overflow-hidden">
        <motion.div
          style={{ x: containerX }}
          className={cn("deborder2 relative h-screen", "flex w-fit items-start gap-20")}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryImage
              key={index}
              src={image.src}
              startMarginTop={image.startMarginTop}
              width={image.width}
              aspect={image.aspect}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default HeroGallery

// ========================================================================
//Sub-components
// ========================================================================

const GALLERY_IMAGES = [
  {
    src: "/home/hero-gallery-1.jpeg",
    startMarginTop: 100,
    width: "w-[400px]",
    aspect: "aspect-3/4"
  },
  {
    src: "/home/hero-gallery-2.jpeg",
    startMarginTop: 200,
    width: "w-[400px]",
    aspect: "aspect-3/4"
  },
  {
    src: "/home/hero-gallery-3.png",
    startMarginTop: 300,
    width: "w-[400px]",
    aspect: "aspect-3/4"
  },
  {
    src: "/home/hero-gallery-1.jpeg",
    startMarginTop: 400,
    width: "w-[400px]",
    aspect: "aspect-3/4"
  }
] as const

function GalleryImage({ src, startMarginTop, width, aspect, progress }: TGalleryImageProps) {
  const marginTop = useTransform(progress, [0, 1], [startMarginTop, 0])

  return (
    <motion.div
      style={{ marginTop }}
      className={cn("relative shrink-0 overflow-hidden rounded-sm", width, aspect)}
    >
      <Image src={src} alt="" fill className="object-cover" />
    </motion.div>
  )
}
