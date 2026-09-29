"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AssessmentRouteGuard } from "../../../../components/assessment/AssessmentRouteGuard";
import { PersonalizedPlan } from "../../../../components/assessment/PersonalizedPlan";
import { LessonContent } from "../../../../components/lesson/LessonContent";
import { getAssessmentResult } from "../../../../services/assessmentService";
import { ApiError } from "../../../../services/api";
import type { AssessmentResult, EvidenceClassification, AssessmentOutcome } from "../../../../types/assessment";

const groups: { key: EvidenceClassification; title: string; color: string }[] = [
  { key: "strong_evidence", title: "Te-ai descurcat bine", color: "border-emerald-400/30 bg-emerald-400/5" },
  { key: "needs_review", title: "De consolidat", color: "border-amber-400/30 bg-amber-400/5" },
  { key: "not_learned", title: "Neînvățat încă", color: "border-sky-400/30 bg-sky-400/5" },
  { key: "inconclusive", title: "Nu avem suficiente informații", color: "border-slate-700 bg-slate-900/40" },
];
const outcomes: Record<AssessmentOutcome, string> = {
  correct: "Corect", partial: "Parțial", incorrect: "Greșit", not_learned: "Neînvățat", unanswered: "Fără răspuns", compilation_error: "Eroare de compilare",
};
const verdicts: Record<string, string> = {
  accepted: "Acceptat", wrong_answer: "Rezultat incorect", compilation_error: "Eroare de compilare",
  runtime_error: "Eroare de execuție", time_limit_exceeded: "Limită de timp depășită", constraint_violation: "Restricțiile cerinței nu sunt respectate",
  not_learned: "Neînvățat", unanswered: "Fără răspuns",
};
const number = (value: number) => value.toLocaleString("ro-RO", { maximumFractionDigits: 2 });

export default function AssessmentResultPage() {
  return <AssessmentRouteGuard><ResultContent /></AssessmentRouteGuard>;
}

function ResultContent() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const requested = new URLSearchParams(window.location.search).get("attempt");
    const id = requested && /^\d+$/.test(requested) ? Number(requested) : undefined;
    getAssessmentResult(id).then((loaded) => { if (active) setResult(loaded); }).catch((failure) => {
      if (active) setError(failure instanceof ApiError ? failure.message : "Nu am putut încărca rezultatul. Reîncarcă pagina.");
    });
    return () => { active = false; };
  }, []);

  if (!result) return <main className="min-h-screen bg-[#06101d] px-6 py-20 text-center text-slate-400"><p role="status">{error ?? "Se încarcă rezultatul..."}</p>{error && <Link href="/assessment/start" className="mt-6 inline-block text-emerald-300">Mergi la evaluare →</Link>}</main>;

  return <main className="min-h-screen bg-[#06101d] px-4 py-10 text-slate-100 sm:px-6">
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="rounded-2xl border border-slate-700 bg-[#081321] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-emerald-400">Evaluare inițială</p>
        <h1 className="mt-3 text-3xl font-bold">Evaluarea ta</h1>
        <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-2">
          <p className="text-5xl font-semibold text-emerald-300">{number(result.earned_points)} <span className="text-2xl text-slate-500">/ {result.max_points}</span></p>
          <p className="text-xl text-slate-300">{number(result.assessment_score)}% <span className="text-sm text-slate-500">la această evaluare</span></p>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800" role="meter" aria-label="Scorul evaluării" aria-valuenow={result.assessment_score} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-emerald-400" style={{ width: `${result.assessment_score}%` }} />
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">Acesta este rezultatul acestei evaluări, nu un procent de stăpânire a materiei. O singură întrebare oferă un indiciu, nu o concluzie completă despre un concept.</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {(Object.entries(outcomes) as [AssessmentOutcome, string][]).map(([key, label]) => <div key={key} className="rounded-xl bg-slate-900 p-3"><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 text-xl">{result.counts[key]}</dd></div>)}
        </dl>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-emerald-300"><a href="#plan">Vezi planul tău ↓</a><Link href="/dashboard">Mergi la dashboard →</Link></div>
      </header>

      <section aria-label="Diagnosticul pe concepte" className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => {
          const evidence = result.evidence.filter((item) => item.classification === group.key);
          return <div key={group.key} className={`rounded-2xl border p-6 ${group.color}`}>
            <h2 className="text-lg font-semibold">{group.title}</h2>
            {evidence.length ? <ul className="mt-4 space-y-4">{evidence.map((item) => <li key={item.concept}>
              <p className="text-sm text-slate-200">{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{item.explanation}</p>
            </li>)}</ul> : <p className="mt-4 text-sm text-slate-500">Niciun concept în această categorie la evaluarea curentă.</p>}
          </div>;
        })}
      </section>

      {result.plan && <PersonalizedPlan plan={result.plan} />}

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Rezultatul fiecărui exercițiu</h2>
        <div className="space-y-3">{result.items.map((item) => {
          const correctOption = item.options.find((option) => option.id === item.correct_answer);
          return <details key={item.question_id} className="rounded-xl border border-slate-700 bg-[#081321] p-5">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 text-sm">
              <span>Întrebarea {item.order} · <span className={item.outcome === "correct" ? "text-emerald-300" : "text-slate-300"}>{outcomes[item.outcome]}</span></span>
              <span className="text-slate-400">{number(item.earned_points)} / {item.max_points} puncte</span>
            </summary>
            <div className="mt-6"><LessonContent content={item.prompt} /></div>
            {item.correct_answer && <p className="mt-5 text-sm text-emerald-200">Răspuns corect: <code>{item.correct_answer}{correctOption ? `. ${correctOption.text}` : ""}</code></p>}
            {item.answer_type === "code" && <p className="mt-5 text-sm text-slate-300">{verdicts[item.verdict] ?? item.verdict}{item.total_tests > 0 ? ` · ${item.passed_tests}/${item.total_tests} teste trecute` : ""}</p>}
            {item.feedback && <p className="mt-3 text-sm leading-6 text-slate-400">{item.feedback}</p>}
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.explanation}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{item.concepts.map((concept) => <li key={concept.key} className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400">{concept.label}</li>)}</ul>
          </details>;
        })}</div>
      </section>
      <Link href="/dashboard" className="inline-flex rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-slate-950">Continuă pregătirea →</Link>
    </div>
  </main>;
}
