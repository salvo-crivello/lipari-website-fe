import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import TimelineGallery from "@/features/about/TimelineGallery"
import { getLabels } from "@/lib/content-client"

async function Timeline() {
  const { about } = await getLabels()
  const { eyebrow, items } = about.timeline

  return (
    <Section>
      <Typo.H4 text={eyebrow} color="dark" className="col-span-6 text-slate-500 md:col-span-3" />
      <TimelineGallery labels={items} />
    </Section>
  )
}

export default Timeline
