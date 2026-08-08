import Image from "next/image"
import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import LocationsRoster from "@/features/home/LocationsRoster"
import { getLabels } from "@/lib/content-client"

async function Locations() {
  const { homepage } = await getLabels()
  const { eyebrow, description, cities } = homepage.locations

  return (
    <Section className="bg-brand-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/home/locations-bg.png" alt="" fill className="object-cover opacity-40" />
        <div className="from-brand-blue-950 via-brand-blue-950/60 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <Typo.H4 text={eyebrow} className="col-span-4 text-slate-500 md:col-span-2" />
      <Typo.P
        text={description}
        className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-6 lg:col-end-13 2xl:col-span-4 2xl:col-end-12"
      />

      <LocationsRoster labels={cities} />
    </Section>
  )
}

export default Locations
