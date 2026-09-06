"use client"

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
   * Checks whether the given route is exactly the current pathname.
   *
   * @param href - The route path to check.
   * @returns `true` if the route is exactly the current pathname, otherwise `false`.
   */
  function isCurrentPage(href: string): boolean {
    return pathname === href
  }

  return { isCurrentPage }
}
