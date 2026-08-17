"use client"

import { useCallback, useEffect, useState } from "react"
import { COMMON_CONFIG } from "@/constant/commonConfig"

type TUseLayoutDebugReturn = {
  enabled: boolean
  depth: number
  toggle: () => void
  increaseDepth: () => void
  decreaseDepth: () => void
}

/**
 * Calculates the nesting depth of an element relative to the document body.
 *
 * @param element - The element to calculate the depth for.
 * @returns The element's nesting depth.
 */
function getElementDepth(element: HTMLElement): number {
  let depth = 0
  let current: HTMLElement | null = element

  while (current && current !== document.body) {
    depth++
    current = current.parentElement
  }

  return depth
}

/**
 * Updates the debug attributes applied to layout elements.
 *
 * @param enabled - Whether the debugger is enabled.
 * @param maxDepth - Maximum nesting depth to highlight.
 */
function updateDebugLevels(enabled: boolean, maxDepth: number) {
  const elements = document.body.querySelectorAll<HTMLElement>("*")

  elements.forEach((element) => {
    if (!COMMON_CONFIG.LAYOUT_DEBUG_TAGS.has(element.tagName)) return

    if (!enabled) {
      element.removeAttribute(COMMON_CONFIG.LAYOUT_DEBUG_ATTRIBUTE)
      return
    }

    const depth = getElementDepth(element)
    if (depth <= maxDepth) {
      element.setAttribute(COMMON_CONFIG.LAYOUT_DEBUG_ATTRIBUTE, String(depth))
    } else {
      element.removeAttribute(COMMON_CONFIG.LAYOUT_DEBUG_ATTRIBUTE)
    }
  })

  document.body.dataset.debug = enabled ? "true" : "false"
  document.body.dataset.debugDepth = String(maxDepth)
}

/**
 * Provides layout debugging utilities for development.
 *
 * Keyboard shortcuts:
 * - `Ctrl + Shift + D` - Toggles the layout debugger.
 * - `Ctrl + Shift + ArrowUp` - Increases the debugging depth.
 * - `Ctrl + Shift + ArrowDown` - Decreases the debugging depth.
 *
 * @returns An object containing:
 * - `enabled` - `true` when the layout debugger is enabled, otherwise `false`.
 * - `depth` - The current maximum nesting depth being highlighted.
 * - `toggle` - Toggles the layout debugger on or off.
 * - `increaseDepth` - Increases the maximum nesting depth.
 * - `decreaseDepth` - Decreases the maximum nesting depth.
 */
export const useLayoutDebug = (): TUseLayoutDebugReturn => {
  const [enabled, setEnabled] = useState(false)
  const [depth, setDepth] = useState(2)

  const toggle = useCallback(() => setEnabled((current) => !current), [])
  const increaseDepth = useCallback(
    () => setDepth((current) => Math.min(current + 1, COMMON_CONFIG.LAYOUT_DEBUG_MAX_DEPTH)),
    []
  )
  const decreaseDepth = useCallback(
    () => setDepth((current) => Math.max(current - 1, COMMON_CONFIG.LAYOUT_DEBUG_MIN_DEPTH)),
    []
  )

  useEffect(() => {
    updateDebugLevels(enabled, depth)

    if (!enabled) return

    const observer = new MutationObserver(() => updateDebugLevels(true, depth))
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      updateDebugLevels(false, depth)
    }
  }, [enabled, depth])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!event.ctrlKey || !event.shiftKey) return

      switch (event.key) {
        case "D":
        case "d":
          event.preventDefault()
          toggle()
          break
        case "ArrowUp":
          event.preventDefault()
          increaseDepth()
          break
        case "ArrowDown":
          event.preventDefault()
          decreaseDepth()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggle, increaseDepth, decreaseDepth])

  return { enabled, depth, toggle, increaseDepth, decreaseDepth }
}
