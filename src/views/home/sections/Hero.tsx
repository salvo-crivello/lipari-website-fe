import { Section, SubSection } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import HeroGallery from "@/features/HeroGallery"
import { HeroAurora } from "./HeroAurora"
import { getLabels } from "@/lib/content-client"

export async function Hero() {
  const { homepage } = await getLabels()
  const LL = homepage.hero

  return (
    <div data-aurora-scroll-root className="bg-brand-blue-950 contain-paint">
      <div className="absolute inset-0 -z-10">
        <div className="deborder2 sticky top-0 h-screen overflow-hidden">
          <HeroAurora className="h-full w-full" />
        </div>
      </div>

      <Section className="min-h-screen grid-rows-[1fr_auto] sm:items-end" fullScreen>
        <Typo.H1 text={LL.title} className="col-span-12 flex-1 sm:col-span-9" />
        <Typo.P
          text={LL.subtitle}
          className="col-span-8 text-right max-sm:col-start-5 sm:col-span-3"
        />
      </Section>
      <Section>
        <Typo.H4 text={LL.caption} className="col-span-4 md:col-span-2" />
        <Typo.H3
          className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
          text={LL.heading1}
        />
        <Typo.P
          className="col-span-10 max-md:col-end-13 md:col-span-5 md:col-start-3 2xl:col-span-3 2xl:col-start-4"
          text={LL.paragraph1}
        />
        <Typo.P
          className="col-span-10 max-md:col-end-13 md:col-span-5 md:col-start-8 md:row-start-3 2xl:col-span-3 2xl:col-start-7"
          text={LL.paragraph2}
        />
      </Section>
      <HeroGallery />
    </div>
  )
}
