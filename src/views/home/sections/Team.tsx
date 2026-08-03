import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import TeamGrid from "@/features/home/TeamGrid"
import TeamRoster from "@/features/home/TeamRoster"
import { getLabels } from "@/lib/content-client"

async function Team() {
  const { homepage } = await getLabels()
  const { eyebrow, title, description, members } = homepage.team

  return (
    <Section>
      <Typo.H4 text={eyebrow} color="dark" className="col-span-4 md:col-span-2" />
      <Typo.H2
        color="dark"
        text={title}
        className="col-span-12 md:col-span-10 2xl:col-span-9 2xl:col-start-4"
      />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-6 lg:col-end-13 2xl:col-span-4 2xl:col-end-12"
      />
      <TeamGrid members={members} />
      <TeamRoster members={members} />
    </Section>
  )
}

export default Team
