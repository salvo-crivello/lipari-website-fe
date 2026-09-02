import { Main } from "@/components/layout/MainComponents"
import { Hero } from "@/views/culture-career/sections/Hero"
import Intro from "./sections/Intro"
import CultureValues from "./sections/CultureValues"
import Awards from "./sections/Awards"
import OpenPositions from "./sections/OpenPositions"
import ContactCta from "./sections/ContactCta"

export function CultureCareerPage() {
  return (
    <Main>
      <Hero />
      <Intro />
      <CultureValues />
      <Awards />
      <OpenPositions />
      <ContactCta />
    </Main>
  )
}
