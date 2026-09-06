"use client"

import { useLayoutDebug } from "@/hooks/useLayoutDebug"
import "./debug-layout.css"

/**
 * Provides debugging utilities for layout development.
 *
 * Keyboard shortcuts:
 * - `Ctrl + Shift + D` - Toggles the layout debugger.
 * - `Ctrl + Shift + ArrowUp` - Increases the debugging depth.
 * - `Ctrl + Shift + ArrowDown` - Decreases the debugging depth.
 *
 */
export function DebugLayout() {
  useLayoutDebug()

  return null
}
