import { Main } from "@/components/layout/MainComponents"
import { MotionTextProgress } from "@/components/motion/MotionTextProgress"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { typoVariants } from "@/components/ui/brand/Typo/Typo.styles"
import { ButtonLink } from "@/components/ui/Button/Button"
import { ROUTES } from "@/constant/routes"
import { cn } from "@/utils"

export default function NotFound() {
  return (
    <Main>
      <div className="bg-brand-blue-950 flex h-screen flex-col items-center justify-center gap-6 px-4 py-32 text-center">
        <MotionTextProgress
          text="404"
          className={cn(typoVariants({ variant: "display" }), "text-brand-green text-[10rem]!")}
        />

        <Typo.H2 text="Pagina non trovata" color="light" disableMotion />
        <Typo.P
          text="La pagina che cerchi non esiste o è stata spostata."
          color="light"
          className="text-slate-300"
          disableMotion
        />
        <ButtonLink
          href={ROUTES.HOME}
          text="Torna alla home"
          variant="fill"
          color="primary"
          surface="dark"
          className="mt-4"
        />
      </div>
    </Main>
  )
}
