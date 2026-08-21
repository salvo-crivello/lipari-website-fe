"use client"

import { motion } from "motion/react"
import LipariLogo, { LIPARI_LOGO_RATIO } from "@/assets/svg/LipariLogo"

const LOGO_WIDTH = 64

export default function Loading() {
  return (
    <div
      className="bg-brand-blue-950 flex flex-1 items-center justify-center py-32"
      role="status"
      aria-live="polite"
    >
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <LipariLogo
          width={LOGO_WIDTH}
          height={LOGO_WIDTH * LIPARI_LOGO_RATIO}
          className="text-brand-green"
        />
      </motion.div>
      <span className="sr-only">Caricamento…</span>
    </div>
  )
}
