import { Section } from "@/components/layout/MainComponents"
import ValueShowcase from "@/features/culture-career/ValueShowcase"
import { getLabels } from "@/lib/content-client"

async function CultureValues() {
  const { cultureCareerPage } = await getLabels()
  const { values } = cultureCareerPage

  return (
    <Section className="pt-0!">
      <ValueShowcase values={values} />
    </Section>
  )
}

export default CultureValues
