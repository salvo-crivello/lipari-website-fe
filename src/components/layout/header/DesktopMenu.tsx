"use client"

import Button, { ButtonLink } from "@/components/ui/Button/Button"
import type { TNavItem } from "@/components/layout/header/HeaderShell.types"
import useRoute from "@/hooks/useRoute"

type TDesktopMenuProps = {
  items: TNavItem[]
  labels: string
}

export function DesktopMenu({ items, labels }: TDesktopMenuProps) {
  const { isCurrentPage } = useRoute()

  return (
    <div className="flex flex-1 items-center justify-end gap-10">
      <nav aria-label="Main" className="flex items-center gap-10">
        {items.map((item) => (
          <ButtonLink
            key={item.href}
            href={item.href}
            text={item.label}
            color="primary"
            variant="text"
            disabled={isCurrentPage(item.href)}
            className={isCurrentPage(item.href) ? "text-brand-green" : ""}
          />
        ))}
      </nav>
      <Button text={labels} />
    </div>
  )
}
