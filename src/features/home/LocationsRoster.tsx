"use client"

import { Typo } from "@/components/ui/brand/Typo/Typo"
import { typoVariants } from "@/components/ui/brand/Typo/Typo.styles"
import Button from "@/components/ui/Button/Button"
import { useLocationsRoot } from "@/features/home/LocationsMap"
import { TDivProps } from "@/types/components.types"
import type { TLabels } from "@/types/labels.types"
import { cn } from "@/utils"

type TCity = TLabels["homepage"]["locations"]["locationsDetails"][number]

type TLocationsRosterProps = {
  labels: readonly TCity[]
} & TDivProps

function LocationsRoster({ labels: cities, className, ...props }: TLocationsRosterProps) {
  const { activeIndex, setActiveIndex } = useLocationsRoot()
  const active = cities[activeIndex]

  return (
    <div className={cn("", className)} {...props}>
      <div className="flex flex-col justify-between">
        {cities.map((city, index) => (
          <button
            key={city.name}
            type="button"
            className={cn(
              "font-condensed text-4xl text-[clamp(2.5rem,6vw,6rem)] leading-none font-black text-balance uppercase",
              "col-span-6 w-fit text-left leading-none transition-all duration-300 ease-in-out",
              index === activeIndex
                ? "text-brand-green translate-x-10"
                : "translate-x-0 text-slate-400 hover:translate-x-10"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {city.name}
          </button>
        ))}
      </div>
      {active.address && (
        <Typo.Span
          text={active.address}
          className="mt-6 ml-auto block max-w-40 text-right text-balance underline sm:mt-20"
        />
      )}
    </div>
  )
}

export default LocationsRoster
