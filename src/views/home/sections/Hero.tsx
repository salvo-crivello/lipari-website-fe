import { Section } from "@/components/layout/MainComponents"
import Button from "@/components/ui/Button/Button"
import Image from "next/image"

export function Hero() {
  return (
    <Section>
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/home/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mb-10 flex items-end justify-between max-sm:flex-col">
        <h1 className="font-condensed max-w-5xl text-6xl leading-none font-bold text-balance text-slate-50 uppercase lg:text-8xl">
          Dalla consulenza on-demand ai progetti end-to-end
        </h1>
        <p className="w-60 text-xl font-medium text-balance text-slate-50">
          Supportiamo le aziende con soluzioni tecnologiche e organizzative che generano valore
          reale.
        </p>
      </div>
      <div className="col-auto grid">
        <Button text="button" />
        <Button text="button" variant="secondary" />
      </div>
    </Section>
  )
}
