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
      className={`rounded-xl border p-4 ${
        accepted
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
          : "border-amber-400/25 bg-amber-400/10 text-amber-200"
      }`}
    >
      <p className="font-semibold">Verdict: {result.verdict}</p>
      <p className="mt-1 text-sm">Teste trecute: {result.passedTests} din {result.totalTests}</p>
    </div>
  );
}
