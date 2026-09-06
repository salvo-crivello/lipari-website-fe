import Image from "next/image"
import { Typo } from "@/components/ui/brand/Typo/Typo"

type TAwardCardProps = {
  image: string
  years: string
  title: string
  subtitle: string
}

function AwardCard({ image, years, title, subtitle }: TAwardCardProps) {
  return (
    <div className="group flex flex-col gap-10 rounded-md border-2 border-slate-700 px-8 py-10">
      <div className="relative h-33">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain object-left mix-blend-luminosity transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          aria-hidden
          className="object-contain object-left opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Typo.H4 text={years} color="light" className="text-xs!" />
        <div>
          <Typo.Span text={title} color="brand" variant={"sectionSubTitle"} className="text-2xl!" />
          <Typo.P text={subtitle} color="light" />
        </div>
      </div>
    </div>
  )
}

export default AwardCard
