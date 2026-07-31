import { Main } from "@/components/layout/MainComponents"
import { Hero } from "@/views/home/sections/Hero"
import Methods from "./sections/Methods"

export function HomePage() {
  return (
    <Main>
      <Hero />
      <Methods />
    </Main>
  )
}
