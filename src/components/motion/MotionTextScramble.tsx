"use client"

import { useEffect, useState } from "react"

const SCRAMBLE_CHARS = "XYZ01&@?"
const WARMUP_TICKS = 3
const TICK_MS = 50

export type TMotionTextScrambleProps = {
  text: string
  trigger: boolean
  className?: string
}

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function scrambledFrame(text: string, revealedCount: number) {
  return text
    .split("")
    .map((char, i) => (char === " " || i < revealedCount ? char : randomChar()))
    .join("")
}

/**
 * Decodes `text` in from random characters, left to right, whenever
 * `trigger` turns true
 *
 * @param text - The real text to reveal.
 * @param trigger - Starts the scramble-in animation when true.
 * @param className - Optional class for the wrapping span.
 */
export function MotionTextScramble({ text, trigger, className }: TMotionTextScrambleProps) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return

    let tick = 0
    const interval = setInterval(() => {
      const revealedCount = Math.max(0, tick - (WARMUP_TICKS - 1))
      setDisplay(scrambledFrame(text, revealedCount))
      tick += 1
      if (revealedCount >= text.length) clearInterval(interval)
    }, TICK_MS)

    return () => {
      clearInterval(interval)
      setDisplay(text)
    }
  }, [trigger, text])

  return <span className={className}>{display}</span>
}
