"use client"

import { useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { cn } from "@/utils"
import {
  DITHER_FRAGMENT_SHADER,
  DITHER_VERTEX_SHADER,
  TRAIL_LENGTH
} from "@/components/motion/DitherFilterDefs"

export type TDitherImageProps = {
  src: string
  alt?: string
  /** Gates the cursor interaction loop. Image is always rendered dithered either way — this only toggles interactivity. */
  dithered: boolean
  className?: string
  /** How far (CSS px, local space) the dither-boost trail reaches at full strength, right at the cursor. */
  mouseRadius?: number
  /** Grayscale levels the dither quantizes to — lower = harsher/retro, higher = finer grain. */
  colorLevels?: number
  /** Size (device px) of each dithered "pixel" block — 1 disables pixelation. */
  pixelSize?: number
  /** How long (ms) the effect takes to fade back to nothing once the cursor stops moving. */
  trailDuration?: number
  /** How long (ms) of continuous cursor movement it takes for the effect to reach full strength — mirrors trailDuration so it eases in as gradually as it eases out, instead of snapping on instantly. */
  trailAttack?: number
}

const MAX_DEVICE_PIXEL_RATIO = 2
// A trail sample's own geometric presence (ribbon shape/radius) fades out
// over this multiple of trailDuration — deliberately much longer than
// trailDuration itself so the shape never disappears before `intensity`
// (the actual perceived attack/decay curve, see the render loop) has had a
// chance to fade it out first. Multiplying two independently-fading things
// together is how the effect used to vanish almost instantly after the
// cursor stopped, regardless of how slow trailDuration was set to.
const POINT_PRESENCE_MULTIPLIER = 3
// How long since the last pointermove before the cursor counts as "stopped"
// and the effect starts decaying — must exceed normal gaps between move
// events so ordinary mouse polling doesn't flicker it in and out.
const MOVE_TIMEOUT_MS = 120

type TTrailPoint = { x: number; y: number; t: number }

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, DITHER_VERTEX_SHADER)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, DITHER_FRAGMENT_SHADER)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return null
  }

  return program
}

