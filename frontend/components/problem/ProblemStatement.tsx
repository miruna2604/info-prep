import type { Problem } from "../../types/problem";

type ProblemStatementProps = { problem: Problem };

export function ProblemStatement({ problem }: ProblemStatementProps) {
  const content = problem.content;

  if (!content) return null;

  return (
    <section>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-400/15 px-2.5 py-1 text-xs font-medium text-sky-300">
          {problem.subject}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">{problem.title}</h1>
      <p className="mt-5 leading-7 text-slate-300">{content.statement}</p>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Date de intrare</h2>
          <p className="mt-2 leading-7 text-slate-400">{content.inputFormat}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Date de ieșire</h2>
          <p className="mt-2 leading-7 text-slate-400">{content.outputFormat}</p>
        </div>
      </div>
    </section>
  );
}
