"use client"

import clsx from "clsx"
import { motion, useInView, type Variants } from "motion/react"
import { useMemo, useRef } from "react"

export type TMotionTextSplitProps = {
  animateNow?: boolean
  delay?: number
  text: string
  className?: string
  splitBy?: "word" | "letter"
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
      transition: { ease: "easeIn", duration: 0.3 }
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
      transition: { ease: "easeIn", duration: 0.3 }
    },
    visible: {
      y: "0%",
      clipPath: "inset(0% 0 0 0)",
      transition: { ease: "easeOut", duration: 0.3 }
    }
  }
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
    margin: "50% 0px -10% 0px",
    amount: 0.1
  })

  const startAnimation = useMemo(
    () => (animateNow === undefined ? defaultInView : animateNow),
    [animateNow, defaultInView]
  )

  const lines = whiteSpacePreLine ? text.split("\n") : [text.replace(/\n/g, " ")]
  const selectedChild = childVariants[direction]

  const containerMotionVariants = {
    hidden: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
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
      className={clsx(className)}
    >
      {lines.map((line, lineIndex) => {
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
      })}
    </motion.span>
  )
}
