import { Typo } from "@/components/ui/brand/Typo/Typo"
import type { TLabelsHomepageTeamMembers } from "@/types/labels.types"
import Image from "next/image"

type TLeadersBoardGridProps = {
  labels: readonly TLabelsHomepageTeamMembers[]
}

export default function LeadersBoardGrid({ labels: members }: TLeadersBoardGridProps) {
  return (
    <div className="col-span-12 mt-20 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
      {members.map((member) => (
        <div key={member.name} className="flex flex-col gap-3">
          {member.photo && (
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-sm">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="@container flex flex-col gap-1">
            <Typo.Span
              text={member.name}
              color="dark"
              className="font-condensed text-2xl leading-none font-black text-balance uppercase md:text-[clamp(2rem,10cqw,20rem)]"
            />
            {member.role && (
              <Typo.Span
                text={member.role}
                color="dark"
                variant="eyebrow"
                className="text-slate-500"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
