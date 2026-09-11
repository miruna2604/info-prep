"use client";

import { useEffect, useMemo, useState } from "react";
import { buildDigitSumSteps, digitSumCodeLines } from "../../lib/digitSumSteps";

export function DigitSumVisualizer() {
  const [input, setInput] = useState("4729");
  const [value, setValue] = useState(4729);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const [error, setError] = useState("");
  const steps = useMemo(() => buildDigitSumSteps(value), [value]);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!playing || stepIndex >= steps.length - 1) return;

    const timer = window.setTimeout(
      () => {
        setStepIndex((current) => {
          const next = current + 1;
          if (next >= steps.length - 1) setPlaying(false);
          return next;
        });
      },
      speed,
    );
    return () => window.clearTimeout(timer);
  }, [playing, speed, stepIndex, steps.length]);

  function applyInput() {
    if (!/^\d+$/.test(input)) {
      setError("Introdu un număr natural format doar din cifre.");
      return;
    }

    const parsed = Number(input);
    if (!Number.isSafeInteger(parsed) || parsed > 999_999_999) {
      setError("Pentru animație, alege un număr între 0 și 999 999 999.");
      return;
    }

    setError("");
    setValue(parsed);
    setStepIndex(0);
    setPlaying(false);
  }

  const originalDigits = String(value).split("");
  const remainingDigits = String(step.n).split("");
  const processedCount = step.n === 0 ? originalDigits.length : originalDigits.length - remainingDigits.length;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#07111f] shadow-2xl shadow-black/25">
      <div className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Vizualizare interactivă</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Suma cifrelor unui număr</h2>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5">
          <input
            aria-label="Număr pentru animație"
            inputMode="numeric"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && applyInput()}
            className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm text-white outline-none sm:w-32"
          />
          <button onClick={applyInput} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300">
            Încarcă
          </button>
        </div>
      </div>

      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono">main.cpp</span>
            <span>linia {step.line + 1}</span>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[13px] leading-7">
            <code>
              {digitSumCodeLines.map((line, index) => (
                <span
                  key={line}
                  className={`block border-l-2 px-4 transition-colors duration-300 ${
                    step.line === index
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  <span className="mr-4 inline-block w-4 select-none text-right text-slate-700">{index + 1}</span>
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </div>

        <div className="relative min-h-[420px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px, transparent 1px), linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-4">
                <p className="text-xs uppercase tracking-wider text-blue-300">Numărul n</p>
                <p className="mt-2 font-mono text-3xl font-bold text-white">{step.n}</p>
              </div>
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <p className="text-xs uppercase tracking-wider text-emerald-300">Suma</p>
                <p className="mt-2 font-mono text-3xl font-bold text-emerald-300">{step.sum}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Cifrele numărului inițial</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {originalDigits.map((digit, index) => {
                  const isProcessed = index >= originalDigits.length - processedCount;
                  const isActive = step.digit !== null && index === originalDigits.length - processedCount - 1;
                  return (
                    <div
                      key={`${digit}-${index}`}
                      className={`flex h-14 w-12 items-center justify-center rounded-xl border font-mono text-xl font-bold transition-all duration-500 ${
                        isActive && (step.kind === "extract" || step.kind === "add")
                          ? "-translate-y-2 border-amber-300 bg-amber-300/20 text-amber-200 shadow-lg shadow-amber-500/10"
                          : isProcessed
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 opacity-55"
                            : "border-blue-400/30 bg-blue-400/10 text-blue-200"
                      }`}
                    >
                      {digit}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 min-h-20 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center">
              <p className="text-sm leading-6 text-slate-200">{step.explanation}</p>
              {step.digit !== null && (step.kind === "extract" || step.kind === "add") && (
                <p className="mt-2 font-mono text-lg font-semibold text-amber-300">
                  cifra = {step.digit}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button aria-label="Pasul anterior" disabled={stepIndex === 0} onClick={() => { setPlaying(false); setStepIndex((current) => Math.max(0, current - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-35">←</button>
            <button onClick={() => { if (stepIndex === steps.length - 1) setStepIndex(0); setPlaying((current) => !current); }} className="min-w-24 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
              {playing ? "Pauză" : stepIndex === steps.length - 1 ? "Reia" : "▶ Pornește"}
            </button>
            <button aria-label="Pasul următor" disabled={stepIndex === steps.length - 1} onClick={() => { setPlaying(false); setStepIndex((current) => Math.min(steps.length - 1, current + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-35">→</button>
            <button onClick={() => { setPlaying(false); setStepIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">Reset</button>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{stepIndex + 1} / {steps.length}</span>
            <label className="flex items-center gap-2">
              Viteză
              <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-200">
                <option value={1400}>Lent</option>
                <option value={900}>Normal</option>
                <option value={500}>Rapid</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
