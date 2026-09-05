import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import JobCard from "@/features/culture-career/JobCard"
import { getJobs, getLabels } from "@/lib/content-client"

async function OpenPositions() {
  const [{ cultureCareerPage }, jobs] = await Promise.all([getLabels(), getJobs()])
  const { eyebrow, title, description } = cultureCareerPage.openPositions

  return (
    <Section>
      <Typo.H4
        text={eyebrow}
        color="dark"
        className="col-span-4 text-slate-500 md:col-span-2 md:col-end-13 md:text-right"
      />
      <Typo.H2 text={title} color="dark" className="col-span-12 md:col-span-9" />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-4 md:col-end-11"
        splitBy="line"
        stagger={0.1}
      />

      <div className="col-span-12 mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.slug}
            slug={job.slug}
            title={job.title}
            locations={job.locations}
            tags={job.tags}
            closed={job.closed}
          />
        ))}
      </div>
    </Section>
  )
}

export default OpenPositions
