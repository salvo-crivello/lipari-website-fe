import { Section } from "@/components/layout/MainComponents"
import PillarShowcase from "@/features/services/PillarShowcase"
import { getLabels } from "@/lib/content-client"

async function Pillars() {
  const { servicesPage } = await getLabels()
  const { pillars } = servicesPage

  return (
    <Section>
      {pillars.map((pillar, index) => (
        <PillarShowcase key={pillar.title} pillar={pillar} index={index} />
      ))}
    </Section>
  )
}

export default Pillars
