export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">
          {"</>"}
        </div>

        <span className="font-semibold tracking-tight">InfoPrep</span>

        <span className="hidden text-sm text-slate-500 sm:inline">
          Informatică Bac
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-400 sm:inline">
          Învață. Exersează. Evoluează.
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold">
          M
        </div>
      </div>
    </header>
  );
}
