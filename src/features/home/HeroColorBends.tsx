"use client"

import { useEffect, useRef } from "react"
import { Color, Mesh, Program, Renderer, Triangle } from "ogl"

// Adapted from reactbits.dev/backgrounds/ColorBends (three.js originally) —
// ported to ogl to match HeroAurora and avoid a second WebGL dependency.
// Same "fullscreen triangle + derive uv from gl_FragCoord" trick, no UV
// attribute needed on the geometry.
const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const MAX_COLORS = 8

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

#define MAX_COLORS ${MAX_COLORS}

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;

out vec4 fragColor;

void main() {
  vec2 vUv = gl_FragCoord.xy / uResolution;

  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uResolution.x / uResolution.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec2 s = q;
  vec3 sumCol = vec3(0.0);
  float totalWeight = 0.0;
  float cover = 0.0;
  for (int i = 0; i < MAX_COLORS; ++i) {
    if (i >= uColorCount) break;
    s -= 0.01;
    vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
    float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
    float kBelow = clamp(uWarpStrength, 0.0, 1.0);
    float kMix = pow(kBelow, 0.3);
    float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
    vec2 disp = (r - s) * kBelow;
    vec2 warped = s + disp * gain;
    float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
    float m = mix(m0, m1, kMix);
    float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    sumCol += uColors[i] * w;
    totalWeight += w;
    cover = max(cover, w);
  }

  // Weighted AVERAGE, not sum — summing overlapping colors blows past 1.0
  // in multiple channels at once (blue+lime alone already clip green/blue
  // to white before navy even factors in), which is why overlaps were
  // reading as white instead of a blend between the brand colors.
  vec3 col = totalWeight > 0.0001 ? sumCol / totalWeight : vec3(0.0);
  col *= uIntensity;
  float a = cover;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
  }
  col = clamp(col, 0.0, 1.0);

  // Premultiplied — matches the blendFunc(ONE, ONE_MINUS_SRC_ALPHA) set up
  // on the renderer below (same convention as HeroAurora).
  fragColor = vec4(col * a, a);
}
`

type THeroColorBendsProps = {
  className?: string
  colors?: string[]
  rotation?: number
  speed?: number
  scale?: number
  frequency?: number
  warpStrength?: number
  mouseInfluence?: number
  parallax?: number
  noise?: number
  iterations?: number
  intensity?: number
  bandWidth?: number
}

export function HeroColorBends({
  className,
  colors = ["#9BE868", "#2F54D9", "#001A29"],
  rotation = 90,
  speed = 0.2,
  scale = 0.5,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
  iterations = 1,
  intensity = 1,
  bandWidth = 6
}: THeroColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: false })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.style.backgroundColor = "transparent"

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const colorVecs = Array.from({ length: MAX_COLORS }, (_, i) =>
      i < colors.length ? Object.values(new Color(colors[i])) : [0, 0, 0]
    )
    const rotRad = (rotation * Math.PI) / 180

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: [Math.cos(rotRad), Math.sin(rotRad)] },
        uColorCount: { value: colors.length },
        uColors: { value: colorVecs },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: [0, 0] },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth }
      }
    })

    const mesh = new Mesh(gl, { geometry, program })
    container.appendChild(gl.canvas)

    function resize() {
      if (!container) return
      const { offsetWidth: width, offsetHeight: height } = container
      renderer.setSize(width, height)
      program.uniforms.uResolution.value = [width, height]
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // Target updated on pointermove, then lerped toward each frame in
    // tick() — same smoothing idiom as HeroAurora's mouse/scroll tracking.
    const pointerTarget = [0, 0]
    function handlePointerMove(event: PointerEvent) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      pointerTarget[0] = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointerTarget[1] = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    }
    window.addEventListener("pointermove", handlePointerMove)

    let animationFrame = 0
    function tick(t: number) {
      animationFrame = requestAnimationFrame(tick)
      program.uniforms.uTime.value = t * 0.001

      const pointer = program.uniforms.uPointer.value as [number, number]
      pointer[0] += (pointerTarget[0] - pointer[0]) * 0.08
      pointer[1] += (pointerTarget[1] - pointer[1]) * 0.08

      renderer.render({ scene: mesh })
    }
    animationFrame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [
    colors,
    rotation,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth
  ])

  return <div ref={containerRef} className={className} />
}
