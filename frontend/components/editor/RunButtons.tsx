export function RunButtons() {
  return (
    <div className="flex justify-end gap-3">
      <button type="button" disabled className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-500">
        Rulează
      </button>
      <button type="button" disabled className="rounded-lg bg-emerald-500/40 px-4 py-2 text-sm font-medium text-emerald-100/60">
        Trimite
      </button>
    </div>
  );
}
