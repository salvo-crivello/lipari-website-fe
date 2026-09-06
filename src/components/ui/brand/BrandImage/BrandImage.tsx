"use client"

import { useState } from "react"
import Image from "next/image"
import type { TBrandImageProps } from "./BrandImage.types"
import { cn } from "@/utils"

const PLACEHOLDER = "/images/placeholder.jpeg"
const DEFAULT_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

export function BrandImage({
  src = PLACEHOLDER,
  alt = "",
  className,
  sizes = DEFAULT_SIZES
}: TBrandImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <>
      {hasError ? (
        <div className="absolute inset-0 bg-slate-200" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("relative z-0 object-cover grayscale", className)}
          onError={() => setHasError(true)}
        />
      )}
      <div className="bg-brand-green pointer-events-none absolute inset-0 mix-blend-multiply" />
    </>
  )
}
