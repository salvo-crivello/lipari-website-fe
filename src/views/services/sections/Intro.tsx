import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

async function Intro() {
  const { servicesPage } = await getLabels()
  const { eyebrow, statement, paragraph1, paragraph2 } = servicesPage.intro

  return (
    <Section>
      <Typo.H4 text={eyebrow} color="dark" className="col-span-4 md:col-span-2" />
      <Typo.H3
        color="dark"
        text={statement}
        className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
        splitBy="line"
        stagger={0.1}
      />
      <Typo.P
        color="dark"
        text={paragraph1}
        className="col-span-10 col-end-13 md:col-span-4 md:col-end-9 lg:col-end-8"
        splitBy="line"
        stagger={0.1}
      />
      <Typo.P
        color="dark"
        text={paragraph2}
        className="col-span-10 col-end-13 md:col-span-4 md:col-start-9 lg:col-start-9"
        splitBy="line"
        stagger={0.1}
      />
    </Section>
  )
}

export default Intro
