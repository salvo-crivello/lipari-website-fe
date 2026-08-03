"use client"

import { RefObject, useEffect, useRef } from "react"

type TPointerPosition = { x: number; y: number }

type TUseMousePosition = {
  pointerPositionRef: RefObject<TPointerPosition>
}
/**
 * Tracks the latest pointer position without triggering a re-render on
 * every move — read `.current` inside an effect or callback, not render.
 *
 * @returns pointerPositionRef, a ref holding the current pointer coordinates.
 */

export function useMousePosition(): TUseMousePosition {
  const pointerPositionRef = useRef<TPointerPosition>({ x: -1, y: -1 })

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointerPositionRef.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  return { pointerPositionRef }
}
