import { Section } from "@/components/layout/MainComponents"
import { MotionTextProgress } from "@/components/motion/MotionTextProgress"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { getLabels } from "@/lib/content-client"

async function Stats() {
  const { homepage } = await getLabels()
  const { eyebrow, quote, items } = homepage.stats

  return (
    <Section className="bg-brand-blue-950">
      <Typo.H4 text={eyebrow} className="col-span-4 text-slate-300 md:col-span-2" />
      <Typo.H3 text={quote} className="col-span-12 md:col-span-10 md:col-start-3 2xl:col-span-7" />

      <div className="col-span-12 mt-10 grid grid-cols-2 gap-x-10 gap-y-16 md:col-span-10 md:col-start-3 lg:mt-16 lg:grid-cols-9">
        {items.map((item) => (
          <div key={item.label} className="col-span-1 flex flex-col gap-2 lg:col-span-3">
            <MotionTextProgress
              text={item.value}
              className="text-brand-green font-mono text-6xl leading-none font-bold text-balance normal-case lg:text-[clamp(2.5rem,6vw,6rem)]"
            />
            <Typo.P text={item.label} variant={"eyebrow"} className="text-slate-300" />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Stats
