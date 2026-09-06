"use client"

import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import AwardCard from "@/features/culture-career/AwardCard"
import type { TLabelsCultureCareerpageAwardsItems } from "@/types/labels.types"

type TAwardsCarouselProps = {
  items: readonly TLabelsCultureCareerpageAwardsItems[]
}

function AwardsCarousel({ items }: TAwardsCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })
  ])

  return (
    <div className="col-span-12 overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((award) => (
          <div
            key={`${award.title}-${award.subtitle}`}
            className="min-w-0 shrink-0 grow-0 basis-full pr-6 max-sm:max-w-[80vw] sm:basis-1/2 lg:basis-1/4"
          >
            <AwardCard
              image={award.image}
              years={award.years}
              title={award.title}
              subtitle={award.subtitle}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AwardsCarousel
