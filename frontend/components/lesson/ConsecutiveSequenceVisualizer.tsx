"use client";

import { useEffect, useMemo, useState } from "react";
import { sequenceConfigs, type SequenceAlgorithmSlug } from "../../lib/consecutiveSequenceAlgorithms";

export function ConsecutiveSequenceVisualizer({ algorithm }: { algorithm: SequenceAlgorithmSlug }) {
  const config = sequenceConfigs[algorithm];
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
    if (parts.length === 0 || parts.length > 14 || parts.some((part) => !/^-?\d+$/.test(part))) {
      setError("Introdu între 1 și 14 numere întregi, separate prin spațiu sau virgulă.");
      return;
    }
    const parsed = parts.map(Number);
    if (parsed.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 9999)) {
      setError("Fiecare valoare trebuie să fie între -9 999 și 9 999.");
      return;
    }
    setError(""); setValues(parsed); setIndex(0); setPlaying(false);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-orange-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Secvența curentă vs. record</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div>
        <div className="flex max-w-xl items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><input aria-label="Valorile secvenței" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadValues()} className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none sm:w-72" /><button onClick={loadValues} className="rounded-lg bg-orange-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-orange-200">Încarcă</button></div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="max-h-[650px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-orange-300 bg-orange-300/10 text-orange-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[570px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-orange-400/30 bg-orange-400/10 p-4 text-center"><p className="text-xs uppercase tracking-wider text-orange-300">lungime curentă</p><p className="mt-2 font-mono text-4xl font-bold text-orange-100">{current.length}</p></div><div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center"><p className="text-xs uppercase tracking-wider text-emerald-300">maxim / record</p><p className="mt-2 font-mono text-4xl font-bold text-emerald-100">{current.maximum}</p></div></div>

            <div className="mt-9 flex flex-wrap justify-center gap-2">{values.map((value, valueIndex) => {
              const inCurrent = current.currentStart !== null && current.index !== null && valueIndex >= current.currentStart && valueIndex <= current.index;
              const inBest = current.bestStart !== null && current.bestEnd !== null && valueIndex >= current.bestStart && valueIndex <= current.bestEnd;
              const active = current.index === valueIndex;
              return <div key={`${valueIndex}-${value}`} className={`relative flex h-14 w-14 items-center justify-center rounded-xl border font-mono text-lg font-bold transition-all duration-300 ${active ? "-translate-y-2" : ""} ${inCurrent ? "border-orange-300 bg-orange-300/20 text-orange-100" : "border-slate-700 bg-slate-900 text-slate-400"}`}><span className="absolute -top-5 text-[9px] font-normal text-slate-600">{valueIndex}</span>{value}{inBest && <span className="absolute -bottom-2 h-1.5 w-10 rounded-full bg-emerald-400" />}</div>;
            })}</div>
            <div className="mt-5 flex justify-center gap-5 text-xs"><span className="flex items-center gap-2 text-orange-300"><span className="h-3 w-3 rounded border border-orange-300 bg-orange-300/20" />secvența curentă</span><span className="flex items-center gap-2 text-emerald-300"><span className="h-1.5 w-4 rounded bg-emerald-400" />cea mai bună</span></div>

            <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-3"><SmallValue label="x" value={current.x ?? "?"} /><SmallValue label="anterior" value={current.previous ?? "—"} /><div className={`rounded-xl border p-3 text-center ${current.conditionResult === null ? "border-slate-700 bg-slate-900/75" : current.conditionResult ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}><p className="text-[10px] uppercase text-slate-500">condiție</p><p className={`mt-2 min-h-6 font-mono text-sm font-bold ${current.conditionResult === false ? "text-rose-300" : "text-emerald-300"}`}>{current.condition || "—"}</p></div></div>
            <div className="mt-5 min-h-28 rounded-xl border border-slate-700 bg-slate-900/85 p-5 text-center"><p className="text-sm leading-6 text-slate-200">{current.explanation}</p>{current.line === config.code.length - 1 && <p className="mt-2 font-mono text-xl font-bold text-emerald-300">maxim = {current.maximum}</p>}</div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-orange-300 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-orange-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-200">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2300}>Lent</option><option value={1500}>Normal</option><option value={850}>Rapid</option></select></label></div></div></footer>
    </section>
  );
}

function SmallValue({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-3 text-center"><p className="text-[10px] uppercase text-blue-300">{label}</p><p className="mt-2 font-mono text-lg font-bold text-white">{value}</p></div>;
}
