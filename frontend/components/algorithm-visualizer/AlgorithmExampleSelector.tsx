"use client";

import type { AlgorithmPreset } from "./types";

type Props = {
  presets: AlgorithmPreset[];
  selected: string;
  input: string;
  onPreset: (preset: AlgorithmPreset) => void;
  onCustom: () => void;
  onInput: (value: string) => void;
  onLoad: () => void;
};

export function AlgorithmExampleSelector({ presets, selected, input, onPreset, onCustom, onInput, onLoad }: Props) {
  return <div className="border-b border-slate-800 bg-slate-950/30 px-5 py-4 sm:px-6">
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Alege un exemplu</p>
    <div className="flex flex-wrap gap-2">{presets.map((preset) => <button key={preset.id} onClick={() => onPreset(preset)} className={`rounded-full border px-3 py-1.5 text-xs transition ${selected === preset.id ? "border-fuchsia-300 bg-fuchsia-300/15 text-fuchsia-100" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}>{preset.label}</button>)}<button onClick={onCustom} className={`rounded-full border px-3 py-1.5 text-xs transition ${selected === "custom" ? "border-fuchsia-300 bg-fuchsia-300/15 text-fuchsia-100" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}>Vector personalizat</button></div>
    {selected === "custom" && <div className="mt-3 flex max-w-xl items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><input autoFocus aria-label="Vector personalizat" value={input} onChange={(event) => onInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onLoad()} placeholder="Exemplu: 7, 3, 5, 1" className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none" /><button onClick={onLoad} className="rounded-lg bg-fuchsia-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-fuchsia-200">Încarcă</button></div>}
  </div>;
}
