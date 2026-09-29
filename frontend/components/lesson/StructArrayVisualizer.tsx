"use client";

import { useAlgorithmPlayer } from "../algorithm-visualizer/useAlgorithmPlayer";
import { structArrayCode, structArraySteps, type StudentValue } from "../../lib/structArraySteps";

const fieldLabels: Array<keyof StudentValue> = ["nume", "varsta", "medie"];

export function StructArrayVisualizer() {
  const player = useAlgorithmPlayer(structArraySteps.length, 1700);
  const step = structArraySteps[player.index];

  return <section className="overflow-hidden rounded-2xl border border-violet-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
    <header className="border-b border-slate-800 bg-slate-950/45 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Vector de structuri pas cu pas</p><h2 className="mt-1 text-xl font-semibold text-white">Un vector în care fiecare element este un elev complet</h2><p className="mt-2 text-sm text-slate-400"><code>v[i]</code> alege elevul, iar punctul alege una dintre informațiile lui.</p></header>

    <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
      <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6"><div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">elevi.cpp</span><span>linia {step.line + 1}</span></div><pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{structArrayCode.map((line, index) => <span key={`${index}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${index === step.line ? "border-violet-300 bg-violet-300/10 text-violet-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{index + 1}</span>{line || " "}</span>)}</code></pre></div>

      <div className="relative min-h-[540px] overflow-hidden p-5 sm:p-6"><div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} /><div className="relative">
        <div className="flex flex-wrap justify-center gap-3 pt-7">{step.students.map((student, index) => {
          const active = step.index === index;
          return <div key={index} className={`relative w-40 rounded-2xl border p-3 transition-all duration-500 ${active ? "-translate-y-3 border-violet-300 bg-violet-300/15 shadow-xl shadow-violet-950/30" : "border-slate-700 bg-slate-900/80"}`}><span className={`absolute -top-6 left-0 right-0 text-center font-mono text-xs ${active ? "text-violet-300" : "text-slate-500"}`}>v[{index}]</span><p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">Elev complet</p><div className="space-y-2">{fieldLabels.map((field) => <div key={field} className={`grid grid-cols-[0.8fr_1fr] gap-1 rounded-lg border px-2 py-2 font-mono text-[11px] transition ${active && step.field === field ? "border-amber-300 bg-amber-300/15" : "border-slate-700 bg-slate-950/60"}`}><span className={active && step.field === field ? "text-amber-200" : "text-slate-500"}>{field}</span><span className={`truncate text-right ${student[field] === "—" ? "text-slate-700" : "font-semibold text-white"}`}>{student[field]}</span></div>)}</div></div>;
        })}</div>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/5 px-4 py-3 font-mono text-sm"><span className="text-violet-300">{step.index === null ? "v[i]" : `v[${step.index}]`}</span><span className="text-slate-500">alege structura</span><span className="text-slate-600">→</span><span className="text-amber-300">{step.field === null ? ".camp" : `.${step.field}`}</span><span className="text-slate-500">alege informația</span></div>
        <div className="mx-auto mt-5 max-w-lg rounded-xl border border-slate-700 bg-slate-900/85 p-4 text-center"><p className="text-[10px] uppercase tracking-[0.16em] text-violet-300">{step.action}</p><p className="mt-2 text-sm leading-6 text-slate-200">{step.explanation}</p></div>
      </div></div></div>

    <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-violet-300 transition-all duration-300" style={{ width: `${((player.index + 1) / structArraySteps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button onClick={player.reset} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300">Reset</button><button disabled={player.index === 0} onClick={player.previous} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">←</button><button onClick={player.toggle} className="min-w-24 rounded-lg bg-violet-300 px-4 py-2 text-sm font-semibold text-slate-950">{player.playing ? "Pauză" : player.index === structArraySteps.length - 1 ? "Reia" : "▶ Pornește"}</button><button disabled={player.index === structArraySteps.length - 1} onClick={player.next} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">→</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{player.index + 1} / {structArraySteps.length}</span><select aria-label="Viteza animației" value={player.speed} onChange={(event) => player.setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2500}>Lent</option><option value={1700}>Normal</option><option value={950}>Rapid</option></select></div></div></footer>
  </section>;
}
