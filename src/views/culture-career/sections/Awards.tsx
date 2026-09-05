import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import AwardsCarousel from "@/features/culture-career/AwardsCarousel"
import { getLabels } from "@/lib/content-client"

async function Awards() {
  const { cultureCareerPage } = await getLabels()
  const { eyebrow, items } = cultureCareerPage.awards

  return (
    <Section className="bg-brand-blue-950 py-30!" removePadding>
      <Typo.H4
        text={eyebrow}
        color="light"
        className="max-w-80px col-span-6 px-4 text-slate-300 sm:px-10 md:col-span-3"
      />
      <AwardsCarousel items={items} />
    </Section>
  )
}

export default Awards
