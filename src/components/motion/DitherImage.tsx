"use client"

import { useEffect, useRef } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { cn } from "@/utils"
import { DITHER_FILTER_ID, DitherFilterDefs } from "./DitherFilterDefs"

export type TDitherImageProps = {
  src: string
  alt?: string
  /** Gates the cursor ripple (pointer listeners + rAF loop). Image is always rendered dithered either way — this only toggles interactivity. */
  dithered: boolean
  className?: string
  /** How far (px, local space) the ripple's influence reaches from the cursor. */
  rippleRadius?: number
  /** How far feTurbulence's baseFrequency drifts from its resting value at peak intensity. */
  rippleAmplitude?: number
}

const RESTING_BASE_FREQUENCY = 0.8
const INTENSITY_LERP = 0.1
const PHASE_SPEED = 0.002
const SEED_INTERVAL_MS = 120

export function DitherImage({
  src,
  alt = "",
  dithered,
  className,
  rippleRadius = 160,
  rippleAmplitude = 0.4
}: TDitherImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)

  const pointerTargetRef = useRef({ x: -1, y: -1, active: false })
  const phaseRef = useRef(0)
  const currentIntensityRef = useRef(0)

  useEffect(() => {
    if (!dithered) return
    const container = containerRef.current
    const turbulence = turbulenceRef.current
    if (!container || !turbulence) return

    let animationFrame = 0
    let lastSeedUpdate = 0

    function tick(t: number) {
      animationFrame = requestAnimationFrame(tick)

      const { x, y, active } = pointerTargetRef.current
      // Peaks under the cursor, fades out toward rippleRadius — an SVG
      // filter can't be spatially masked to "near the cursor" on its own,
      // so this distance-based scalar is what fakes that locality.
      const centerX = container!.offsetWidth / 2
      const centerY = container!.offsetHeight / 2
      const distance = Math.hypot(x - centerX, y - centerY)
      const proximity = 1 - Math.min(distance / rippleRadius, 1)
      const target = active ? proximity : 0
      currentIntensityRef.current += (target - currentIntensityRef.current) * INTENSITY_LERP

      phaseRef.current = t * PHASE_SPEED

      const intensity = currentIntensityRef.current
      const wobble = Math.sin(phaseRef.current) * rippleAmplitude * intensity
      turbulence!.setAttribute("baseFrequency", String(RESTING_BASE_FREQUENCY + wobble))

      if (intensity > 0.01 && t - lastSeedUpdate > SEED_INTERVAL_MS) {
        lastSeedUpdate = t
        turbulence!.setAttribute("seed", String(Math.floor(phaseRef.current * 37) % 100))
      }
    }
    animationFrame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(animationFrame)
  }, [dithered, rippleAmplitude, rippleRadius])

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    pointerTargetRef.current.x = event.clientX - rect.left
    pointerTargetRef.current.y = event.clientY - rect.top
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    pointerTargetRef.current.active = true
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    pointerTargetRef.current.active = false
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative", className)}
    >
      <DitherFilterDefs turbulenceRef={turbulenceRef} />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ filter: `url(#${DITHER_FILTER_ID})` }}
      />
    </div>
  )
}
