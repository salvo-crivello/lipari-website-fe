import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

async function Intro() {
  const { cultureCareerPage } = await getLabels()
  const { eyebrow, statement, paragraph } = cultureCareerPage.intro

  return (
    <Section>
      <Typo.H4 text={eyebrow} color="dark" className="col-span-4 text-slate-500 md:col-span-2" />
      <Typo.H3
        color="dark"
        text={statement}
        className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
        splitBy="line"
        stagger={0.1}
      />
      <Typo.P
        color="dark"
        text={paragraph}
        className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-3 lg:col-end-13 2xl:col-span-3 2xl:col-end-12"
        splitBy="line"
        stagger={0.1}
      />
    </Section>
  )
}

export default Intro
