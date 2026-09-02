"use client"

import { Plus } from "lucide-react"
import { ButtonLink } from "@/components/ui/Button/Button"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ROUTES } from "@/constant/routes"
import type { TJob } from "@/types/jobs.types"
import { cn } from "@/utils"

type TJobCardProps = {
  job: TJob
}

function JobCard({ job }: TJobCardProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-80 flex-col gap-3 overflow-hidden rounded-md border-2 px-4 pt-4 pb-6",
        {
          "border-slate-200 bg-slate-200": !job.closed,
          "border-slate-300": job.closed
        }
      )}
    >
      {job.closed && (
        <div className="absolute top-0 right-0 flex h-12 items-end justify-center rounded-tr-sm rounded-bl-sm bg-rose-400 px-4 pt-1 pb-2">
          <Typo.Span
            text="Closed"
            className="font-condensed text-xl leading-none font-bold text-rose-950 uppercase"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Typo.Span text={job.locations.join(" / ")} color="dark" variant={"eyebrow"} />
        <ButtonLink
          href={`${ROUTES.CULTURE_CAREER}/${job.slug}`}
          icon={Plus}
          aria-label={`Vai a ${job.title}`}
          variant="fill"
          color="primary"
          surface="light"
          size="sm"
          disabled={job.closed}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6">
        <Typo.Span
          text={job.title}
          color="dark"
          className="font-condensed text-2xl leading-none font-bold uppercase lg:text-3xl"
        />
        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-3 py-1 font-mono text-xs text-slate-900 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobCard
