import type { CSSProperties } from "react"
import LipariLogo, { LIPARI_LOGO_RATIO, LipariLogoType } from "@/assets/svg/LipariLogo"
import { cn } from "@/utils"

import type { TLogoProps, TLogoLayerProps } from "./Logo.types"

export function Logo({ size = 80, className }: TLogoProps) {
  const iconWidth = size * 0.4
  const iconHeight = iconWidth * LIPARI_LOGO_RATIO

  return (
    <div className={cn("perspective-[600px]", className)} style={{ width: size, height: size }}>
      <div className="relative h-full w-full transition-transform duration-1000 ease-in-out transform-3d group-hover:transform-[rotateY(180deg)_rotateZ(90deg)]">
        <LogoLayer
          order={0}
          className="transform-[translateZ(30px)]"
          frontClassName="bg-brand-blue-950 text-brand-green flex items-center justify-center"
          backClassName="bg-brand-blue-900"
          frontChildren={<LipariLogo width={iconWidth} height={iconHeight} />}
        />

        <LogoLayer
          order={1}
          className="transform-[translateZ(20px)]"
          frontClassName="bg-brand-green"
          backClassName="bg-brand-green-800"
        />

        <LogoLayer
          order={2}
          className="transform-[translateZ(10px)]"
          frontClassName="bg-brand-green-800"
          backClassName="bg-brand-green"
        />

        <LogoLayer
          order={3}
          className="transform-[rotateZ(270deg)]"
          frontClassName="bg-brand-blue-900"
          backClassName="bg-brand-blue-950 flex justify-end p-2 pb-3"
          backChildren={<LipariLogoType size={size} className="text-slate-50" />}
        />
      </div>
    </div>
  )
}

// =============================================================================================
// LogoLayer: a single layer of the Logo stack, with front/back faces and a z-index
// =============================================================================================

function LogoLayer({
  order,
  className,
  frontClassName,
  backClassName,
  frontChildren,
  backChildren
}: TLogoLayerProps) {
  const zIndex: CSSProperties["zIndex"] = 30 - order * 10

  return (
    <div className={cn("absolute inset-0 transform-3d", className)} style={{ zIndex }}>
      <div className={cn("absolute inset-0 rounded-sm backface-hidden", frontClassName)}>
        {frontChildren}
      </div>
      <div
        className={cn(
          "absolute inset-0 transform-[rotateY(180deg)] rounded-sm backface-hidden",
          backClassName
        )}
      >
        {backChildren}
      </div>
    </div>
  )
}
