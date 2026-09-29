"use client";

import { useAlgorithmPlayer } from "../algorithm-visualizer/useAlgorithmPlayer";
import { structFieldsCode, structFieldsSteps, type StructFieldKey } from "../../lib/structFieldsSteps";

const fields: Array<{ key: StructFieldKey; type: string; label: string }> = [
  { key: "nume", type: "char[30]", label: "nume" },
  { key: "varsta", type: "int", label: "varsta" },
  { key: "medie", type: "double", label: "medie" },
];

export function StructFieldsVisualizer() {
  const player = useAlgorithmPlayer(structFieldsSteps.length, 1800);
  const step = structFieldsSteps[player.index];

  return <section className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
    <header className="border-b border-slate-800 bg-slate-950/45 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Struct pas cu pas</p><h2 className="mt-1 text-xl font-semibold text-white">De la tipul Elev la un obiect concret</h2><p className="mt-2 text-sm text-slate-400">Structura este un șablon care ține împreună informații diferite despre aceeași entitate.</p></header>

    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
      <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6"><div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">elev.cpp</span><span>linia {step.line + 1}</span></div><pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{structFieldsCode.map((line, index) => <span key={`${index}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${index === step.line ? "border-cyan-300 bg-cyan-300/10 text-cyan-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{index + 1}</span>{line || " "}</span>)}</code></pre></div>

      <div className="relative min-h-[530px] overflow-hidden p-5 sm:p-6"><div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} /><div className="relative">
        <div className="grid gap-5 sm:grid-cols-[0.8fr_auto_1.2fr] sm:items-center">
          <div className="rounded-2xl border border-blue-400/25 bg-blue-400/5 p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">Șablonul · struct Elev</p><div className="mt-4 space-y-2">{fields.map((field) => <Field key={field.key} active={step.activeField === field.key} left={field.type} right={field.label} />)}</div></div>
          <div className="text-center text-2xl text-slate-600">→</div>
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">Variabila · e</p><div className="mt-4 space-y-2">{fields.map((field) => <Field key={field.key} active={step.activeField === field.key} left={`e.${field.label}`} right={step.values[field.key]} />)}</div></div>
        </div>

        <div className="mx-auto mt-7 max-w-lg rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-center"><p className="text-[10px] uppercase tracking-[0.16em] text-cyan-300">{step.action}</p><p className="mt-2 text-sm leading-6 text-slate-200">{step.explanation}</p></div>
        <div className="mt-5 text-center font-mono text-sm text-slate-400"><span className="text-amber-300">obiect</span><span className="mx-2 text-slate-600">.</span><span className="text-cyan-300">câmp</span></div>
      </div></div>
    </div>

    <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-300 transition-all duration-300" style={{ width: `${((player.index + 1) / structFieldsSteps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button onClick={player.reset} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300">Reset</button><button disabled={player.index === 0} onClick={player.previous} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">←</button><button onClick={player.toggle} className="min-w-24 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">{player.playing ? "Pauză" : player.index === structFieldsSteps.length - 1 ? "Reia" : "▶ Pornește"}</button><button disabled={player.index === structFieldsSteps.length - 1} onClick={player.next} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">→</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{player.index + 1} / {structFieldsSteps.length}</span><select aria-label="Viteza animației" value={player.speed} onChange={(event) => player.setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2600}>Lent</option><option value={1800}>Normal</option><option value={1000}>Rapid</option></select></div></div></footer>
  </section>;
}

function Field({ active, left, right }: { active: boolean; left: string; right: string }) {
  return <div className={`grid grid-cols-[1fr_1.2fr] gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-500 ${active ? "-translate-y-0.5 border-amber-300 bg-amber-300/15 shadow-lg shadow-amber-950/20" : "border-slate-700 bg-slate-900/70"}`}><span className={active ? "text-amber-200" : "text-slate-400"}>{left}</span><span className={`truncate text-right ${active ? "font-bold text-white" : "text-slate-300"}`}>{right}</span></div>;
}
