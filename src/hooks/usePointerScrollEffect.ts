"use client"

import { useEffect, useRef } from "react"
import { useMousePosition } from "@/hooks/useMousePosition"

type TPointerScrollEffectCallback<T extends Element> = (element: T) => void

/**
 * Calls `callback` when the element matching `selector` is under the pointer,
 * including while the page is scrolling.
 *
 * @param selector - CSS selector used to identify the target element.
 * @param callback - Called with the matching element.
 */
export function usePointerScrollEffect<T extends Element>(
  selector: string,
  callback: TPointerScrollEffectCallback<T>
) {
  const { pointerPositionRef } = useMousePosition()
  const callbackRef = useRef(callback)
  const frameRef = useRef(0)

  useEffect(() => {
    callbackRef.current = callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function runHitTest(x: number, y: number) {
      const el = document.elementFromPoint(x, y)?.closest<T>(`[${selector}]`)
      if (el) callbackRef.current(el)
    }

    function handlePointerMove(event: PointerEvent) {
      runHitTest(event.clientX, event.clientY)
    }

    function handleScroll() {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        if (!pointerPositionRef.current) return
        const { x, y } = pointerPositionRef.current
        if (x < 0) return
        runHitTest(x, y)
      })
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [selector, pointerPositionRef])
}
