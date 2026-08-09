"use client"

import { useEffect } from "react"

import Button from "@/components/ui/Button/Button"
import { Main } from "@/components/layout/MainComponents"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-2xl font-semibold">Qualcosa è andato storto</h1>
      <p>{error.message}</p>
      <Button text="Riprova" onClick={reset} />
    </Main>
  )
}
