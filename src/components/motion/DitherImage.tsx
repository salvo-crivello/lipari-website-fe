"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { cn } from "@/utils"
import { DITHER_FILTER_ID, DitherFilterDefs } from "./DitherFilterDefs"

export type TDitherImageProps = {
  src: string
  alt?: string
  /** Whether the dithered render is showing. Controlled — no internal hover state. */
  dithered: boolean
  className?: string
}

/**
 * Crossfades between a dithered and a normal render of the same image.
 * `filter: url(#...)` can't be smoothly transitioned by the browser — it
 * just snaps — so instead of toggling the filter on one <Image>, this
 * stacks two identical images (one filtered, one not) and animates their
 * opacity instead, which *is* smoothly animatable.
 */
export function DitherImage({ src, alt = "", dithered, className }: TDitherImageProps) {
  return (
    <div className={cn("relative", className)}>
      <DitherFilterDefs />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: dithered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale"
          style={{ filter: `url(#${DITHER_FILTER_ID})` }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: dithered ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} fill className="object-cover grayscale" />
      </motion.div>
    </div>
  )
}
