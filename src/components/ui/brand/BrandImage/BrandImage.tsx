"use client"

import { useState } from "react"
import Image from "next/image"
import type { TBrandImageProps } from "./BrandImage.types"

export function BrandImage({ src, alt = "", className }: TBrandImageProps) {
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
          className={className ?? "object-cover grayscale"}
          onError={() => setHasError(true)}
        />
      )}
      <div className="bg-brand-green pointer-events-none absolute inset-0 mix-blend-multiply" />
    </>
  )
}
