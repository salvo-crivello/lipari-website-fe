import type { ExpressionSpecification, StyleSpecification } from "maplibre-gl"

/**
 * Same layer structure/detail as OpenFreeMap's "dark" preset (landcover,
 * landuse, water, buildings, full road hierarchy, boundaries, place
 * labels — ported from https://tiles.openfreemap.org/styles/dark, fetched
 * and inspected directly since there's no style-diffing tool) — repainted
 * with this project's brand-blue scale (`app/globals.css`) instead of the
 * preset's neutral grays. No sprite/icons anywhere (place-label dots,
 * one-way arrows) and no text halos — matches the brand's Snazzy Maps
 * source design (Google Maps JS API format, hand-ported since there's no
 * automated converter to MapLibre's style spec): labels.icon off,
 * labels.text.stroke off.
 */

const BRAND_BLUE = {
  100: "#e5e7f1",
  300: "#94a3db",
  400: "#647dd7",
  500: "#2f54d9",
  600: "#1a4cbd",
  700: "#0e4597",
  800: "#06396d",
  900: "#012641",
  950: "#001a29"
} as const

const LAND = BRAND_BLUE[900]
const WATER = BRAND_BLUE[950]
const LABEL = "#888790"

const NO_HALO = { "text-halo-width": 0 } as const
const nameField = (): ExpressionSpecification => [
  "coalesce",
  ["get", "name:latin"],
  ["get", "name_en"],
  ["get", "name"]
]

export const locationsMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet"
    }
  },
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  layers: [
    { id: "background", type: "background", paint: { "background-color": LAND } },
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      minzoom: 10,
      filter: ["==", ["get", "class"], "wood"],
      paint: { "fill-color": BRAND_BLUE[800], "fill-opacity": 0.3 }
    },
    {
      id: "landuse_park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "park"],
      paint: { "fill-color": BRAND_BLUE[800], "fill-opacity": 0.25 }
    },
    {
      id: "landuse_residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      maxzoom: 9,
      filter: ["==", ["get", "class"], "residential"],
      paint: { "fill-color": BRAND_BLUE[800], "fill-opacity": 0.15 }
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["!=", ["get", "brunnel"], "tunnel"],
      paint: { "fill-color": WATER }
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      paint: { "line-color": BRAND_BLUE[800] }
    },
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 12,
      paint: { "fill-color": BRAND_BLUE[800], "fill-outline-color": LAND }
    },
    {
      id: "road_area_pier",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "pier"],
      paint: { "fill-color": LAND }
    },
    {
      id: "highway_path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["path", "track"]]],
      paint: { "line-color": BRAND_BLUE[800], "line-width": 1 }
    },
    {
      id: "highway_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 8,
      filter: ["in", ["get", "class"], ["literal", ["minor", "service"]]],
      paint: {
        "line-color": BRAND_BLUE[700],
        "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 10, 1, 20, 12]
      }
    },
    {
      id: "highway_major_casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 11,
      filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "tertiary", "trunk"]]],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": LAND,
        "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 10, 3, 20, 23]
      }
    },
    {
      id: "highway_major_inner",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 11,
      filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "tertiary", "trunk"]]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": BRAND_BLUE[500],
        "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 10, 2, 20, 20]
      }
    },
    {
      id: "highway_major_subtle",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      maxzoom: 11,
      filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "tertiary", "trunk"]]],
      paint: { "line-color": BRAND_BLUE[500], "line-width": 1 }
    },
    {
      id: "highway_motorway_casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 6,
      filter: ["==", ["get", "class"], "motorway"],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": LAND,
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 5.8, 0, 6, 3, 20, 40]
      }
    },
    {
      id: "highway_motorway_inner",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 6,
      filter: ["==", ["get", "class"], "motorway"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": BRAND_BLUE[400],
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 4, 2, 6, 1.3, 20, 30]
      }
    },
    {
      id: "highway_motorway_subtle",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      maxzoom: 6,
      filter: ["==", ["get", "class"], "motorway"],
      paint: { "line-color": BRAND_BLUE[400], "line-width": 1 }
    },
    {
      id: "railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      filter: ["==", ["get", "class"], "rail"],
      paint: {
        "line-color": BRAND_BLUE[600],
        "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 16, 1, 20, 4]
      }
    },
    {
      id: "highway_name_major",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary"]]],
      layout: {
        "symbol-placement": "line",
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 11
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "highway_name_minor",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      filter: ["!", ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary"]]]],
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 10
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "boundary_state",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: ["==", ["get", "admin_level"], 4],
      paint: {
        "line-color": BRAND_BLUE[700],
        "line-dasharray": [2, 1],
        "line-opacity": 0.6,
        "line-width": 1
      }
    },
    {
      id: "boundary_country",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: ["==", ["get", "admin_level"], 2],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": BRAND_BLUE[300],
        "line-width": ["interpolate", ["exponential", 1.1], ["zoom"], 3, 1, 22, 12]
      }
    },
    {
      id: "water_name",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      layout: {
        "symbol-placement": "line",
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 11
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "place_village",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 14,
      filter: ["in", ["get", "class"], ["literal", ["village", "suburb"]]],
      layout: {
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
        "text-transform": "uppercase"
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "place_town",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 15,
      filter: ["==", ["get", "class"], "town"],
      layout: {
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-transform": "uppercase"
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "place_city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 14,
      filter: ["==", ["get", "class"], "city"],
      layout: {
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 14,
        "text-transform": "uppercase"
      },
      paint: { "text-color": BRAND_BLUE[100], ...NO_HALO }
    },
    {
      id: "place_state",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 4,
      maxzoom: 8,
      filter: ["==", ["get", "class"], "state"],
      layout: {
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": 11,
        "text-transform": "uppercase"
      },
      paint: { "text-color": LABEL, ...NO_HALO }
    },
    {
      id: "place_country",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 6,
      filter: ["==", ["get", "class"], "country"],
      layout: {
        "text-field": nameField(),
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["exponential", 1.4], ["zoom"], 0, 10, 4, 14],
        "text-transform": "uppercase"
      },
      paint: { "text-color": BRAND_BLUE[100], ...NO_HALO }
    }
  ]
}
