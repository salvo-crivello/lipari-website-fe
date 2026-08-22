"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MapPin } from "lucide-react"
import { MapLibreMap, Marker, setWorkerUrl } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { locationsMapStyle } from "@/features/home/locationsMapStyle"
import { COMMON_CONFIG } from "@/constant/commonConfig"
import type { TLabelsHomepageLocationsDetails } from "@/types/labels.types"
import { TDivProps } from "@/types/components.types"

// Turbopack rompe il worker di maplibre-gl (bug del bundler), la mappa
// resta vuota senza errori. Fix: serviamo il worker come file statico,
// non bundlato — vedi scripts/copy-maplibre-worker.mjs.
setWorkerUrl("/maplibre-gl/maplibre-gl-worker.mjs")

// ========================================================================
// LocationsRoot
// ========================================================================

type TLocationsRootContext = {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

const LocationsRootContext = createContext<TLocationsRootContext>({
  activeIndex: 0,
  setActiveIndex: () => {}
})

export const useLocationsRoot = () => useContext(LocationsRootContext)

type TLocationsRootProps = {
  children: ReactNode
  defaultActiveIndex?: number
}

/**
 * Root container that coordinates the active city between the map and the roster.
 */
export function LocationsRoot({ children, defaultActiveIndex = 0 }: TLocationsRootProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

  return (
    <LocationsRootContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </LocationsRootContext.Provider>
  )
}

// ========================================================================
// LocationsMap
// ========================================================================

type TLocationsMapProps = {
  labels: readonly TLabelsHomepageLocationsDetails[]
} & TDivProps

/**
 * Interactive map displaying the locations of the cities.
 */
function LocationsMap({ labels: cities, className, ...props }: TLocationsMapProps) {
  const { activeIndex, setActiveIndex } = useLocationsRoot()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const markerRootsRef = useRef<Root[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const initialCoords = cities[activeIndex]?.position

    const map = new MapLibreMap({
      container: containerRef.current,
      style: locationsMapStyle,
      center: initialCoords
        ? [initialCoords.lng, initialCoords.lat]
        : COMMON_CONFIG.MAP_DEFAULT_CENTER,
      zoom: initialCoords ? COMMON_CONFIG.MAP_CITY_ZOOM : COMMON_CONFIG.MAP_OVERVIEW_ZOOM,
      attributionControl: { compact: true }
    })
    mapRef.current = map

    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(containerRef.current)

    markersRef.current = cities.flatMap((city, index) => {
      const coords = city.position
      if (!coords) return []

      const el = document.createElement("button")
      el.type = "button"
      el.setAttribute("aria-label", city.name)
      el.className = "text-brand-blue-400 cursor-pointer transition-colors"
      el.addEventListener("click", () => setActiveIndex(index))

      const root = createRoot(el)
      root.render(<MapPin className="h-8 w-8" fill="currentColor" strokeWidth={1.5} />)
      markerRootsRef.current.push(root)

      const marker = new Marker({ element: el, anchor: "bottom" })
        .setLngLat([coords.lng, coords.lat])
        .addTo(map)

      return [marker]
    })

    return () => {
      resizeObserver.disconnect()
      markersRef.current.forEach((marker) => marker.remove())

      // Deferred: unmounting a nested createRoot synchronously here can race
      // with React's own in-progress render of the outer tree, triggering
      // "Attempted to synchronously unmount a root while React was already
      // rendering". Unmount after the current render/commit has settled.
      const rootsToUnmount = markerRootsRef.current
      markerRootsRef.current = []
      queueMicrotask(() => rootsToUnmount.forEach((root) => root.unmount()))

      map.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities])

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const el = marker.getElement()
      el.classList.toggle("text-brand-green", index === activeIndex)
      el.classList.toggle("text-brand-blue-400", index !== activeIndex)
    })

    const coords = cities[activeIndex]?.position
    if (coords && mapRef.current) {
      mapRef.current.flyTo({
        center: [coords.lng, coords.lat],
        zoom: COMMON_CONFIG.MAP_CITY_ZOOM,
        duration: COMMON_CONFIG.MAP_FLY_TO_DURATION_MS
      })
    }
  }, [activeIndex, cities])

  return <div ref={containerRef} className={className} {...props} />
}

export default LocationsMap
