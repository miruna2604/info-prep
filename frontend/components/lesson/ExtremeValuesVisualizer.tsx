"use client";

import { useEffect, useMemo, useState } from "react";
import { extremeConfigs, type ExtremeAlgorithmSlug } from "../../lib/extremeValueAlgorithms";

export function ExtremeValuesVisualizer({ algorithm }: { algorithm: ExtremeAlgorithmSlug }) {
  const config = extremeConfigs[algorithm];
  const [input, setInput] = useState(config.defaults.join(", "));
  const [vector, setVector] = useState(config.defaults);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);
  const [error, setError] = useState("");
  const steps = useMemo(() => config.build(vector), [config, vector]);
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

  function loadVector() {
    const parts = input.split(/[ ,;]+/).filter(Boolean);
    if (parts.length === 0 || parts.length > 12 || parts.some((part) => !/^-?\d+$/.test(part))) {
      setError("Introdu între 1 și 12 numere întregi, separate prin spațiu sau virgulă.");
      return;
    }
    const parsed = parts.map(Number);
    if (parsed.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 9999)) {
      setError("Fiecare valoare trebuie să fie între -9 999 și 9 999.");
      return;
    }
    if (new Set(parsed).size < config.minimumDistinct) {
      setError(`Sunt necesare cel puțin ${config.minimumDistinct} valori distincte.`);
      return;
    }
    setError(""); setVector(parsed); setIndex(0); setPlaying(false);
  }

  const trackedValues = Object.entries(current.values).filter(([name]) => name !== "i" && name !== "n");
  return (
    <section className="overflow-hidden rounded-2xl border border-rose-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">Vector · o singură parcurgere</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div>
        <div className="flex max-w-xl items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><input aria-label="Elementele vectorului" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadVector()} className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none sm:w-72" /><button onClick={loadVector} className="rounded-lg bg-rose-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-200">Încarcă</button></div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="max-h-[650px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-rose-300 bg-rose-300/10 text-rose-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[540px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Vectorul v</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">{vector.map((value, vectorIndex) => <div key={`${vectorIndex}-${value}`} className={`relative flex h-14 w-14 items-center justify-center rounded-xl border font-mono text-lg font-bold transition-all duration-300 ${current.index === vectorIndex ? "-translate-y-2 border-rose-300 bg-rose-300/20 text-rose-100 shadow-lg shadow-rose-500/10" : current.index !== null && vectorIndex < current.index ? "border-slate-700 bg-slate-900 text-slate-500" : "border-blue-400/25 bg-blue-400/10 text-blue-200"}`}><span className="absolute -top-5 text-[9px] font-normal text-slate-600">{vectorIndex}</span>{value}</div>)}</div>

            <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Valorile păstrate</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">{trackedValues.length > 0 ? trackedValues.map(([name, value], slotIndex) => <div key={name} className="min-w-24 rounded-xl border border-amber-400/25 bg-amber-400/10 p-3 text-center"><p className="text-[10px] uppercase tracking-wider text-amber-300">{name}</p><p className="mt-2 font-mono text-2xl font-bold text-white">{value}</p><p className="mt-1 text-[10px] text-slate-500">locul {slotIndex + 1}</p></div>) : <span className="text-sm text-slate-500">Se inițializează valorile…</span>}</div>

            <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3"><div className="rounded-xl border border-slate-700 bg-slate-900/75 p-3 text-center"><p className="text-[10px] uppercase text-slate-500">Comparație</p><p className="mt-2 min-h-6 font-mono text-sm text-cyan-200">{current.comparison || "—"}</p></div><div className="rounded-xl border border-slate-700 bg-slate-900/75 p-3 text-center"><p className="text-[10px] uppercase text-slate-500">Acțiune</p><p className="mt-2 min-h-6 text-sm font-semibold text-rose-200">{current.action}</p></div></div>
            <div className="mt-4 min-h-28 rounded-xl border border-slate-700 bg-slate-900/85 p-5 text-center"><p className="text-sm leading-6 text-slate-200">{current.explanation}</p>{current.output && <p className="mt-2 font-mono text-xl font-bold text-emerald-300">{current.output}</p>}</div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-rose-300 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-rose-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-200">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2200}>Lent</option><option value={1400}>Normal</option><option value={800}>Rapid</option></select></label></div></div></footer>
    </section>
  );
}
