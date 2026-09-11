"use client";

import { useEffect, useMemo, useState } from "react";
import { buildFrequencySteps, frequencyConfigs, type FrequencyAlgorithmSlug } from "../../lib/frequencyVectorAlgorithms";

const defaultValues = [3, 1, 3, 5, 1, 3];

export function FrequencyVectorVisualizer({ algorithm }: { algorithm: FrequencyAlgorithmSlug }) {
  const config = frequencyConfigs[algorithm];
  const [input, setInput] = useState(defaultValues.join(", "));
  const [values, setValues] = useState(defaultValues);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [error, setError] = useState("");
  const steps = useMemo(() => buildFrequencySteps(values, config.mode), [config.mode, values]);
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
    if (parts.length === 0 || parts.length > 12 || parts.some((part) => !/^\d+$/.test(part))) {
      setError("Introdu între 1 și 12 valori naturale, separate prin spațiu sau virgulă.");
      return;
    }
    const parsed = parts.map(Number);
    if (parsed.some((value) => value < 0 || value > 20)) {
      setError("Pentru o animație clară, folosește valori între 0 și 20.");
      return;
    }
    setError(""); setValues(parsed); setIndex(0); setPlaying(false);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-blue-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Indexul este chiar valoarea</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div>
        <div className="flex max-w-xl items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><input aria-label="Valorile pentru vectorul de frecvență" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadValues()} className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none sm:w-72" /><button onClick={loadValues} className="rounded-lg bg-blue-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-blue-200">Încarcă</button></div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[13px] leading-8"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-blue-300 bg-blue-300/10 text-blue-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[570px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Valorile citite</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">{values.map((value, valueIndex) => <div key={`${valueIndex}-${value}`} className={`relative flex h-12 w-12 items-center justify-center rounded-lg border font-mono font-bold transition-all duration-300 ${current.inputIndex === valueIndex ? "-translate-y-1 border-amber-300 bg-amber-300/20 text-amber-100" : current.inputIndex !== null && valueIndex < current.inputIndex ? "border-slate-700 bg-slate-900 text-slate-600" : "border-blue-400/25 bg-blue-400/10 text-blue-200"}`}><span className="absolute -top-4 text-[9px] font-normal text-slate-600">{valueIndex}</span>{value}</div>)}</div>

            <div className="my-5 flex min-h-16 items-center justify-center">
              {current.x !== null ? <div className="text-center"><p className="font-mono text-lg font-bold text-amber-300">x = {current.x}</p><p className="mt-1 text-xs text-slate-400">valoarea devine index</p><p className="mt-1 text-2xl text-blue-300">↓</p></div> : <p className="text-sm text-slate-600">Urmărim fiecare valoare spre poziția sa din f</p>}
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="mx-auto flex w-max gap-1.5">
                {current.frequencies.map((frequency, frequencyIndex) => {
                  const active = current.x === frequencyIndex;
                  const changed = active && current.kind === "update";
                  return <div key={frequencyIndex} className={`w-12 overflow-hidden rounded-lg border text-center transition-all duration-300 ${changed ? "-translate-y-1 border-emerald-300 bg-emerald-300/20 shadow-lg shadow-emerald-500/10" : active ? "border-amber-300 bg-amber-300/15" : "border-slate-700 bg-slate-900/80"}`}><div className="border-b border-slate-700 bg-slate-950/70 py-1 text-[9px] text-slate-500">index {frequencyIndex}</div><div className={`py-3 font-mono text-lg font-bold ${changed ? "text-emerald-200" : active ? "text-amber-200" : frequency === 0 ? "text-slate-600" : "text-blue-200"}`}>{frequency}</div></div>;
                })}
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-5 text-xs text-slate-500"><span>sus: valoarea / indexul</span><span>jos: {config.mode === "count" ? "numărul de apariții" : "0 = nu, 1 = da"}</span></div>

            {current.kind === "update" && <div className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 font-mono"><span className="text-slate-400">f[{current.x}]</span><span className="text-slate-500">:</span><span className="text-rose-300">{current.oldValue}</span><span className="text-slate-500">→</span><span className="text-emerald-300">{current.newValue}</span></div>}
            <div className="mt-4 min-h-24 rounded-xl border border-slate-700 bg-slate-900/85 p-4 text-center"><p className="text-sm leading-6 text-slate-200">{current.explanation}</p></div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-blue-300 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-blue-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-blue-200">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2300}>Lent</option><option value={1500}>Normal</option><option value={850}>Rapid</option></select></label></div></div></footer>
    </section>
  );
}
