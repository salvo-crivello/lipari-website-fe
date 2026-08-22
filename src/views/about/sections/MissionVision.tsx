import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

async function MissionVision() {
  const { about } = await getLabels()
  const { eyebrow, missionTitle, missionText, visionTitle, visionText } = about.missionVision

  return (
    <Section>
      <Typo.H4
        text={eyebrow}
        color="dark"
        className="col-span-6 text-slate-500 md:col-span-3 md:col-start-10 md:text-right lg:col-span-2 lg:col-start-11"
      />

      <Typo.H2 color="dark" text={missionTitle} className="col-span-12" />
      <Typo.P
        color="dark"
        text={missionText}
        className="col-span-10 md:col-span-8 lg:col-span-5 2xl:col-span-4"
        splitBy="line"
        stagger={0.1}
      />

      <Typo.H2
        color="dark"
        text={visionTitle}
        className="col-span-10 col-start-2 mt-10 md:col-span-9 md:col-start-4 lg:col-span-6 lg:col-start-7 lg:mt-auto"
      />
      <Typo.P
        color="dark"
        text={visionText}
        className="col-span-10 col-end-13 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8 2xl:col-span-4 2xl:col-start-8"
        splitBy="line"
        stagger={0.1}
      />
    </Section>
  )
}

export default MissionVision
