"use client"

import { ROUTES } from "@/constant/routes"
import { usePathname } from "next/navigation"

type TUseRoute = {
  isCurrentPage: (href: string) => boolean
}

/**
 * Provides route-related utilities based on the current pathname.
 *
 * @returns An object containing the `isCurrentPage` function.
 */
export default function useRoute(): TUseRoute {
  const pathname = usePathname()

  /**
   * Checks whether the given route is the current page or a parent route
   * of the current pathname.
   *
   * @param href - The route path to check.
   * @returns `true` if the route is currently active, otherwise `false`.
   */
  function isCurrentPage(href: string): boolean {
    if (href === ROUTES.HOME) return pathname === ROUTES.HOME
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return { isCurrentPage }
}
