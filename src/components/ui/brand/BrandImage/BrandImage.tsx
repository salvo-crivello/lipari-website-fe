import Image from "next/image"
import type { TBrandImageProps } from "./BrandImage.types"

export function BrandImage({ src, alt = "", className }: TBrandImageProps) {
  return (
    <>
      <Image src={src} alt={alt} fill className={className ?? "object-cover grayscale"} />
      <div className="bg-brand-green pointer-events-none absolute inset-0 mix-blend-multiply" />
    </>
  )
}
