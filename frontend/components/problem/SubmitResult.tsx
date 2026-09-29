import Link from "next/link";

import type { SubmitSolutionResult } from "../../services/submissionService";

type SubmitResultProps = {
  result: SubmitSolutionResult | null;
  error: string | null;
  requiresLogin: boolean;
};

export function SubmitResult({ result, error, requiresLogin }: SubmitResultProps) {
  if (!result && !error) return null;

  if (error) {
    return (
      <div role="alert" className="rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
        <p>{error}</p>
        {requiresLogin && (
          <Link href="/login" className="mt-2 inline-block font-semibold text-emerald-300 hover:text-emerald-200">
            Intră în cont →
          </Link>
        )}
      </div>
    );
  }

  if (!result) return null;

  const accepted = result.verdict === "Accepted";

  return (
    <div
      role="status"
      className={`rounded-xl border p-4 sm:p-5 ${
        accepted
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
          : "border-amber-400/25 bg-amber-400/10 text-amber-200"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold">Verdict: {result.verdict}</h2>
        <p className="text-sm font-semibold">{result.passedTests} / {result.totalTests} teste trecute</p>
      </div>

      <div className="mt-4 space-y-3">
        {result.tests.map((test) => (
          <div key={test.number} className="rounded-xl border border-slate-700/70 bg-[#07111f]/80 p-4 text-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                    test.status === "passed"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : test.status === "failed"
                        ? "bg-red-400/15 text-red-300"
                        : "bg-slate-700/60 text-slate-400"
                  }`}
                >
                  {test.status === "passed" ? "✓" : test.status === "failed" ? "✗" : "–"}
                </span>
                <h3 className="text-sm font-semibold">Test {test.number}</h3>
                {test.isHidden && <span className="text-xs text-slate-500">ascuns</span>}
              </div>
              <span className="text-xs text-slate-400">
                {test.status === "not_run" ? "Neexecutat" : test.verdict}
              </span>
            </div>

            {!test.isHidden && test.status !== "not_run" && (
              <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                <div>
                  <dt className="mb-1 text-slate-500">Input</dt>
                  <dd className="whitespace-pre-wrap break-words rounded-lg bg-slate-950/70 p-2 font-mono text-slate-200">{test.input || "(gol)"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-slate-500">Așteptat</dt>
                  <dd className="whitespace-pre-wrap break-words rounded-lg bg-slate-950/70 p-2 font-mono text-slate-200">{test.expectedOutput || "(gol)"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-slate-500">Codul tău</dt>
                  <dd className="whitespace-pre-wrap break-words rounded-lg bg-slate-950/70 p-2 font-mono text-slate-200">
                    {test.actualOutput === null ? "(fără rezultat)" : test.actualOutput || "(gol)"}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Datele testelor ascunse rămân private; pentru ele vezi doar verdictul.
      </p>
    </div>
  );
}
