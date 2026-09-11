"use client";

import { useEffect, useMemo, useState } from "react";
import { divisorConfigs, type DivisorAlgorithmSlug } from "../../lib/divisorAlgorithms";

export function DivisorAlgorithmVisualizer({ algorithm }: { algorithm: DivisorAlgorithmSlug }) {
  const config = divisorConfigs[algorithm];
  const [inputs, setInputs] = useState(config.defaults.map(String));
  const [values, setValues] = useState(config.defaults);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);
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
    if (inputs.some((input) => !/^\d+$/.test(input))) {
      setError("Introdu numai numere naturale.");
      return;
    }
    const parsed = inputs.map(Number);
    if (parsed.some((value) => !Number.isSafeInteger(value) || value < 1 || value > 9999)) {
      setError("Alege valori naturale între 1 și 9 999.");
      return;
    }
    if (config.inputs.length === 1 && parsed[0] > 200) {
      setError("Pentru o animație ușor de urmărit, alege n ≤ 200.");
      return;
    }
    if (algorithm === "numere-prime-dintr-un-interval" && (parsed[0] > parsed[1] || parsed[1] - parsed[0] > 20)) {
      setError("Alege a ≤ b și un interval de cel mult 20 de numere.");
      return;
    }
    setError(""); setValues(parsed); setIndex(0); setPlaying(false);
  }

  const visibleVars = Object.entries(current.vars).filter(([, value]) => typeof value === "number" || typeof value === "boolean").slice(0, 6);
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Vizualizare interactivă</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5">
          {config.inputs.map((name, inputIndex) => <label key={name} className="flex items-center gap-1 px-2 text-xs text-slate-400">{name} = <input aria-label={`Valoarea ${name}`} inputMode="numeric" value={inputs[inputIndex]} onChange={(event) => setInputs((old) => old.map((item, i) => i === inputIndex ? event.target.value : item))} className="w-16 bg-transparent font-mono text-sm text-white outline-none" /></label>)}
          <button onClick={loadValues} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300">Încarcă</button>
        </div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="max-h-[610px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{config.code.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-emerald-400 bg-emerald-400/10 text-emerald-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[540px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Starea variabilelor</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">{visibleVars.map(([name, value]) => <div key={name} className="min-w-20 rounded-xl border border-blue-400/20 bg-blue-400/5 px-3 py-2 text-center"><p className="text-[10px] uppercase text-blue-300">{name}</p><p className="mt-1 font-mono text-lg font-bold text-white">{typeof value === "boolean" ? (value ? "true" : "false") : value}</p></div>)}</div>

            <div className="mx-auto mt-7 grid max-w-md grid-cols-3 gap-3 text-center">
              <StatusCard label="candidat d" value={current.candidate ?? "—"} />
              <StatusCard label="rest" value={current.remainder ?? "—"} />
              <div className={`rounded-xl border p-3 ${current.accepted === null ? "border-slate-700 bg-slate-900/70" : current.accepted ? "border-emerald-400/40 bg-emerald-400/10" : "border-rose-400/40 bg-rose-400/10"}`}><p className="text-[10px] uppercase text-slate-400">decizie</p><p className={`mt-2 text-sm font-bold ${current.accepted === false ? "text-rose-300" : "text-emerald-300"}`}>{current.accepted === null ? "verificăm" : current.accepted ? "acceptat" : "respins"}</p></div>
            </div>

            <div className="mt-6 min-h-28 rounded-xl border border-slate-700 bg-slate-900/85 p-5 text-center"><p className="text-sm leading-6 text-slate-200">{current.explanation}</p></div>
            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4"><p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">Rezultat construit</p><p className="mt-2 min-h-8 break-words text-center font-mono text-xl font-bold text-emerald-200">{current.output || "—"}</p></div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div>
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2100}>Lent</option><option value={1400}>Normal</option><option value={750}>Rapid</option></select></label></div></div>
      </footer>
    </section>
  );
}

function StatusCard({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3"><p className="text-[10px] uppercase text-slate-400">{label}</p><p className="mt-2 font-mono text-lg font-bold text-white">{value}</p></div>;
}
