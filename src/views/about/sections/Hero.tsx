import Image from "next/image"
import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

export async function Hero() {
  const { about } = await getLabels()
  const { title } = about.hero

  return (
    <div className="bg-brand-blue-950 relative">
      <Section className="relative z-10 min-h-screen items-end" fullScreen>
        <Typo.H1 text={title} className="col-span-12 md:col-span-9" />
      </Section>
      <div className="absolute inset-0 z-0">
        <Image src="/home/hero-bg.png" alt="" fill className="object-cover grayscale" />
        <div className="from-brand-blue-950/0 to-brand-blue-950 absolute inset-0 bg-gradient-to-b" />
      </div>
    </div>
  )
}
