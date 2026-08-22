import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import LeadersBoardGrid from "@/features/about/LeadersBoardGrid"
import { getLabels } from "@/lib/content-client"

async function LeadersBoard() {
  const { about, homepage } = await getLabels()
  const { eyebrow, title, description } = about.leaders
  const { members } = homepage.team

  return (
    <Section>
      <Typo.H4
        text={eyebrow}
        color="dark"
        className="col-span-4 text-slate-500 lg:col-span-3 2xl:col-span-2"
      />
      <Typo.H2 color="dark" text={title} className="col-span-12 lg:col-span-6 lg:col-start-1" />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-6 lg:col-end-13 2xl:col-span-4 2xl:col-end-12"
        splitBy="line"
        stagger={0.1}
      />
      <LeadersBoardGrid labels={members} />
    </Section>
  )
}

export default LeadersBoard
