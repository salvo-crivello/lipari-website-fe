"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { COMMON_CONFIG } from "@/constant/commonConfig"

export const useWindowSize = () => {
  const [staticHeight, setStaticHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const isMobile = useMemo(() => width < COMMON_CONFIG.BREAKPOINT_SM, [width])
  const isSM = useMemo(() => width >= COMMON_CONFIG.BREAKPOINT_SM, [width])
  const isMD = useMemo(() => width >= COMMON_CONFIG.BREAKPOINT_MD, [width])
  const isLG = useMemo(() => width >= COMMON_CONFIG.BREAKPOINT_LG, [width])
  const isXL = useMemo(() => width >= COMMON_CONFIG.BREAKPOINT_XL, [width])

  const isPortrait = useMemo(
    () => height > width && width > COMMON_CONFIG.BREAKPOINT_SM,
    [width, height]
  )

  const handleWindowResize = useCallback(() => {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight

    setWidth(newWidth)
    setHeight(newHeight)

    // Set only once, if not already set
    setStaticHeight((prev) => (prev === 0 ? newHeight : prev))
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleWindowResize() // First run
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [handleWindowResize])

  return {
    width,
    height,
    staticHeight,
    isMobile,
    isSM,
    isMD,
    isLG,
    isXL,
    isPortrait
  }
}
