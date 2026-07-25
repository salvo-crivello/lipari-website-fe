"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-2xl font-semibold">Qualcosa è andato storto</h1>
      <Button onClick={reset}>Riprova</Button>
    </main>
  );
}
