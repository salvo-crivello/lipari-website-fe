import Image from "next/image"
import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

export async function Hero() {
  const { servicesPage } = await getLabels()
  const { title } = servicesPage.hero

  return (
    <div className="bg-brand-blue-950 relative">
      <Section className="relative z-10 min-h-screen items-end" fullScreen>
        <Typo.H1 text={title} className="col-span-12 md:col-span-9" />
      </Section>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/placeholder-hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="from-brand-green/20 to-brand-blue-950 absolute inset-0 bg-gradient-to-b" />
      </div>
    </div>
  )
}
