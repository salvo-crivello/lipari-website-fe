"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { Logo } from "@/components/ui/brand/Logo/Logo"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useHeaderShow } from "@/hooks/useHeaderShow"
import { DesktopMenu } from "@/components/layout/header/DesktopMenu"
import { MobileMenu } from "@/components/layout/header/MobileMenu"
import type { THeaderShellProps } from "@/components/layout/header/HeaderShell.types"
import { COMMON_CONFIG } from "@/constant/commonConfig"
import { cn } from "@/utils"
import Button from "@/components/ui/Button/Button"
import { Menu, X } from "lucide-react"

export function HeaderShell({ items, labels }: THeaderShellProps) {
  const { isLG } = useWindowSize()
  const headerRef = useRef<HTMLDivElement>(null)
  const { showHeader } = useHeaderShow()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.header
        ref={headerRef}
        className={cn(
          "bg-brand-blue-950 fixed inset-x-0 top-0 z-100 mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-10"
        )}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: showHeader ? "0%" : "-100%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Link
          href="/"
          aria-label={`${COMMON_CONFIG.APP_NAME} — home`}
          className="group z-100 shrink-0"
        >
          <Logo size={48} />
        </Link>

        {isLG ? (
          <DesktopMenu items={items} labels={labels} />
        ) : (
          <Button
            icon={open ? X : Menu}
            variant="ghost"
            color="primary"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-110"
          />
        )}
      </motion.header>
      <MobileMenu items={items} labels={labels} open={open} setOpen={setOpen} />
    </>
  )
}
