import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsServicespagePillars } from "@/types/labels.types"
import { BrandImage } from "@/components/ui/brand/BrandImage/BrandImage"
import { SeparatorHorizontal } from "lucide-react"

type TPillarShowcaseProps = {
  pillar: TLabelsServicespagePillars
  index: number
}

function PillarShowcase({ pillar, index }: TPillarShowcaseProps) {
  const isImageFirst = index % 2 === 1

  const image = (
    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-sm lg:w-113">
      <BrandImage src={pillar.image} alt="" />
    </div>
  )

  return (
    <>
      <div className="col-span-12 flex flex-col gap-10 py-20 lg:flex-row lg:items-start lg:gap-20">
        {isImageFirst && image}
        <Typo.H4 text={pillar.eyebrow} color="dark" className="w-[141px] shrink-0" />
        <div className="flex flex-1 flex-col gap-10 lg:gap-36">
          <Typo.H2 text={pillar.title} color="dark" />
          <Typo.P text={pillar.description} color="dark" splitBy="line" stagger={0.1} />
        </div>
        {!isImageFirst && image}
      </div>
      {!isImageFirst && <div className="col-span-12 h-1 w-full! bg-slate-200" />}
    </>
  )
}

export default PillarShowcase
