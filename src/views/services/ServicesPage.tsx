import { Main } from "@/components/layout/MainComponents"
import { Hero } from "@/views/services/sections/Hero"
import Intro from "./sections/Intro"
import Pillars from "./sections/Pillars"
import GammaDiServizi from "./sections/GammaDiServizi"
import ContactCta from "./sections/ContactCta"

export function ServicesPage() {
  return (
    <Main>
      <Hero />
      <Intro />
      <Pillars />
      <GammaDiServizi />
      <ContactCta />
    </Main>
  )
}
