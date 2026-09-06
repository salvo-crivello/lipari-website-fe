import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import ServicesRowList from "@/features/services/ServicesRowList"
import { getLabels } from "@/lib/content-client"

async function GammaDiServizi() {
  const { servicesPage, homepage } = await getLabels()
  const { title } = servicesPage.gammaDiServizi
  const { description, services } = homepage.services

  return (
    <Section>
      <Typo.H2 color="dark" text={title} className="col-span-12 md:col-span-8 2xl:col-span-7" />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-4 md:col-end-13 2xl:col-span-3 2xl:col-end-13"
        splitBy="line"
        stagger={0.1}
      />
      <ServicesRowList services={services} />
    </Section>
  )
}

export default GammaDiServizi
