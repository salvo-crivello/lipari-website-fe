"use client"

import { useEffect, useRef } from "react"
import { Color, Mesh, Program, Renderer, Triangle } from "ogl"

// Adapted from reactbits.dev/backgrounds/aurora (ogl-based, no react-reconciler —
// sidesteps the R3F v8 / Next 16 Turbopack incompatibility documented in the
// git history of this file's predecessor, HeroBackground3D.tsx).
const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Simplex 2D noise (Ashima Arts, public domain) drives the aurora ripple.
const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform vec2 uMouse;
uniform float uScrollProgress;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Scroll drifts the noise domain and lifts amplitude a little; the cursor
  // adds a soft local bump — both kept subtle ("leggero"), not a full
  // distortion effect.
  float scrollDrift = uScrollProgress * 0.8;
  float scrollAmplitude = uAmplitude * (1.0 + uScrollProgress * 0.35);
  float mouseDist = uv.x - uMouse.x;
  float mouseBump = exp(-mouseDist * mouseDist * 40.0) * (1.0 - uMouse.y) * 0.35;

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1 + scrollDrift, uTime * 0.25)) * 0.5 * scrollAmplitude;
  height += mouseBump;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

type THeroAuroraProps = {
  className?: string
  colorStops?: [string, string, string]
  amplitude?: number
  blend?: number
  speed?: number
}

export function HeroAurora({
  className,
  colorStops = ["#2F54D9", "#9BE868", "#001A29"],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.6
}: THeroAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.style.backgroundColor = "transparent"

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map((hex) => Object.values(new Color(hex))) },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend: { value: blend },
        uMouse: { value: [0.5, 0.5] },
        uScrollProgress: { value: 0 }
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

    // Targets updated on events, then lerped toward each frame in tick() —
    // keeps the mouse/scroll reaction smooth instead of snapping to the raw
    // input signal.
    const mouseTarget = [0.5, 0.5]
    function handlePointerMove(event: PointerEvent) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseTarget[0] = (event.clientX - rect.left) / rect.width
      mouseTarget[1] = 1 - (event.clientY - rect.top) / rect.height
    }
    window.addEventListener("pointermove", handlePointerMove)

    const scrollRoot = container.closest<HTMLElement>("[data-aurora-scroll-root]")
    let scrollTarget = 0
    function handleScroll() {
      if (!scrollRoot) return
      const rect = scrollRoot.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      scrollTarget = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    let animationFrame = 0
    function tick(t: number) {
      animationFrame = requestAnimationFrame(tick)
      program.uniforms.uTime.value = t * 0.01 * speed * 0.1

      const mouse = program.uniforms.uMouse.value as [number, number]
      mouse[0] += (mouseTarget[0] - mouse[0]) * 0.05
      mouse[1] += (mouseTarget[1] - mouse[1]) * 0.05

      program.uniforms.uScrollProgress.value +=
        (scrollTarget - program.uniforms.uScrollProgress.value) * 0.05

      renderer.render({ scene: mesh })
    }
    animationFrame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("scroll", handleScroll)
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [amplitude, blend, speed, colorStops])

  return <div ref={containerRef} className={className} />
}
