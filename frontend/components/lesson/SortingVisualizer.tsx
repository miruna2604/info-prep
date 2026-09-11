"use client";

import { useEffect, useMemo, useState } from "react";
import { sortingConfigs, type SortingAlgorithmSlug } from "../../lib/sortingAlgorithms";

export function SortingVisualizer({ algorithm }: { algorithm: SortingAlgorithmSlug }) {
  const config = sortingConfigs[algorithm];
  const [input, setInput] = useState(config.defaults.join(", "));
  const [values, setValues] = useState(config.defaults);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [error, setError] = useState("");
  const steps = useMemo(() => config.build(values), [config, values]);
  const current = steps[index];

  useEffect(() => {
    if (!playing || index >= steps.length - 1) return;
    const timer = window.setTimeout(() => setIndex((old) => {
      const next = old + 1;
      if (next >= steps.length - 1) setPlaying(false);
      return next;
    }), speed);
    return () => window.clearTimeout(timer);
  }, [index, playing, speed, steps.length]);

  function loadValues() {
    const parts = input.split(/[ ,;]+/).filter(Boolean);
    if (parts.length < 2 || parts.length > 10 || parts.some((part) => !/^-?\d+$/.test(part))) {
      setError("Introdu între 2 și 10 numere întregi, separate prin spațiu sau virgulă.");
      return;
    }
    const parsed = parts.map(Number);
    if (parsed.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 99)) {
      setError("Pentru o animație clară, folosește valori între -99 și 99.");
      return;
    }
    setError(""); setValues(parsed); setIndex(0); setPlaying(false);
  }

  const compared = new Set(current.compare ?? []);
  return (
    <section className="overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">Sortare pas cu pas</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div><div className="flex max-w-xl items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><input aria-label="Elementele vectorului pentru sortare" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadValues()} className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none sm:w-72" /><button onClick={loadValues} className="rounded-lg bg-fuchsia-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-fuchsia-200">Încarcă</button></div></header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6"><div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">sortare.cpp</span><span>linia {current.line + 1}</span></div><pre className="max-h-[680px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-fuchsia-300 bg-fuchsia-300/10 text-fuchsia-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre></div>

        <div className="relative min-h-[580px] overflow-hidden p-5 sm:p-6"><div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} /><div className="relative">
          <div className="flex flex-wrap justify-center gap-2 pt-7">{current.values.map((value, valueIndex) => {
            const sorted = current.sortedStart !== null && current.sortedEnd !== null && valueIndex >= current.sortedStart && valueIndex <= current.sortedEnd;
            const isCompared = compared.has(valueIndex);
            const isMinimum = current.minimumIndex === valueIndex;
            return <div key={valueIndex} className={`relative flex h-20 w-14 items-end justify-center rounded-xl border pb-3 font-mono text-lg font-bold transition-all duration-500 ${isMinimum ? "-translate-y-3 border-amber-300 bg-amber-300/20 text-amber-100" : isCompared ? "-translate-y-2 border-fuchsia-300 bg-fuchsia-300/20 text-fuchsia-100" : sorted ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-slate-700 bg-slate-900 text-slate-300"}`}><span className="absolute -top-5 text-[9px] font-normal text-slate-600">{valueIndex}</span>{value ?? "□"}{isMinimum && <span className="absolute -bottom-6 text-[9px] font-semibold text-amber-300">pozMin</span>}{sorted && <span className="absolute left-2 right-2 top-2 h-1 rounded bg-emerald-400" />}</div>;
          })}</div>
          <div className="mt-10 flex flex-wrap justify-center gap-3"><Mini label="i" value={current.i} /><Mini label="j" value={current.j ?? "—"} />{current.changed !== null && <Mini label="schimbat" value={current.changed ? "true" : "false"} />}{current.heldValue !== null && <Mini label={algorithm === "insertion-sort" ? "x (ținut separat)" : "aux"} value={current.heldValue} />}</div>
          <div className="mx-auto mt-6 grid max-w-lg grid-cols-[0.8fr_1.2fr] gap-3"><div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-4 text-center"><p className="text-[10px] uppercase text-fuchsia-300">Acțiune</p><p className="mt-2 text-sm font-semibold text-white">{current.action}</p></div><div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center"><p className="text-[10px] uppercase text-slate-500">Ce se întâmplă?</p><p className="mt-2 text-sm leading-6 text-slate-200">{current.explanation}</p></div></div>
          <div className="mt-5 flex justify-center gap-5 text-xs"><span className="flex items-center gap-2 text-fuchsia-300"><span className="h-3 w-3 rounded bg-fuchsia-300/30" />comparăm / mutăm</span><span className="flex items-center gap-2 text-emerald-300"><span className="h-1 w-4 rounded bg-emerald-400" />zonă deja sortată</span></div>
        </div></div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-fuchsia-300 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-fuchsia-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-fuchsia-200">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2400}>Lent</option><option value={1500}>Normal</option><option value={850}>Rapid</option></select></label></div></div></footer>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string | number }) { return <div className="min-w-20 rounded-lg border border-blue-400/20 bg-blue-400/5 px-3 py-2 text-center"><p className="text-[10px] uppercase text-blue-300">{label}</p><p className="mt-1 font-mono font-bold text-white">{value}</p></div>; }
