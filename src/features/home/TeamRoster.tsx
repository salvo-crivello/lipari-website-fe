"use client"

import { useState } from "react"
import Image from "next/image"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { usePointerScrollEffect } from "@/hooks/usePointerScrollEffect"
import { cn } from "@/utils"
import { useWindowSize } from "@/hooks/useWindowSize"
import type { TLabels } from "@/types/labels.types"

type TTeamMember = TLabels["homepage"]["team"]["members"][number]

type TTeamRosterProps = {
  labels: readonly TTeamMember[]
}

const DATA_SELECTOR = "data-member-index" as const

function TeamRoster({ labels: members }: TTeamRosterProps) {
  const { isMobile } = useWindowSize()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = members[activeIndex]
  usePointerScrollEffect<HTMLElement>(DATA_SELECTOR, hoverEffect)

  function hoverEffect(el: HTMLElement) {
    const index = Number(el.dataset.memberIndex)
    setActiveIndex((current) => (current === index ? current : index))
  }

  if (isMobile) return null

  return (
    <div className="relative col-span-12 grid grid-cols-12">
      <ul className="relative col-span-12 grid grid-cols-12 py-20">
        {members.map((member, index) => (
          <li
            key={member.name}
            {...{ [DATA_SELECTOR]: index }}
            onFocus={() => setActiveIndex(index)}
            className="z-10 col-span-12 mb-2 grid grid-cols-12 gap-4 last:mb-0"
          >
            <Typo.Span
              text={member.role}
              color="dark"
              className={cn(
                "col-span-2 mt-1 max-2xl:text-sm",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
              variant={"eyebrow"}
            />
            <button
              type="button"
              className={cn(
                "font-condensed text-4xl text-[clamp(2.5rem,6vw,6rem)] leading-none font-black text-balance uppercase",
                "col-span-6 w-fit text-left leading-none transition-all duration-300 ease-in-out",

                index === activeIndex
                  ? "text-brand-blue-950 translate-x-10"
                  : "translate-x-0 text-slate-400"
              )}
            >
              {member.name}
            </button>
          </li>
        ))}
      </ul>
      {active.photo && (
        <div className="absolute top-0 left-0 z-0 grid h-full w-full grid-cols-12 justify-items-end">
          <div className="sticky top-40 col-span-3 col-end-13 ml-auto aspect-3/4 w-full overflow-hidden rounded-sm">
            <Image src={active.photo} alt={active.name} fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamRoster
