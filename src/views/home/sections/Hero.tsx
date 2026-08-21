import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { HeroColorBends } from "@/features/home/HeroColorBends"
import HeroGallery from "@/features/home/HeroGallery"
import { getLabels } from "@/lib/content-client"

export async function Hero() {
  const { homepage } = await getLabels()
  const LL = homepage.hero

  return (
    <div className="bg-brand-blue-950 relative">
      <Section className="relative z-10 min-h-screen grid-rows-[1fr_auto] sm:items-end" fullScreen>
        <Typo.H1 text={LL.title} className="col-span-12 flex-1 sm:col-span-9" />
        <Typo.P
          text={LL.subtitle}
          className="col-span-8 text-right max-sm:col-start-5 sm:col-span-3"
          splitBy="line"
          stagger={0.1}
        />
      </Section>
      <Section className="relative z-10">
        <Typo.H4 text={LL.caption} className="col-span-4 md:col-span-2" />
        <Typo.H3
          className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
          text={LL.heading1}
          splitBy="line"
          stagger={0.1}
        />
        <Typo.P
          className="col-span-10 max-md:col-end-13 md:col-span-5 md:col-start-3 2xl:col-span-3 2xl:col-start-4"
          text={LL.paragraph1}
          splitBy="line"
          stagger={0.1}
        />
        <Typo.P
          className="col-span-10 max-md:col-end-13 md:col-span-5 md:col-start-8 md:row-start-3 2xl:col-span-3 2xl:col-start-7"
          text={LL.paragraph2}
          splitBy="line"
          stagger={0.1}
        />
      </Section>
      <HeroGallery className="z-10" />
      <div className="absolute inset-0 z-0 overflow-clip">
        <HeroColorBends className="sticky top-0 h-screen w-full" />
      </div>
    </div>
  )
}
