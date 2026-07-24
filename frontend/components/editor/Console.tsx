export function Console() {
  return (
    <section className="min-h-40 rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-slate-600" />
        <span className="text-sm font-medium text-slate-200">Consolă</span>
      </div>
      <p className="p-4 font-mono text-sm text-slate-500">
        Rulează codul pentru a vedea rezultatul aici.
      </p>
    </section>
  );
}
