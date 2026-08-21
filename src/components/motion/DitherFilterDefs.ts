/**
 * GLSL shader source for the WebGL dither effect (see `DitherImage.tsx`).
 *
 * Ordered (Bayer 4x4) dithering + grayscale quantization + pixelation,
 * sampling the real source image as a texture — the per-fragment
 * equivalent of what the previous SVG-filter version faked with a global
 * `feTurbulence` `baseFrequency` wobble. `uTrailPoints`/`uTrailWeights`
 * (TRAIL_LENGTH must match `DitherImage.tsx`'s own `TRAIL_LENGTH` constant)
 * carry a short history of recent cursor positions, each aging/shrinking
 * independently, so the effect reads as a trail that tapers behind the
 * cursor and fades on its own once it stops moving.
 */

export const DITHER_VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

export const TRAIL_LENGTH = 8

export const DITHER_FRAGMENT_SHADER = `
precision mediump float;

#define TRAIL_LENGTH ${TRAIL_LENGTH}
#define TRAIL_SEGMENTS (TRAIL_LENGTH - 1)

varying vec2 vUv;

uniform sampler2D uImage;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform vec2 uTrailPoints[TRAIL_LENGTH];
uniform float uTrailWeights[TRAIL_LENGTH];
uniform float uIntensity;
uniform float uMouseRadius;
uniform float uPixelSize;
uniform float uColorLevels;

// Classic 4x4 Bayer ordered-dither matrix, normalized to 0..1. GLSL ES
// 1.00 doesn't allow indexing a non-constant array reliably across all
// hardware, so this is a plain lookup via an early-return chain.
float bayerThreshold(vec2 fragCoord) {
  int x = int(mod(fragCoord.x, 4.0));
  int y = int(mod(fragCoord.y, 4.0));
  int index = x + y * 4;

  if (index == 0) return 0.0 / 16.0;
  if (index == 1) return 8.0 / 16.0;
  if (index == 2) return 2.0 / 16.0;
  if (index == 3) return 10.0 / 16.0;
  if (index == 4) return 12.0 / 16.0;
  if (index == 5) return 4.0 / 16.0;
  if (index == 6) return 14.0 / 16.0;
  if (index == 7) return 6.0 / 16.0;
  if (index == 8) return 3.0 / 16.0;
  if (index == 9) return 11.0 / 16.0;
  if (index == 10) return 1.0 / 16.0;
  if (index == 11) return 9.0 / 16.0;
  if (index == 12) return 15.0 / 16.0;
  if (index == 13) return 7.0 / 16.0;
  if (index == 14) return 13.0 / 16.0;
  return 5.0 / 16.0;
}

// Distance from p to the segment a-b — tracing the cursor's actual recent
// path as a ribbon instead of unioning circles at each sample point, which
// still reads as roughly one blob (near-circular) whenever samples land
// close together, i.e. any ordinary slow hover.
float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
  return length(pa - ba * h);
}

// Maps vUv (canvas space) into the image's own UV space the way CSS
// object-fit: cover would — crops instead of stretching.
vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
  vec2 s = resolution / imageResolution;
  float scale = max(s.x, s.y);
  vec2 scaledSize = imageResolution * scale;
  vec2 offset = (resolution - scaledSize) * 0.5;
  return (uv * resolution - offset) / scaledSize;
}

void main() {
  vec2 uv = coverUv(vUv, uResolution, uImageResolution);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 pixelatedUv = floor(uv * uResolution / uPixelSize) * uPixelSize / uResolution;
  vec3 color = texture2D(uImage, pixelatedUv).rgb;
  float gray = dot(color, vec3(0.299, 0.587, 0.114));

  // Ribbon along the cursor's recent path (uTrailPoints[0] oldest ..
  // [TRAIL_LENGTH-1] newest, uploaded in that chronological order by
  // DitherImage.tsx) — each segment's radius follows its endpoints' own
  // fade-in/fade-out weight, so the shape tapers at both the leading and
  // trailing end instead of unioning same-size circles into one blob.
  float proximity = 0.0;
  for (int i = 0; i < TRAIL_SEGMENTS; i++) {
    float w0 = uTrailWeights[i];
    float w1 = uTrailWeights[i + 1];
    float w = max(w0, w1);
    if (w <= 0.0) continue;
    float r = uMouseRadius * w;
    float d = distToSegment(gl_FragCoord.xy, uTrailPoints[i], uTrailPoints[i + 1]);
    float p = (1.0 - smoothstep(0.0, r, d)) * w;
    proximity = max(proximity, p);
  }

  // Darkens toward the cursor at a FIXED level count — denser black dither
  // dots, monotonically darker only. Varying uColorLevels itself (an earlier
  // approach) caused visible concentric banding rings wherever the level
  // count crossed an integer boundary; darkening gray before a constant
  // quantization step avoids that artifact entirely. uIntensity is the slow
  // global attack/decay envelope (see DitherImage.tsx) — proximity alone
  // only shapes the ribbon, it doesn't control how strong it is right now.
  gray -= proximity * uIntensity * 0.3;
  gray = clamp(gray, 0.0, 1.0);

  float threshold = bayerThreshold(gl_FragCoord.xy);
  float quantized = floor(gray * uColorLevels + threshold) / uColorLevels;

  gl_FragColor = vec4(vec3(clamp(quantized, 0.0, 1.0)), 1.0);
}
`
