import type { TLabels } from "@/types/labels.types"

export type TNavItem = {
  href: string
  label: string
}

export type THeaderShellProps = {
  labels: TLabels["nav"]
}
