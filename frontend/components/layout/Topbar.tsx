export function Topbar() {
  return (
    <header className="app-topbar flex h-16 items-center justify-between border-b border-slate-800/70 bg-[#06101d]/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">
          {"</>"}
        </div>

        <span className="font-semibold tracking-tight">InfoPrep</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          aria-label="Notificări"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <span aria-hidden="true">♧</span>
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          M
        </div>
      </div>
    </header>
  );
}
