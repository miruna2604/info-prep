"use client";

import { useEffect, useMemo, useState } from "react";
import { buildBinarySearchSteps, buildMergeSteps, searchMergeConfigs, type SearchMergeAlgorithmSlug } from "../../lib/searchMergeAlgorithms";

export function SearchMergeVisualizer({ algorithm }: { algorithm: SearchMergeAlgorithmSlug }) {
  const binary = algorithm === "cautare-binara";
  const config = binary ? searchMergeConfigs.binary : searchMergeConfigs.merge;
  const [firstInput, setFirstInput] = useState(binary ? "1, 3, 5, 7, 9, 12, 16" : "1, 4, 7, 10");
  const [secondInput, setSecondInput] = useState(binary ? "9" : "2, 3, 8, 12");
  const [a, setA] = useState(binary ? [1, 3, 5, 7, 9, 12, 16] : [1, 4, 7, 10]);
  const [b, setB] = useState(binary ? [9] : [2, 3, 8, 12]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [error, setError] = useState("");
  const steps = useMemo(() => binary ? buildBinarySearchSteps(a, b[0]) : buildMergeSteps(a, b), [a, b, binary]);
  const current = steps[index];

  useEffect(() => {
    if (!playing || index >= steps.length - 1) return;
    const timer = window.setTimeout(() => setIndex((old) => { const next = old + 1; if (next >= steps.length - 1) setPlaying(false); return next; }), speed);
    return () => window.clearTimeout(timer);
  }, [index, playing, speed, steps.length]);

  function parseList(text: string) { return text.split(/[ ,;]+/).filter(Boolean).map(Number); }
  function sorted(values: number[]) { return values.every((value, i) => i === 0 || values[i - 1] <= value); }
  function loadValues() {
    const firstParts = firstInput.split(/[ ,;]+/).filter(Boolean);
    const secondParts = secondInput.split(/[ ,;]+/).filter(Boolean);
    if (firstParts.length === 0 || firstParts.length > 10 || firstParts.some((part) => !/^-?\d+$/.test(part)) || secondParts.length === 0 || secondParts.length > 10 || secondParts.some((part) => !/^-?\d+$/.test(part))) { setError(binary ? "Introdu un vector sortat și o singură valoare x." : "Introdu doi vectori sortați de maximum 10 elemente fiecare."); return; }
    const first = parseList(firstInput), second = parseList(secondInput);
    if ((binary && second.length !== 1) || !sorted(first) || (!binary && !sorted(second))) { setError(binary ? "Vectorul trebuie să fie sortat, iar x trebuie să fie o singură valoare." : "Ambii vectori trebuie introduși în ordine crescătoare."); return; }
    setError(""); setA(first); setB(second); setIndex(0); setPlaying(false);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-lime-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">Vectori sortați</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div><div className="flex flex-wrap items-center gap-2"><label className="flex min-w-64 flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-400">{binary ? "v =" : "a ="}<input aria-label={binary ? "Vector sortat" : "Vectorul a"} value={firstInput} onChange={(event) => setFirstInput(event.target.value)} className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none" /></label><label className="flex min-w-40 flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-400">{binary ? "x =" : "b ="}<input aria-label={binary ? "Valoarea căutată" : "Vectorul b"} value={secondInput} onChange={(event) => setSecondInput(event.target.value)} className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none" /></label><button onClick={loadValues} className="rounded-lg bg-lime-300 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-lime-200">Încarcă</button></div></header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}
      <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6"><div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">algoritm.cpp</span><span>linia {current.line + 1}</span></div><pre className="max-h-[700px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-lime-300 bg-lime-300/10 text-lime-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre></div>
        <div className="relative min-h-[600px] overflow-hidden p-5 sm:p-6"><div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} /><div className="relative">
          {binary ? <BinaryView step={current} /> : <MergeView step={current} />}
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-2">{binary ? <><Mini label="st" value={current.st ?? "—"} /><Mini label="mij" value={current.middle ?? "—"} /><Mini label="dr" value={current.dr ?? "—"} /></> : <><Mini label="i" value={current.i ?? "—"} /><Mini label="j" value={current.j ?? "—"} /><Mini label="k" value={current.k ?? "—"} /></>}</div>
          <div className="mt-5 min-h-28 rounded-xl border border-slate-700 bg-slate-900/85 p-5 text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">{current.action}</p><p className="mt-2 text-sm leading-6 text-slate-200">{current.explanation}</p>{binary && current.line >= 16 && <p className="mt-2 font-mono text-xl font-bold text-emerald-300">{current.found ? "GĂSIT" : "NU A FOST GĂSIT"}</p>}</div>
        </div></div>
      </div>
      <Controls index={index} count={steps.length} playing={playing} speed={speed} setIndex={setIndex} setPlaying={setPlaying} setSpeed={setSpeed} />
    </section>
  );
}

