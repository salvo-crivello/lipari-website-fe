"use client"

import { ROUTES } from "@/constant/routes"
import { usePathname } from "next/navigation"

type TUseRoute = {
  isCurrentPage: (href: string) => boolean
}

/**
 * Checks whether `href` matches the current route.
 * `/` requires an exact match (it would otherwise match every route);
 * any other path also matches its nested routes (e.g. `/services`
 * stays active on `/services/[slug]`).
 *
 * @returns `true` if `href` is (or is a parent of) the current route.
 */

export default function useRoute(): TUseRoute {
  const pathname = usePathname()

  function isCurrentPage(href: string): boolean {
    console.log("pathname", { pathname, href })
    if (href === ROUTES.HOME) return pathname === ROUTES.HOME
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return { isCurrentPage }
}
