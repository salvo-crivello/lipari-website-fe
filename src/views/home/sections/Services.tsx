import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ButtonLink } from "@/components/ui/Button/Button"
import { getLabels } from "@/lib/content-client"
import { ROUTES } from "@/constant/routes"
import ServicesAccordion from "@/features/home/ServicesAccordion"

async function Services() {
  const { homepage } = await getLabels()
  const { eyebrow, title, description, cta, services } = homepage.services

  return (
    <Section className="overflow-x-clip">
      <Typo.H4 text={eyebrow} color="dark" className="col-span-4 text-slate-500 md:col-span-2" />
      <Typo.H2
        color="dark"
        text={title}
        className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
      />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-6 lg:col-end-13 2xl:col-span-4 2xl:col-end-12"
        splitBy="line"
        stagger={0.1}
      />
      <ServicesAccordion labels={services} />
      <ButtonLink
        href={ROUTES.SERVICES}
        text={cta}
        color="tertiary"
        variant="fill"
        surface={"light"}
        className="col-span-12 mt-10 justify-self-start lg:col-span-7 lg:col-start-7 lg:justify-self-end"
      />
    </Section>
  )
}

export default Services
