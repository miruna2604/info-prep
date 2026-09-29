"use client";

type Props = {
  index: number;
  count: number;
  playing: boolean;
  speed: number;
  onReset: () => void;
  onPrevious: () => void;
  onToggle: () => void;
  onNext: () => void;
  onSpeedChange: (speed: number) => void;
};

export function AlgorithmControls(props: Props) {
  const { index, count, playing, speed, onReset, onPrevious, onToggle, onNext, onSpeedChange } = props;
  return <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6">
    <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-fuchsia-300 transition-all duration-300" style={{ width: `${((index + 1) / count) * 100}%` }} /></div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={onReset} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:border-slate-500 hover:text-white">Reset</button>
        <button aria-label="Pas înapoi" disabled={index === 0} onClick={onPrevious} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">← <span className="hidden sm:inline">Pas înapoi</span></button>
        <button onClick={onToggle} className="min-w-28 rounded-lg bg-fuchsia-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-fuchsia-200">{playing ? "Pauză" : index === count - 1 ? "Reia" : "▶ Pornește"}</button>
        <button aria-label="Pas înainte" disabled={index === count - 1} onClick={onNext} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35"><span className="hidden sm:inline">Pas înainte</span> →</button>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {count}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => onSpeedChange(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-200"><option value={2400}>Lent</option><option value={1500}>Normal</option><option value={850}>Rapid</option></select></label></div>
    </div>
  </footer>;
}
