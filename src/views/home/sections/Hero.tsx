import { Section, SubSection } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import HeroGallery from "@/features/HeroGallery"
import { HeroAurora } from "./HeroAurora"
import { getLabels } from "@/lib/content-client"

export async function Hero() {
  const { homepage } = await getLabels()
  const LL = homepage.hero

  return (
    <Section removePadding className="flex flex-1 flex-col">
      <div
        data-aurora-scroll-root
        className="bg-brand-blue-950 deborder1 relative flex flex-col overflow-visible px-4 pt-40 contain-paint sm:px-10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="deborder2 sticky top-0 h-screen overflow-hidden">
            <HeroAurora className="h-full w-full" />
          </div>
        </div>
        <SubSection className="items-end justify-between">
          <Typo.H1 text={LL.title} />
          <Typo.P text={LL.subtitle} />
        </SubSection>
        <SubSection className="items-start justify-between">
          <Typo.H4 text={LL.caption} className="min-w-40" />
          <div className="flex flex-col">
            <Typo.H3 className="mb-20" text={LL.heading1} />
            <Typo.P className="mb-10 w-[40%] max-w-125" text={LL.paragraph1} />
            <Typo.P className="w-[40%] max-w-125 self-end" text={LL.paragraph2} />
          </div>
        </SubSection>
        <HeroGallery />
      </div>
    </Section>
  )
}