function BinaryView({ step }: { step: ReturnType<typeof buildBinarySearchSteps>[number] }) {
  return <><div className="flex items-center justify-center gap-3"><span className="text-sm text-slate-400">Căutăm</span><span className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-xl font-bold text-amber-200">x = {step.target}</span></div><div className="mt-10 flex flex-wrap justify-center gap-2">{step.a.map((value, i) => { const active = step.st !== null && step.dr !== null && i >= step.st && i <= step.dr; const middle = step.middle === i; return <div key={i} className={`relative flex h-16 w-14 items-center justify-center rounded-xl border font-mono text-lg font-bold transition-all duration-500 ${middle ? "-translate-y-3 border-amber-300 bg-amber-300/20 text-amber-100" : active ? "border-lime-400/30 bg-lime-400/10 text-lime-200" : "translate-y-1 border-slate-800 bg-slate-950 text-slate-700 opacity-45"}`}><span className="absolute -top-5 text-[9px] font-normal text-slate-600">{i}</span>{value}{middle && <span className="absolute -bottom-6 text-[9px] text-amber-300">mij</span>}</div>; })}</div><div className="mt-8 text-center text-xs text-slate-500">verde = intervalul în care x mai poate exista · estompat = eliminat</div></>;
}

function MergeView({ step }: { step: ReturnType<typeof buildMergeSteps>[number] }) {
  const comparing = (step.line === 4 || step.line === 5) && step.i !== null && step.j !== null && step.i < step.a.length && step.j < step.b.length;
  return <div className="space-y-8"><VectorRow label="a" values={step.a} pointer={step.i} active={comparing || step.source === "a"} comparing={comparing} /><VectorRow label="b" values={step.b} pointer={step.j} active={comparing || step.source === "b"} comparing={comparing} /><div className="border-t border-slate-700 pt-7"><VectorRow label="c" values={step.result} pointer={step.k} active comparing={false} /></div>{comparing && <p className="text-center text-sm font-medium text-amber-300">Comparăm a[{step.i}] = {step.a[step.i as number]} cu b[{step.j}] = {step.b[step.j as number]}</p>}</div>;
}

function VectorRow({ label, values, pointer, active, comparing }: { label: string; values: Array<number | null>; pointer: number | null; active: boolean; comparing: boolean }) { return <div className="flex items-center gap-3"><span className="w-5 font-mono font-bold text-slate-500">{label}</span><div className="flex flex-wrap gap-2">{values.map((value, i) => <div key={i} className={`relative flex h-12 w-12 items-center justify-center rounded-lg border font-mono font-bold transition-all duration-300 ${pointer === i && active ? `-translate-y-2 ${comparing ? "border-amber-300 bg-amber-300/25 text-amber-100 ring-2 ring-amber-300/20" : "border-lime-300 bg-lime-300/20 text-lime-100"}` : value !== null ? label === "c" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-blue-400/25 bg-blue-400/10 text-blue-200" : "border-dashed border-slate-700 text-slate-700"}`}><span className="absolute -top-4 text-[9px] font-normal text-slate-600">{i}</span>{value ?? "·"}{pointer === i && comparing && <span className="absolute -bottom-5 text-[9px] font-semibold text-amber-300">comparăm</span>}</div>)}</div></div>; }
function Mini({ label, value }: { label: string; value: string | number }) { return <div className="rounded-lg border border-blue-400/20 bg-blue-400/5 p-3 text-center"><p className="text-[10px] uppercase text-blue-300">{label}</p><p className="mt-1 font-mono text-lg font-bold text-white">{value}</p></div>; }

function Controls({ index, count, playing, speed, setIndex, setPlaying, setSpeed }: { index: number; count: number; playing: boolean; speed: number; setIndex: React.Dispatch<React.SetStateAction<number>>; setPlaying: React.Dispatch<React.SetStateAction<boolean>>; setSpeed: React.Dispatch<React.SetStateAction<number>> }) { return <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-lime-300 transition-all duration-300" style={{ width: `${((index + 1) / count) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === count - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-lime-200">{playing ? "Pauză" : index === count - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === count - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(count - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {count}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2400}>Lent</option><option value={1500}>Normal</option><option value={850}>Rapid</option></select></label></div></div></footer>; }
