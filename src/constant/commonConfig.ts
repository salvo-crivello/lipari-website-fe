export abstract class COMMON_CONFIG {
  public static readonly APP_NAME = "Lipari Consulting"

  // Layout debug (hooks/useLayoutDebug.ts)
  public static readonly LAYOUT_DEBUG_MIN_DEPTH = 1
  public static readonly LAYOUT_DEBUG_MAX_DEPTH = 8
  public static readonly LAYOUT_DEBUG_ATTRIBUTE = "data-debug-level"
  public static readonly LAYOUT_DEBUG_TAGS = new Set([
    "DIV",
    "SECTION",
    "ARTICLE",
    "MAIN",
    "HEADER",
    "FOOTER",
    "NAV",
    "ASIDE",
    "FORM",
    "UL",
    "OL",
    "LI"
  ])

  // Responsive breakpoints (hooks/useWindowSize.ts)
  public static readonly BREAKPOINT_SM = 640
  public static readonly BREAKPOINT_MD = 768
  public static readonly BREAKPOINT_LG = 1024
  public static readonly BREAKPOINT_XL = 1280

  // Header scroll show/hide sensitivity (hooks/useHeaderShow.ts)
  public static readonly HEADER_SCROLL_HIDE_THRESHOLD = 50
  public static readonly HEADER_SCROLL_SHOW_THRESHOLD = 30

  // Locations map behavior (features/home/LocationsMap.tsx)
  public static readonly MAP_DEFAULT_CENTER: [number, number] = [12.9, 40.9]
  public static readonly MAP_CITY_ZOOM = 16
  public static readonly MAP_OVERVIEW_ZOOM = 4.3
  public static readonly MAP_FLY_TO_DURATION_MS = 800
}
