"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { useRef } from "react"
import { Logo } from "@/components/ui/brand/Logo/Logo"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useHeaderShow } from "@/hooks/useHeaderShow"
import { DesktopMenu } from "@/components/layout/header/DesktopMenu"
import { MobileMenu } from "@/components/layout/header/MobileMenu"
import type { TNavItem } from "@/components/layout/header/HeaderShell.types"
import { cn } from "@/utils"

type THeaderShellProps = {
  items: TNavItem[]
  labels: string
}

export function HeaderShell({ items, labels }: THeaderShellProps) {
  const { isLG } = useWindowSize()
  const headerRef = useRef<HTMLDivElement>(null)
  const { showHeader } = useHeaderShow()

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        "bg-brand-blue-950 fixed inset-x-0 top-0 z-100 mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-10"
      )}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: showHeader ? "0%" : "-100%", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Link href="/" aria-label="Lipari Consulting — home" className="group z-100 shrink-0">
        <Logo size={48} />
      </Link>

      {isLG ? (
        <DesktopMenu items={items} labels={labels} />
      ) : (
        <MobileMenu items={items} labels={labels} />
      )}
    </motion.header>
  )
}
