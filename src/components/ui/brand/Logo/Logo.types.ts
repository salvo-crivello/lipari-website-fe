import type { ReactNode } from "react"

export type TLogoProps = {
  size?: number
  className?: string
}

export type TLogoLayerProps = {
  order: number
  className?: string
  frontClassName?: string
  backClassName?: string
  frontChildren?: ReactNode
  backChildren?: ReactNode
}
