import { Main } from "@/components/layout/MainComponents"
import { Hero } from "@/views/about/sections/Hero"
import Intro from "./sections/Intro"
import MissionVision from "./sections/MissionVision"
import Timeline from "./sections/Timeline"
import ContactCta from "./sections/ContactCta"
import LeadersBoard from "./sections/LeadersBoard"

export function AboutPage() {
  return (
    <Main>
      <Hero />
      <Intro />
      <MissionVision />
      <Timeline />
      <LeadersBoard />
      <ContactCta />
    </Main>
  )
}
