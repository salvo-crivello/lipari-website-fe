"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

export const useWindowSize = () => {
  const [staticHeight, setStaticHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const isMobile = useMemo(() => width < 640, [width])
  const isSM = useMemo(() => width >= 640, [width])
  const isMD = useMemo(() => width >= 768, [width])
  const isLG = useMemo(() => width >= 1024, [width])
  const isXL = useMemo(() => width >= 1280, [width])

  const isPortrait = useMemo(() => height > width && width > 640, [width, height])

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
