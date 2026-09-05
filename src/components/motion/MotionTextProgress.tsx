"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

export type TMotionTextProgressProps = {
  text: string
  className?: string
  duration?: number
}

/**
 * Counts up from 0 to the final number in `text` once it scrolls into
 * view (runs once); any trailing suffix (e.g. "+", "%") stays static.
 */
export function MotionTextProgress({ text, className, duration = 1.5 }: TMotionTextProgressProps) {
  const match = text.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ""

  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView || target === null) return
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(Math.round(value))
    })
    return () => controls.stop()
  }, [isInView, target, duration])

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
