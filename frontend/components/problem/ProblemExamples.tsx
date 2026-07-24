import type { ProblemExample } from "../../types/problem";

type ProblemExamplesProps = { examples: ProblemExample[] };

export function ProblemExamples({ examples }: ProblemExamplesProps) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-white">Exemple</h2>
      <div className="mt-4 space-y-4">
        {examples.map((example, index) => (
          <article key={`${example.input}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm font-medium text-slate-300">Exemplul {index + 1}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Intrare</p>
                <pre className="mt-2 font-mono text-sm text-emerald-200"><code>{example.input}</code></pre>
              </div>
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Ieșire</p>
                <pre className="mt-2 font-mono text-sm text-sky-200"><code>{example.output}</code></pre>
              </div>
            </div>
            {example.explanation && <p className="mt-3 text-sm leading-6 text-slate-400">{example.explanation}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
