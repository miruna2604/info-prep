import type { ArrayAnimationStep } from "./types";

export function ArrayStage({ step }: { step: ArrayAnimationStep }) {
  const active = new Set(step.activeIndices);
  const gap = 10;
  const cellWidth = 60;
  return <div className="relative min-h-[580px] overflow-hidden p-5 sm:p-6">
    <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(51,65,85,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(51,65,85,.35) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
    <div className="relative">
      <div className="mb-7 flex items-center justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Parcurgerea vectorului</p><p className="mt-1 text-sm text-slate-300">Urmărește valorile și pozițiile evidențiate.</p></div><span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-200">{eventLabel(step.kind)}</span></div>
      <div className="flex flex-wrap justify-center gap-[10px] pt-8">{step.values.map((value, index) => {
        const sorted = step.sortedStart !== null && step.sortedEnd !== null && index >= step.sortedStart && index <= step.sortedEnd;
        const compared = active.has(index);
        const swapping = step.kind === "swap" && step.swapIndices?.includes(index);
        const direction = swapping && step.swapIndices ? (index === step.swapIndices[0] ? 1 : -1) : 0;
        return <div key={index} className={`relative flex h-24 w-[60px] items-end justify-center rounded-xl border pb-4 font-mono text-xl font-bold shadow-lg transition-all duration-700 ease-in-out ${compared ? "z-10 border-fuchsia-300 bg-fuchsia-300/20 text-fuchsia-50 shadow-fuchsia-950/40" : sorted ? "border-emerald-400/40 bg-emerald-400/12 text-emerald-200" : "border-slate-700 bg-slate-900 text-slate-300"}`} style={{ transform: swapping ? `translate(${direction * (cellWidth + gap)}px, -12px)` : compared ? "translateY(-12px)" : "none" }}><span className="absolute -top-6 text-[10px] font-normal text-slate-500">v[{index}]</span>{value ?? "□"}{sorted && <span className="absolute left-2 right-2 top-2 h-1 rounded bg-emerald-400" />}{compared && <span className="absolute -bottom-6 whitespace-nowrap text-[9px] font-semibold text-fuchsia-300">{swapping ? "schimb" : "comparăm"}</span>}</div>;
      })}</div>
      {step.metrics && <div className="mt-10 flex flex-wrap justify-center gap-3">{step.metrics.map((metric) => <div key={metric.label} className="min-w-20 rounded-lg border border-blue-400/20 bg-blue-400/5 px-3 py-2 text-center"><p className="text-[10px] uppercase text-blue-300">{metric.label}</p><p className="mt-1 font-mono font-bold text-white">{metric.value}</p></div>)}</div>}
      {step.activeIndices.length === 2 && <div className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-3 rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5 px-4 py-3 font-mono text-sm"><span className="text-fuchsia-200">{step.comparisonLabels?.[0] ?? "valoarea 1"} = {step.values[step.activeIndices[0]]}</span><span className="text-slate-600">și</span><span className="text-fuchsia-200">{step.comparisonLabels?.[1] ?? "valoarea 2"} = {step.values[step.activeIndices[1]]}</span></div>}
      <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-[0.8fr_1.2fr]"><div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-4 text-center"><p className="text-[10px] uppercase text-fuchsia-300">Acțiune</p><p className="mt-2 text-sm font-semibold text-white">{step.action}</p></div><div className="min-h-24 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center"><p className="text-[10px] uppercase text-slate-500">Ce se întâmplă?</p><p className="mt-2 text-sm leading-6 text-slate-200">{step.explanation}</p></div></div>
      <div className="mt-5 flex flex-wrap justify-center gap-5 text-xs"><span className="flex items-center gap-2 text-fuchsia-300"><span className="h-3 w-3 rounded bg-fuchsia-300/30" />comparăm / schimbăm</span><span className="flex items-center gap-2 text-emerald-300"><span className="h-1 w-4 rounded bg-emerald-400" />poziție finală</span></div>
    </div>
  </div>;
}

function eventLabel(kind: ArrayAnimationStep["kind"]) {
  return ({ highlight: "Urmărim codul", compare: "Comparație", swap: "Interschimbare", move: "Mutare", markSorted: "Poziție fixată", complete: "Sortare completă" })[kind];
}
