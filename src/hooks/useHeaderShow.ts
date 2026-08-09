import { isNotNullOrUndefined } from "@/utils"
import { useEffect, useState, useRef, RefObject } from "react"

type TUseHeaderShowProps = {
  elementRef?: RefObject<HTMLDivElement> | null
}

type TUseHeaderShowReturn = {
  showBackground: boolean
  showHeader: boolean
}

/**
 * Controls header visibility and background based on scroll position.
 *
 * @param elementRef - Optional ref used as the background trigger threshold.
 * @returns An object containing:
 * - `showBackground` - `true` when the page has scrolled past the element height, otherwise `false`.
 * - `showHeader` - `true` when the header should be visible, otherwise `false`.
 */
export const useHeaderShow = ({ elementRef }: TUseHeaderShowProps = {}): TUseHeaderShowReturn => {
  const [showBackground, setShowBackground] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const yOldRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (isNotNullOrUndefined(elementRef) && isNotNullOrUndefined(elementRef.current)) {
        const triggerHeight = elementRef.current.clientHeight
        setShowBackground(scrollY > triggerHeight)
      }

      const yOld = yOldRef.current
      const scrollQty = Math.abs(scrollY - yOld)
      const scrollWay = scrollY > yOld ? "down" : "up"

      if (scrollQty > 50 && scrollWay === "down") {
        setShowHeader(false)
      } else if (scrollQty > 30 && scrollWay === "up") {
        setShowHeader(true)
      }

      if (scrollQty > 50) {
        yOldRef.current = scrollY
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [elementRef])

  return { showBackground, showHeader }
}
