"use client"

import { useState } from "react"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabels } from "@/types/labels.types"
import { cn } from "@/utils"

type TCity = TLabels["homepage"]["locations"]["cities"][number]

type TLocationsRosterProps = {
  labels: readonly TCity[]
}

function LocationsRoster({ labels: cities }: TLocationsRosterProps) {
  const defaultIndex = Math.max(
    cities.findIndex((city) => city.address),
    0
  )
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const active = cities[activeIndex]

  return (
    <div className="col-span-12 mt-10 lg:mt-16">
      <div className="flex flex-col">
        {cities.map((city, index) => (
          <button
            key={city.name}
            type="button"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            className="w-fit text-left"
          >
            <Typo.Span
              text={city.name}
              className={cn(
                "font-condensed text-5xl leading-none font-bold uppercase transition-colors lg:text-7xl 2xl:text-8xl",
                index === activeIndex ? "text-brand-green" : "text-slate-600"
              )}
            />
          </button>
        ))}
      </div>
      {active.address && <Typo.Span text={active.address} className="mt-6 block underline" />}
    </div>
  )
}

export default LocationsRoster
