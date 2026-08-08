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
 * Tracks scroll direction/amount to drive a hide-on-scroll-down,
 * show-on-scroll-up header, plus a background toggle once scrolled past
 * the tracked element's height.
 *
 * @param elementRef - Ref to the element whose `clientHeight` is used as
 * the `showBackground` trigger threshold.
 * @returns {{showBackground, showHeader}} (`showBackground` is `true` once scrolled past `elementRef`'s
 * height) and `showHeader` (`false` after a fast scroll down, `true`
 * again after a scroll up).
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
