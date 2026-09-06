import { PiggyBank } from "lucide-react"
import { Typo } from "@/components/ui/brand/Typo/Typo"

type TPageInProgressProps = {
  title?: string
  description?: string
}

export function PageInProgress({
  title = "Budget finito",
  description = "Questa pagina è ancora in lavorazione: il team è a caccia di fondi (e di caffè) per finirla. Torna a trovarci presto."
}: TPageInProgressProps) {
  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center gap-6 px-4 py-32 text-center">
      <div className="flex size-80 items-center justify-center rounded-full bg-slate-200 p-10">
        <PiggyBank className="text-brand-blue size-80" strokeWidth={1.5} />
      </div>
      <Typo.Span
        text={title}
        color="dark"
        className="font-condensed text-3xl font-bold uppercase"
        disableMotion
      />
      <Typo.P text={description} color="dark" className="max-w-md text-slate-500" disableMotion />
    </div>
  )
}
