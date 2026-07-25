import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-2xl font-semibold">Pagina non trovata</h1>
      <Link href="/" className="text-blue-600 underline">
        Torna alla home
      </Link>
    </main>
  );
}
