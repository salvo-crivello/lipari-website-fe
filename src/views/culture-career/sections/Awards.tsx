import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import AwardCard from "@/features/culture-career/AwardCard"
import { getLabels } from "@/lib/content-client"

async function Awards() {
  const { cultureCareerPage } = await getLabels()
  const { eyebrow, items } = cultureCareerPage.awards

  return (
    <Section className="bg-brand-blue-950 py-30!">
      <Typo.H4 text={eyebrow} color="light" className="col-span-12" />
      <div className="col-span-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((award) => (
          <AwardCard key={`${award.title}-${award.subtitle}`} award={award} />
        ))}
      </div>
    </Section>
  )
}

export default Awards
