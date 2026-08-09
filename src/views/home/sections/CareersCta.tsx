import Image from "next/image"
import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ButtonLink } from "@/components/ui/Button/Button"
import { getLabels } from "@/lib/content-client"
import { ROUTES } from "@/constant/routes"

async function CareersCta() {
  const { homepage } = await getLabels()
  const { eyebrow, title, cta } = homepage.careersCta

  return (
    <Section className="bg-slate-200">
      <Typo.H4 text={eyebrow} color="dark" className="col-span-6 text-slate-500 lg:col-span-2" />

      <div className="col-span-12 flex flex-col items-start justify-between gap-10 lg:col-span-5">
        <Typo.H3 color="dark" text={title} />
        <ButtonLink
          href={ROUTES.CULTURE_CAREER}
          text={cta}
          color="tertiary"
          surface="light"
          variant="fill"
          className="max-sm:w-full"
        />
      </div>

      <div className="relative col-span-12 mt-10 aspect-square overflow-hidden rounded-md lg:col-span-4 lg:col-start-9 lg:mt-0 2xl:aspect-4/3">
        <Image src="/home/careers-cta.png" alt="" fill className="object-cover" />

        <div className="bg-brand-green absolute inset-0 mix-blend-multiply" />
      </div>
    </Section>
  )
}

export default CareersCta
