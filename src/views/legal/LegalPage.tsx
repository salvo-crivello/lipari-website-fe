import { Main } from "@/components/layout/MainComponents"
import { PageInProgress } from "@/components/ui/PageInProgress/PageInProgress"

export function LegalPage({ pageName }: { pageName?: string }) {
  return (
    <Main>
      <PageInProgress pageName={pageName} />
    </Main>
  )
}
