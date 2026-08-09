import { Main } from "@/components/layout/MainComponents"
import { Hero } from "@/views/home/sections/Hero"
import Methods from "./sections/Methods"
import Services from "./sections/Services"
import Stats from "./sections/Stats"
import Team from "./sections/Team"
import CareersCta from "./sections/CareersCta"
import Locations from "./sections/Locations"
import ContactCta from "./sections/ContactCta"

export function HomePage() {
  return (
    <Main>
      <Hero />
      <Methods />
      <Services />
      <Stats />
      <Team />
      <CareersCta />
      <Locations />
      <ContactCta />
    </Main>
  )
}
