"use client"

import clsx from "clsx"
import { motion, useInView, type Variants } from "motion/react"
import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react"

export type TMotionTextSplitProps = {
  animateNow?: boolean
  delay?: number
  text: string
  className?: string
  splitBy?: "word" | "letter" | "line"
  whiteSpacePreLine?: boolean
  direction?: "up" | "down"
  stagger?: number
  accentWords?: string[]
  accentWordsClassName?: string
}

const childVariants: Record<"up" | "down", Variants> = {
  up: {
    hidden: {
      y: "50%",
      clipPath: "inset(0 0 100% 0)",
      transition: { duration: 0 }
    },
    visible: {
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      transition: { ease: "easeOut", duration: 0.3 }
    }
  },
  down: {
    hidden: {
      y: "-100%",
      clipPath: "inset(100% 0 0 0)",
      transition: { duration: 0 }
    },
    visible: {
      y: "0%",
      clipPath: "inset(0% 0 0 0)",
      transition: { ease: "easeOut", duration: 0.3 }
    }
  }
}

const measurerStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  visibility: "hidden",
  pointerEvents: "none"
}

function useMeasuredLines(text: string, enabled: boolean) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<string[]>([text])

  useLayoutEffect(() => {
    if (!enabled) return

    const container = measureRef.current
    if (!container) return

    const wordEls = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-word]"))

    const measure = () => {
      const groups: string[][] = []
      let lastTop: number | null = null

      wordEls.forEach((el) => {
        const top = el.offsetTop
        if (lastTop === null || top !== lastTop) {
          groups.push([])
          lastTop = top
        }
        groups[groups.length - 1].push(el.textContent ?? "")
      })

      setLines(groups.map((words) => words.join("")))
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [text, enabled])

  return { measureRef, lines }
}

export const MotionTextSplit = ({
  animateNow,
  delay = 0,
  text,
  className = "",
  splitBy = "word",
  whiteSpacePreLine = true,
  direction = "up",
  stagger = 0.03,
  accentWords,
  accentWordsClassName
}: TMotionTextSplitProps) => {
  const childRef = useRef<HTMLSpanElement>(null)

  const defaultInView = useInView(childRef, {
    margin: "50% 0px 0px 0px",
    amount: 0.1
  })

  const startAnimation = useMemo(
    () => (animateNow === undefined ? defaultInView : animateNow),
    [animateNow, defaultInView]
  )

  const flatText = text.replace(/\n/g, " ")
  const { measureRef, lines: measuredLines } = useMeasuredLines(flatText, splitBy === "line")

  const lines =
    splitBy === "line"
      ? measuredLines
      : whiteSpacePreLine
        ? text.split("\n")
        : [text.replace(/\n/g, " ")]
  const selectedChild = childVariants[direction]

  const containerMotionVariants = {
    hidden: {
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    },
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  return (
    <motion.span
      variants={containerMotionVariants}
      initial="hidden"
      animate={startAnimation ? "visible" : "hidden"}
      className={clsx(splitBy === "line" ? "relative block" : undefined, className)}
    >
      {splitBy === "line" && (
        <span ref={measureRef} style={measurerStyle} aria-hidden="true">
          {flatText.split(" ").map((word, i) => (
            <span key={i} data-word>
              {word}{" "}
            </span>
          ))}
        </span>
      )}

      {splitBy === "line" ? (
        <span ref={childRef}>
          {lines.map((line, lineIndex) => (
            <motion.span
              key={lineIndex}
              variants={selectedChild}
              className="block p-0 text-wrap will-change-[clip-path,transform]"
            >
              {line}
            </motion.span>
          ))}
        </span>
      ) : (
        lines.map((line, lineIndex) => {
          const lineChunks = splitBy === "letter" ? [...line] : line.split(" ")

          return (
            <span ref={childRef} key={lineIndex} className="block">
              {lineChunks.map((chunk, i) => {
                const content = splitBy === "word" ? chunk + " " : chunk

                const isAccent = accentWords?.some(
                  (word) => word.toLowerCase() === chunk.toLowerCase()
                )

                return (
                  <motion.span
                    key={`${lineIndex}-${i}`}
                    variants={selectedChild}
                    className={clsx(
                      "inline-block p-0 will-change-[clip-path,transform]",
                      splitBy === "word" ? "whitespace-pre" : undefined,
                      isAccent ? accentWordsClassName : undefined
                    )}
                    style={{
                      width: splitBy === "letter" && chunk === " " ? "0.2em" : "auto"
                    }}
                  >
                    {content}
                  </motion.span>
                )
              })}
            </span>
          )
        })
      )}
    </motion.span>
  )
}
