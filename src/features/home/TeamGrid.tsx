"use client"
import Image from "next/image"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { useWindowSize } from "@/hooks/useWindowSize"
import type { TLabels } from "@/types/labels.types"

type TTeamMember = TLabels["homepage"]["team"]["members"][number]

type TTeamGridProps = {
  labels: readonly TTeamMember[]
}

function TeamGrid({ labels: members }: TTeamGridProps) {
  const { isMobile } = useWindowSize()

  if (!isMobile) return null

  return (
    <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10">
      {members.map((member) => (
        <div key={member.name} className="flex flex-col gap-3">
          {member.photo && (
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-sm">
              <Image src={member.photo} alt={member.name} fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Typo.Span
              text={member.name}
              color="dark"
              className="font-condensed text-2xl leading-none font-black text-balance uppercase"
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

export default TeamGrid
