"use client"
import type { TNavItem } from "@/components/layout/header/HeaderShell.types"
import { EASE_CUSTOM } from "@/components/motion/motionConstant"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { typoVariants } from "@/components/ui/brand/Typo/Typo.styles"
import Button, { ButtonLink } from "@/components/ui/Button/Button"
import { ROUTES } from "@/constant/routes"
import useRoute from "@/hooks/useRoute"
import { cn } from "@/utils"
import { AnimatePresence, motion } from "motion/react"
import { Dispatch, SetStateAction, useEffect } from "react"

type TMobileMenuProps = {
  navPages: TNavItem[]
  labels: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function MobileMenu({ navPages, labels, open, setOpen }: TMobileMenuProps) {
  const { isCurrentPage } = useRoute()

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 1, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 1, y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="bg-brand-blue-950 fixed inset-0 z-90 mt-20 flex flex-col p-10 px-4 py-10 sm:grid sm:grid-cols-3 sm:px-10"
        >
          <nav
            aria-label="Main mobile"
            className="flex flex-col items-start justify-start gap-4 sm:col-span-3"
          >
            {navPages.map((item) => (
              <ButtonLink
                key={item.href}
                href={item.href}
                text={item.label}
                color="primary"
                variant="text"
                onClick={() => setOpen(false)}
                disabled={isCurrentPage(item.href)}
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  typoVariants({ variant: "sectionTitle", color: "inherit" }),
                  isCurrentPage(item.href) ? "text-brand-green ml-10" : "ml-0 hover:ml-5"
                )}
              />
            ))}
          </nav>

          <div className="border-brand-blue-400/50 mt-auto grid grid-cols-2 gap-4 border-t-2 pt-6 sm:col-span-2 sm:col-start-2 sm:mt-0 sm:pt-10 md:col-span-1 md:col-start-3">
            <Typo.P
              text="Seguici sui nostri social"
              className="text-right text-balance text-slate-300"
            />
            <div className="mt-1 flex flex-col items-end gap-4">
              {ROUTES.SOCIAL_LINKS.map((social) => (
                <ButtonLink
                  key={social.label}
                  href={social.href}
                  text={social.label}
                  variant="text"
                  color="tertiary"
                  surface="dark"
                />
              ))}
            </div>
          </div>

          <Button
            text={labels}
            onClick={() => setOpen(false)}
            variant="outline"
            color="secondary"
            className="mt-10 w-full sm:col-span-2 sm:col-start-2 sm:mt-0 md:col-span-1 md:col-start-3"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
