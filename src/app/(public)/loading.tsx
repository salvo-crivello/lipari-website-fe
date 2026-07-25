export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32" role="status" aria-live="polite">
      <span className="text-sm text-slate-500">Loading…</span>
    </div>
  );
}
