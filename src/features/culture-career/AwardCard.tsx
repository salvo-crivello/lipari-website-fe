import Image from "next/image"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsCultureCareerpageAwardsItems } from "@/types/labels.types"

type TAwardCardProps = {
  award: TLabelsCultureCareerpageAwardsItems
}

function AwardCard({ award }: TAwardCardProps) {
  return (
    <div className="group flex flex-col gap-10 rounded-md border-2 border-slate-700 px-8 py-10">
      <div className="relative h-33">
        <Image
          src={award.image}
          alt=""
          fill
          className="object-contain object-left mix-blend-luminosity transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={award.image}
          alt=""
          fill
          aria-hidden
          className="object-contain object-left opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Typo.H4 text={award.years} color="light" />
        <div>
          <Typo.Span
            text={award.title}
            color="brand"
            variant={"sectionSubTitle"}
            className="text-2xl!"
          />
          <Typo.P text={award.subtitle} color="light" />
        </div>
      </div>
    </div>
  )
}

export default AwardCard
