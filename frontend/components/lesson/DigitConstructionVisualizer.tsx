"use client";

import { useEffect, useMemo, useState } from "react";
import {
  digitAlgorithmConfigs,
  type DigitAlgorithmSlug,
} from "../../lib/digitConstructionAlgorithms";

export function DigitConstructionVisualizer({ algorithm }: { algorithm: DigitAlgorithmSlug }) {
  const config = digitAlgorithmConfigs[algorithm];
  const [input, setInput] = useState(String(config.example));
  const [value, setValue] = useState(config.example);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);
  const [error, setError] = useState("");
  const steps = useMemo(() => config.buildSteps(value), [config, value]);
  const current = steps[stepIndex];

  useEffect(() => {
    if (!playing || stepIndex >= steps.length - 1) return;
    const timer = window.setTimeout(() => {
      setStepIndex((index) => {
        const next = index + 1;
        if (next >= steps.length - 1) setPlaying(false);
        return next;
      });
    }, speed);
    return () => window.clearTimeout(timer);
  }, [playing, speed, stepIndex, steps.length]);

  function loadNumber() {
    if (!/^\d+$/.test(input)) {
      setError("Introdu un număr natural format numai din cifre.");
      return;
    }
    const parsed = Number(input);
    if (!Number.isSafeInteger(parsed) || parsed > 999_999_999) {
      setError("Alege un număr între 0 și 999 999 999.");
      return;
    }
    setError("");
    setValue(parsed);
    setStepIndex(0);
    setPlaying(false);
  }

  const isFilter = algorithm === "eliminarea-cifrelor-pare";
  const output = isFilter ? current.final : current.result;
  const phaseLabel = isFilter && current.n === 0 && current.phase !== "finish" ? "Etapa 2 · refacem ordinea" : "Etapa 1 · prelucrăm cifrele";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Vizualizare interactivă</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2></div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5">
          <label className="flex items-center gap-2 px-2 text-xs text-slate-400">n = <input aria-label="Număr pentru animație" inputMode="numeric" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadNumber()} className="w-28 bg-transparent font-mono text-sm text-white outline-none" /></label>
          <button onClick={loadNumber} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300">Încarcă</button>
        </div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[13px] leading-7"><code>{config.code.map((line, index) => <span key={`${index}-${line}`} className={`block border-l-2 px-4 transition-colors duration-300 ${current.line === index ? "border-emerald-400 bg-emerald-400/10 text-emerald-100" : "border-transparent text-slate-400"}`}><span className="mr-4 inline-block w-5 select-none text-right text-slate-700">{index + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[500px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{phaseLabel}</p>
            <div className={`mt-4 grid gap-3 ${current.copy !== null ? "grid-cols-4" : isFilter ? "grid-cols-3" : "grid-cols-2"}`}>
              <ValueCard label="n" value={current.n} color="blue" />
              {current.copy !== null && <ValueCard label="copie" value={current.copy} color="slate" />}
              <ValueCard label={config.resultLabel} value={current.result} color="amber" />
              {isFilter && <ValueCard label="final" value={current.final} color="emerald" />}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="rounded-xl border border-blue-400/25 bg-blue-400/10 px-5 py-3 text-center"><p className="text-[10px] uppercase text-blue-300">ultima cifră</p><p className="mt-1 font-mono text-3xl font-bold text-white">{current.digit ?? "?"}</p></div>
              <span className="text-2xl text-slate-600">→</span>
              <div className={`min-w-36 rounded-xl border px-4 py-3 text-center ${current.phase === "decide" ? current.accepted ? "border-emerald-400/40 bg-emerald-400/10" : "border-rose-400/40 bg-rose-400/10" : "border-slate-700 bg-slate-900/80"}`}><p className="text-[10px] uppercase tracking-wider text-slate-400">acțiune</p><p className={`mt-1 text-sm font-semibold ${current.accepted === false ? "text-rose-300" : "text-emerald-300"}`}>{current.phase === "decide" ? current.accepted ? "Păstrăm cifra" : "Eliminăm cifra" : current.phase === "build" ? "Adăugăm cifra" : current.phase === "remove" ? "Tăiem ultima cifră" : current.phase === "compare" ? current.accepted ? "Sunt egale" : "Sunt diferite" : "Urmărim codul"}</p></div>
            </div>

            <div className="mt-7 min-h-28 rounded-xl border border-slate-700 bg-slate-900/85 p-5 text-center"><p className="text-sm leading-6 text-slate-200">{current.explanation}</p>{current.phase === "finish" && <p className="mt-2 font-mono text-xl font-bold text-emerald-300">{algorithm === "numar-palindrom" ? (current.accepted ? "DA" : "NU") : output}</p>}</div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} /></div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2"><button aria-label="Pasul anterior" disabled={stepIndex === 0} onClick={() => { setPlaying(false); setStepIndex((index) => Math.max(0, index - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (stepIndex === steps.length - 1) setStepIndex(0); setPlaying((state) => !state); }} className="min-w-24 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">{playing ? "Pauză" : stepIndex === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor" disabled={stepIndex === steps.length - 1} onClick={() => { setPlaying(false); setStepIndex((index) => Math.min(steps.length - 1, index + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setStepIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div>
          <div className="flex items-center gap-3 text-xs text-slate-400"><span>{stepIndex + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2100}>Lent</option><option value={1400}>Normal</option><option value={800}>Rapid</option></select></label></div>
        </div>
      </footer>
    </section>
  );
}

function ValueCard({ label, value, color }: { label: string; value: number; color: "blue" | "amber" | "emerald" | "slate" }) {
  const colors = { blue: "text-blue-300 border-blue-400/20", amber: "text-amber-300 border-amber-400/20", emerald: "text-emerald-300 border-emerald-400/20", slate: "text-slate-300 border-slate-600" };
  return <div className={`rounded-xl border bg-slate-900/70 p-3 text-center ${colors[color]}`}><p className="text-[10px] uppercase tracking-wider">{label}</p><p className="mt-2 overflow-hidden text-ellipsis font-mono text-xl font-bold">{value}</p></div>;
}
