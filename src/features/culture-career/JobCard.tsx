"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Tag } from "@/components/ui/Tag/Tag"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ROUTES } from "@/constant/routes"
import { cn } from "@/utils"

type TJobCardProps = {
  slug: string
  title: string
  locations: readonly string[]
  tags: readonly string[]
  closed: boolean
}

function JobCard({ slug, title, locations, tags, closed }: TJobCardProps) {
  return (
    <Link
      href={closed ? {} : `${ROUTES.CULTURE_CAREER}/${slug}`}
      aria-label={`Vai a ${title}`}
      aria-disabled={closed}
      onClick={(event) => closed && (event.preventDefault(), event.stopPropagation())}
      className={cn(
        "group relative flex min-h-80 flex-col gap-3 overflow-hidden rounded-md border-2 px-4 pt-4 pb-6 transition-colors",
        {
          "cursor-pointer border-slate-200 bg-slate-200 hover:border-slate-300 hover:bg-slate-300":
            !closed,
          "cursor-default border-slate-300": closed
        }
      )}
    >
      {closed && (
        <div className="absolute top-0 right-0 flex h-12 items-end justify-center rounded-tr-sm rounded-bl-sm bg-rose-400 px-4 pt-1 pb-2">
          <Typo.Span
            text="Closed"
            className="font-condensed text-xl leading-none font-bold text-rose-950 uppercase"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Typo.Span
          text={locations.join(" · ")}
          color="dark"
          variant={"eyebrow"}
          className="mr-10 text-xs text-slate-500"
        />
        <div
          className={cn(
            "bg-brand-blue flex size-9 shrink-0 items-center justify-center rounded-full text-slate-50 transition-all",
            !closed && "group-hover:scale-110 group-hover:rotate-45",
            closed && "opacity-0"
          )}
        >
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 max-sm:mt-2">
        <Typo.Span
          text={title}
          color="dark"
          className="font-condensed text-2xl leading-none font-bold uppercase lg:text-3xl"
        />
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default JobCard
