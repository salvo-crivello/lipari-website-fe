"use client"

import { useLayoutDebug } from "@/hooks/useLayoutDebug"
import "./debug-layout.css"

export function DebugLayout() {
  useLayoutDebug()

  return null
}
