export function AlgorithmCodePanel({ code, activeLines }: { code: string[]; activeLines: number[] }) {
  const active = new Set(activeLines);
  return <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-6">
    <div className="mb-3 flex justify-between text-xs text-slate-500"><span className="font-mono">sortare.cpp</span><span>{activeLines.length ? `linia ${activeLines.map((line) => line + 1).join(", ")}` : "—"}</span></div>
    <pre className="max-h-[680px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 py-3 font-mono text-[12px] leading-7"><code>{code.map((line, index) => <span key={`${index}-${line}`} className={`block border-l-2 px-3 transition-colors duration-300 ${active.has(index) ? "border-fuchsia-300 bg-fuchsia-300/10 text-fuchsia-100" : "border-transparent text-slate-400"}`}><span className="mr-3 inline-block w-5 select-none text-right text-slate-700">{index + 1}</span>{line || " "}</span>)}</code></pre>
  </div>;
}
