"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildDigitOccurrencesSteps,
  digitOccurrencesCodeLines,
} from "../../lib/digitOccurrencesSteps";

export function DigitOccurrencesVisualizer() {
  const [numberInput, setNumberInput] = useState("58353");
  const [digitInput, setDigitInput] = useState("3");
  const [value, setValue] = useState(58353);
  const [target, setTarget] = useState(3);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1300);
  const [error, setError] = useState("");
  const steps = useMemo(() => buildDigitOccurrencesSteps(value, target), [value, target]);
  const step = steps[stepIndex];
  const digits = String(Math.abs(value)).split("");
  const remainingDigits = step.n === 0 ? 0 : String(Math.abs(step.n)).length;
  const processedCount = value === 0 ? 0 : digits.length - remainingDigits;

  useEffect(() => {
    if (!playing || stepIndex >= steps.length - 1) return;
    const timer = window.setTimeout(() => {
      setStepIndex((current) => {
        const next = current + 1;
        if (next >= steps.length - 1) setPlaying(false);
        return next;
      });
    }, speed);
    return () => window.clearTimeout(timer);
  }, [playing, speed, stepIndex, steps.length]);

  function applyInput() {
    if (!/^\d+$/.test(numberInput) || !/^\d$/.test(digitInput)) {
      setError("Introdu un număr natural și o singură cifră între 0 și 9.");
      return;
    }
    const parsed = Number(numberInput);
    if (!Number.isSafeInteger(parsed) || parsed > 999_999_999) {
      setError("Pentru animație, alege un număr între 0 și 999 999 999.");
      return;
    }
    setError("");
    setValue(parsed);
    setTarget(Number(digitInput));
    setStepIndex(0);
    setPlaying(false);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Vizualizare interactivă</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Numărul de apariții ale unei cifre</h2>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5">
          <label className="flex items-center gap-1 px-2 text-xs text-slate-400">
            n =
            <input aria-label="Numărul analizat" inputMode="numeric" value={numberInput} onChange={(event) => setNumberInput(event.target.value)} className="w-24 bg-transparent font-mono text-sm text-white outline-none" />
          </label>
          <label className="flex items-center gap-1 border-l border-slate-700 px-2 text-xs text-slate-400">
            c =
            <input aria-label="Cifra căutată" inputMode="numeric" value={digitInput} onChange={(event) => setDigitInput(event.target.value)} className="w-5 bg-transparent font-mono text-sm text-white outline-none" />
          </label>
          <button onClick={applyInput} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300">Încarcă</button>
        </div>
      </header>

      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500"><span className="font-mono">main.cpp</span><span>linia {step.line + 1}</span></div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[13px] leading-7"><code>
            {digitOccurrencesCodeLines.map((line, index) => (
              <span key={`${line}-${index}`} className={`block border-l-2 px-4 transition-colors duration-300 ${step.line === index ? "border-emerald-400 bg-emerald-400/10 text-emerald-100" : "border-transparent text-slate-400"}`}>
                <span className="mr-4 inline-block w-4 select-none text-right text-slate-700">{index + 1}</span>{line || " "}
              </span>
            ))}
          </code></pre>
        </div>

        <div className="relative min-h-[480px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px, transparent 1px), linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Numărul n", value: step.n, color: "text-blue-300" }, { label: "Cifra c", value: target, color: "text-amber-300" }, { label: "Contorul nr", value: step.count, color: "text-emerald-300" }].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-center"><p className={`text-[10px] uppercase tracking-wider ${item.color}`}>{item.label}</p><p className={`mt-2 font-mono text-2xl font-bold ${item.color}`}>{item.value}</p></div>
              ))}
            </div>

            <p className="mt-7 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Verificăm cifrele de la dreapta la stânga</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {digits.map((digit, index) => {
                const processed = index >= digits.length - processedCount;
                const active = index === step.activeDigitIndex && ["loop-check", "compare", "count"].includes(step.kind);
                const comparisonColor = step.kind === "compare" || step.kind === "count" ? (step.matches ? "border-emerald-300 bg-emerald-300/20 text-emerald-200" : "border-rose-300 bg-rose-300/15 text-rose-200") : "border-amber-300 bg-amber-300/20 text-amber-200";
                return <div key={`${digit}-${index}`} className={`flex h-14 w-12 items-center justify-center rounded-xl border font-mono text-xl font-bold transition-all duration-500 ${active ? `-translate-y-2 shadow-lg ${comparisonColor}` : processed ? "translate-y-3 border-slate-700 bg-slate-900 text-slate-600 opacity-30" : "border-blue-400/30 bg-blue-400/10 text-blue-200"}`}>{digit}</div>;
              })}
            </div>

            <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 p-3 font-mono text-sm">
              <span className="text-slate-400">n % 10</span><span className="text-white">= {step.currentDigit ?? "?"}</span><span className="text-slate-500">comparat cu</span><span className="font-bold text-amber-300">c = {target}</span>
            </div>
            <div className="mt-4 min-h-24 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center"><p className="text-sm leading-6 text-slate-200">{step.explanation}</p>{(step.kind === "count" || step.kind === "finish") && <p className="mt-2 font-mono text-lg font-semibold text-emerald-300">nr = {step.count}</p>}</div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} /></div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button aria-label="Pasul anterior" disabled={stepIndex === 0} onClick={() => { setPlaying(false); setStepIndex((current) => Math.max(0, current - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">←</button>
            <button onClick={() => { if (stepIndex === steps.length - 1) setStepIndex(0); setPlaying((current) => !current); }} className="min-w-24 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">{playing ? "Pauză" : stepIndex === steps.length - 1 ? "Reia" : "▶ Pornește"}</button>
            <button aria-label="Pasul următor" disabled={stepIndex === steps.length - 1} onClick={() => { setPlaying(false); setStepIndex((current) => Math.min(steps.length - 1, current + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-35">→</button>
            <button onClick={() => { setPlaying(false); setStepIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">Reset</button>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400"><span>{stepIndex + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-200"><option value={1900}>Lent</option><option value={1300}>Normal</option><option value={750}>Rapid</option></select></label></div>
        </div>
      </footer>
    </section>
  );
}
