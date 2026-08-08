export const DITHER_FILTER_ID = "services-dither"

/**
 * Invisible <svg><filter> provider — render once, then reference it from any
 * element via CSS `filter: url(#services-dither)` (e.g. Tailwind's
 * `group-hover:[filter:url(#services-dither)]`). Pure CSS/SVG, no JS/canvas —
 * works directly on a real `next/image` <img>.
 *
 * Noise-based (not ordered/Bayer) dithering: feTurbulence generates a
 * per-pixel noise field, which is added to the grayscale source before a
 * hard black/white threshold — same principle as ordered dithering (jitter
 * before thresholding breaks up flat banding into a stippled pattern), just
 * using native noise instead of a hand-built tiled matrix, which is far more
 * reliable across browsers than feImage/feTile of a custom pattern.
 */
export function DitherFilterDefs() {
  return (
    <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
      <filter id={DITHER_FILTER_ID}>
        <feColorMatrix type="saturate" values="0" result="gray" />

        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="1"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0.333 0.333 0.333 0 0  0.333 0.333 0.333 0 0  0.333 0.333 0.333 0 0  0 0 0 0 1"
          result="noiseGray"
        />
        {/* Recenter noise from [0,1] to [-0.5,0.5] — this specific range is
            what makes the threshold below luminance-preserving: a pixel at
            gray=0.3 needs noise > 0.2 (out of the ±0.5 span) to flip white,
            which happens for exactly 30% of such pixels. A wider range (this
            was ±0.7 before) skews everything darker than that. */}
        <feComponentTransfer in="noiseGray" result="noiseCentered">
          <feFuncR type="linear" slope="1.0" intercept="-0.5" />
          <feFuncG type="linear" slope="1.0" intercept="-0.5" />
          <feFuncB type="linear" slope="1.0" intercept="-0.5" />
        </feComponentTransfer>

        <feComposite
          in="gray"
          in2="noiseCentered"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="combined"
        />

        <feComponentTransfer in="combined">
          <feFuncR type="discrete" tableValues="0 1" />
          <feFuncG type="discrete" tableValues="0 1" />
          <feFuncB type="discrete" tableValues="0 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  )
}
