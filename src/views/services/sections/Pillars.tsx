import { Section } from "@/components/layout/MainComponents"
import PillarShowcase from "@/features/services/PillarShowcase"
import { getLabels } from "@/lib/content-client"

async function Pillars() {
  const { servicesPage } = await getLabels()
  const { pillars } = servicesPage

  return (
    <Section>
      {pillars.map((pillar, index) => (
        <PillarShowcase
          key={pillar.title}
          eyebrow={pillar.eyebrow}
          title={pillar.title}
          image={pillar.image}
          description={pillar.description}
          index={index}
        />
      ))}
    </Section>
  )
}

export default Pillars
