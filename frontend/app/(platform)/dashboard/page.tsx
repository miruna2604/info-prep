"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PersonalizedPlan } from "../../../components/assessment/PersonalizedPlan";
import { getAssessmentResult } from "../../../services/assessmentService";
import type { AssessmentResult } from "../../../types/assessment";

import { ApiError } from "../../../services/api";
import { getOnboardingStatus } from "../../../services/onboardingService";

export default function DashboardPage() {
  const router = useRouter();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function checkOnboarding() {
      try {
        const status = await getOnboardingStatus();

        if (!status.onboardingCompleted) {
          router.replace("/onboarding");
          return;
        }

        if (isCurrent) {
          setAssessmentStatus(status.assessmentStatus);
          if (status.assessmentStatus === "COMPLETED") {
            try {
              const result = await getAssessmentResult();
              if (isCurrent) setAssessmentResult(result);
            } catch { /* Older placeholder attempts may not have graded results. */ }
          }
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/login");
          return;
        }
      } finally {
        if (isCurrent) {
          setIsCheckingOnboarding(false);
        }
      }
    }

    void checkOnboarding();
    return () => { isCurrent = false; };
  }, [router]);

  if (isCheckingOnboarding) {
    return <p className="text-sm text-slate-400">Se pregătește dashboard-ul...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">Prezentare generală</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Pregătirea ta pentru Bac</h1>
      <p className="mt-3 max-w-2xl leading-7 text-slate-400">Alege un capitol ca să începi sau continuă să exersezi cu probleme în C++.</p>
      {assessmentStatus !== "COMPLETED" ? (
        <section className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">Pregătirea ta pentru BAC</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Nivel încă neevaluat</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Fă evaluarea inițială când ești pregătit pentru a primi un punct de plecare mai clar.</p>
          <Link href="/assessment/start" className="mt-4 inline-flex text-sm font-semibold text-emerald-300 transition hover:text-emerald-200">Fă evaluarea inițială →</Link>
        </section>
      ) : null}
      {assessmentResult?.plan && <div className="mt-8"><PersonalizedPlan plan={assessmentResult.plan} compact /></div>}
      {assessmentStatus === "COMPLETED" && <Link href="/assessment/result" className="mt-5 inline-block text-sm text-emerald-300">Vezi rezultatele evaluării →</Link>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/chapters" className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-400/40">
          <p className="text-sm text-slate-400">Începe cu materia</p>
          <h2 className="mt-3 text-lg font-semibold text-white">Explorează capitolele →</h2>
        </Link>
        <Link href="/problems" className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-400/40">
          <p className="text-sm text-slate-400">Aplică ce ai învățat</p>
          <h2 className="mt-3 text-lg font-semibold text-white">Rezolvă probleme →</h2>
        </Link>
      </div>
    </div>
  );
}
