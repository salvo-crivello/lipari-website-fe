import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import LocationsMap, { LocationsRoot } from "@/features/home/LocationsMap"
import LocationsRoster from "@/features/home/LocationsRoster"
import { getLabels } from "@/lib/content-client"

async function Locations() {
  const { homepage } = await getLabels()
  const { eyebrow, description, locationsDetails } = homepage.locations

  return (
    <Section className="bg-brand-blue-950 relative overflow-hidden">
      <LocationsRoot>
        <Typo.H4 text={eyebrow} className="col-span-4 text-slate-500 md:col-span-2" />
        <Typo.P
          text={description}
          className="col-span-10 col-end-13 md:col-span-8 md:col-end-13 lg:col-span-6 lg:col-end-13 2xl:col-span-4 2xl:col-end-12"
        />

        <LocationsRoster
          labels={locationsDetails}
          className="col-span-12 max-sm:mt-10 md:col-span-4"
        />
        <LocationsMap
          labels={locationsDetails}
          className="col-span-12 h-full min-h-100 w-full rounded-lg md:col-span-8"
        />
      </LocationsRoot>
    </Section>
  )
}

export default Locations