export function DitherImage({
  src,
  alt = "",
  dithered,
  className,
  mouseRadius = 160,
  colorLevels = 4,
  pixelSize = 2,
  trailDuration = 5000,
  trailAttack = 2000
}: TDitherImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TTrailPoint[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0, t: -Infinity }))
  )
  const trailWriteIndexRef = useRef(0)
  const lastMoveTimeRef = useRef(-Infinity)
  const dprRef = useRef(1)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = (canvas.getContext("webgl", { alpha: false }) ??
      canvas.getContext("experimental-webgl", {
        alpha: false
      })) as WebGLRenderingContext | null
    if (!gl) {
      setWebglSupported(false)
      return
    }

    const program = createProgram(gl)
    if (!program) {
      setWebglSupported(false)
      return
    }
    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const positionLocation = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    // WebGL's texture origin is bottom-left, HTML images decode top-left —
    // without this every image renders vertically flipped.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    // 1x1 opaque placeholder until the real image decodes
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255])
    )

    const uniforms = {
      uImage: gl.getUniformLocation(program, "uImage"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uImageResolution: gl.getUniformLocation(program, "uImageResolution"),
      uTrailPoints: gl.getUniformLocation(program, "uTrailPoints"),
      uTrailWeights: gl.getUniformLocation(program, "uTrailWeights"),
      uIntensity: gl.getUniformLocation(program, "uIntensity"),
      uMouseRadius: gl.getUniformLocation(program, "uMouseRadius"),
      uPixelSize: gl.getUniformLocation(program, "uPixelSize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels")
    }

    const trailPositions = new Float32Array(TRAIL_LENGTH * 2)
    const trailWeights = new Float32Array(TRAIL_LENGTH)

    let imageWidth = 1
    let imageHeight = 1
    let imageReady = false

    const image = new window.Image()
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      imageWidth = image.naturalWidth
      imageHeight = image.naturalHeight
      imageReady = true
    }
    image.src = src

    function resize() {
      dprRef.current = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
      const width = Math.round(container!.clientWidth * dprRef.current)
      const height = Math.round(container!.clientHeight * dprRef.current)
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width
        canvas!.height = height
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let animationFrame = 0
    let destroyed = false
    let intensity = 0
    let lastFrameTime = performance.now()

    function render() {
      if (destroyed) return
      animationFrame = requestAnimationFrame(render)
      if (!imageReady || canvas!.width === 0 || canvas!.height === 0) return

      const now = performance.now()
      const dt = now - lastFrameTime
      lastFrameTime = now

      // Overall strength of the effect: ramps up over trailAttack while the
      // cursor keeps moving, ramps back down over trailDuration once it
      // stops. Deliberately separate from the per-sample weights below —
      // tying the slow attack to each sample's own age meant a fast-moving
      // cursor kept overwriting samples via the ring buffer before any one
      // of them could age up on its own, so the effect never appeared while
      // actually moving, only once the cursor stopped.
      const isActive = dithered && now - lastMoveTimeRef.current < MOVE_TIMEOUT_MS
      const target = isActive ? 1 : 0
      const rampMs = target > intensity ? trailAttack : trailDuration
      const step = dt / rampMs
      intensity = target > intensity ? Math.min(1, intensity + step) : Math.max(0, intensity - step)

      // Per-sample weight here is only about the ribbon's geometric shape
      // (how far each segment reaches) — its own fade is intentionally much
      // longer than trailDuration (see POINT_PRESENCE_MULTIPLIER) so it never
      // finishes before `intensity` above does; intensity is what actually
      // governs the perceived attack/decay speed.
      // Uploaded in chronological order (oldest → newest, starting from the
      // ring buffer's next-to-overwrite slot) so the shader can connect
      // consecutive points into path segments instead of just point unions.
      const pointPresenceMs = trailDuration * POINT_PRESENCE_MULTIPLIER
      const trail = trailRef.current
      for (let k = 0; k < TRAIL_LENGTH; k++) {
        const idx = (trailWriteIndexRef.current + k) % TRAIL_LENGTH
        const point = trail[idx]
        const age = now - point.t
        const weight = age >= 0 && age < pointPresenceMs ? 1 - age / pointPresenceMs : 0
        trailWeights[k] = weight
        trailPositions[k * 2] = point.x
        trailPositions[k * 2 + 1] = canvas!.height - point.y
      }

      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer)
      gl!.vertexAttribPointer(positionLocation, 2, gl!.FLOAT, false, 0, 0)

      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, texture)
      gl!.uniform1i(uniforms.uImage, 0)
      gl!.uniform2f(uniforms.uResolution, canvas!.width, canvas!.height)
      gl!.uniform2f(uniforms.uImageResolution, imageWidth, imageHeight)
      gl!.uniform2fv(uniforms.uTrailPoints, trailPositions)
      gl!.uniform1fv(uniforms.uTrailWeights, trailWeights)
      gl!.uniform1f(uniforms.uIntensity, intensity)
      gl!.uniform1f(uniforms.uMouseRadius, mouseRadius * dprRef.current)
      gl!.uniform1f(uniforms.uPixelSize, pixelSize)
      gl!.uniform1f(uniforms.uColorLevels, colorLevels)

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }
    animationFrame = requestAnimationFrame(render)

    return () => {
      destroyed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      gl.deleteTexture(texture)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
    }
  }, [src, dithered, mouseRadius, colorLevels, pixelSize, trailDuration, trailAttack])

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !dithered) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const point = trailRef.current[trailWriteIndexRef.current]
    point.x = (event.clientX - rect.left) * dprRef.current
    point.y = (event.clientY - rect.top) * dprRef.current
    point.t = performance.now()
    lastMoveTimeRef.current = point.t
    trailWriteIndexRef.current = (trailWriteIndexRef.current + 1) % TRAIL_LENGTH
  }

  if (!webglSupported) {
    // eslint-disable-next-line @next/next/no-img-element -- WebGL-unavailable fallback, no next/image optimization needed for this edge case
    return <img src={src} alt={alt} className={cn("object-cover", className)} />
  }

  return (
    <div ref={containerRef} onPointerMove={handlePointerMove} className={cn("relative", className)}>
      <canvas ref={canvasRef} role="img" aria-label={alt} className="h-full w-full" />
    </div>
  )
}
