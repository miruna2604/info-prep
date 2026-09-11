"use client";

import { useEffect, useMemo, useState } from "react";
import { buildOddDigitsPlaceValueSteps, oddDigitsPlaceValueCode } from "../../lib/oddDigitsPlaceValueSteps";

export function OddDigitsPlaceValueVisualizer() {
  const [input, setInput] = useState("123456");
  const [value, setValue] = useState(123456);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);
  const [error, setError] = useState("");
  const steps = useMemo(() => buildOddDigitsPlaceValueSteps(value), [value]);
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
    setError(""); setValue(parsed); setIndex(0); setPlaying(false);
  }

  const placeName = current.place === 1 ? "unități" : current.place === 10 ? "zeci" : current.place === 100 ? "sute" : `poziția ${current.place}`;
  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
      <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/45 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Soluția 2 · o singură parcurgere</p><h2 className="mt-1 text-xl font-semibold text-white">Construirea directă cu poziția p</h2></div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-1.5"><label className="flex items-center gap-2 px-2 text-xs text-slate-400">n = <input aria-label="Număr pentru soluția cu p" inputMode="numeric" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadNumber()} className="w-28 bg-transparent font-mono text-sm text-white outline-none" /></label><button onClick={loadNumber} className="rounded-lg bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-200">Încarcă</button></div>
      </header>
      {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">solutia-cu-p.cpp</span><span>linia {current.line + 1}</span></div>
          <pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{oddDigitsPlaceValueCode.map((line, lineIndex) => <span key={`${lineIndex}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${current.line === lineIndex ? "border-cyan-300 bg-cyan-300/10 text-cyan-100" : lineIndex === 6 ? "border-transparent text-slate-600" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{lineIndex + 1}</span>{line || " "}</span>)}</code></pre>
        </div>

        <div className="relative min-h-[520px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <div className="grid grid-cols-4 gap-2"><Value label="n" value={current.n} color="blue" /><Value label="cifra" value={current.digit ?? "?"} color={current.accepted === false ? "rose" : "amber"} /><Value label="p" value={current.place} color="cyan" /><Value label="rezultat" value={current.result} color="emerald" /></div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/75 p-5">
              <p className="text-center text-xs uppercase tracking-[0.16em] text-slate-500">Poziția pregătită de p</p>
              <div className="mt-4 flex items-center justify-center gap-3"><div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-center"><p className="font-mono text-2xl font-bold text-cyan-200">p = {current.place}</p><p className="mt-1 text-xs text-cyan-400">{placeName}</p></div><span className="text-2xl text-slate-600">+</span><div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-center"><p className="font-mono text-2xl font-bold text-emerald-200">{current.result}</p><p className="mt-1 text-xs text-emerald-400">construit până acum</p></div></div>
              {current.digit !== null && <p className="mt-5 text-center font-mono text-sm text-slate-300"><span className="text-amber-300">{current.digit}</span> × <span className="text-cyan-300">{current.kind === "place" ? current.place / 10 : current.place}</span> + rezultat</p>}
            </div>

            <div className={`mt-5 min-h-28 rounded-xl border p-5 text-center ${current.kind === "decide" ? current.accepted ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10" : "border-slate-700 bg-slate-900/85"}`}><p className="text-sm leading-6 text-slate-200">{current.explanation}</p>{current.kind === "finish" && <p className="mt-2 font-mono text-xl font-bold text-emerald-300">rezultat = {current.result}</p>}</div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/55 px-4 py-4 sm:px-6"><div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-300 transition-all duration-300" style={{ width: `${((index + 1) / steps.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button aria-label="Pasul anterior pentru soluția cu p" disabled={index === 0} onClick={() => { setPlaying(false); setIndex((old) => Math.max(0, old - 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">←</button><button onClick={() => { if (index === steps.length - 1) setIndex(0); setPlaying((old) => !old); }} className="min-w-24 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200">{playing ? "Pauză" : index === steps.length - 1 ? "Reia" : "▶ Pornește"}</button><button aria-label="Pasul următor pentru soluția cu p" disabled={index === steps.length - 1} onClick={() => { setPlaying(false); setIndex((old) => Math.min(steps.length - 1, old + 1)); }} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white disabled:opacity-35">→</button><button onClick={() => { setPlaying(false); setIndex(0); }} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800">Reset</button></div><div className="flex items-center gap-3 text-xs text-slate-400"><span>{index + 1} / {steps.length}</span><label className="flex items-center gap-2">Viteză<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"><option value={2100}>Lent</option><option value={1400}>Normal</option><option value={800}>Rapid</option></select></label></div></div></footer>
    </section>
  );
}

function Value({ label, value, color }: { label: string; value: string | number; color: "blue" | "amber" | "cyan" | "emerald" | "rose" }) {
  const colors = { blue: "border-blue-400/20 text-blue-300", amber: "border-amber-400/20 text-amber-300", cyan: "border-cyan-400/20 text-cyan-300", emerald: "border-emerald-400/20 text-emerald-300", rose: "border-rose-400/20 text-rose-300" };
  return <div className={`rounded-xl border bg-slate-900/70 p-3 text-center ${colors[color]}`}><p className="text-[10px] uppercase">{label}</p><p className="mt-2 overflow-hidden text-ellipsis font-mono text-xl font-bold">{value}</p></div>;
}
