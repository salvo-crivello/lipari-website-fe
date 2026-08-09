"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MapPin } from "lucide-react"
import { MapLibreMap, Marker, setWorkerUrl } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { locationsMapStyle } from "@/features/home/locationsMapStyle"
import type { TLabels } from "@/types/labels.types"
import { TDivProps } from "@/types/components.types"

// Turbopack breaks maplibre-gl's bundled worker (drops its sibling-file
// import, silently killing vector tile loading) — serve it as a static,
// unbundled file instead. See scripts/copy-maplibre-worker.mjs.
setWorkerUrl("/maplibre-gl/maplibre-gl-worker.mjs")

type TCity = TLabels["homepage"]["locations"]["locationsDetails"][number]

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

type TLocationsMapProps = {
  labels: readonly TCity[]
} & TDivProps

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
      center: initialCoords ? [initialCoords.lng, initialCoords.lat] : [12.9, 40.9],
      zoom: initialCoords ? 16 : 4.3,
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
      markerRootsRef.current.forEach((root) => root.unmount())
      markerRootsRef.current = []
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
      mapRef.current.flyTo({ center: [coords.lng, coords.lat], zoom: 16, duration: 800 })
    }
  }, [activeIndex, cities])

  return <div ref={containerRef} className={className} {...props} />
}

export default LocationsMap
