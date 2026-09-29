"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AssessmentRouteGuard } from "../../../../components/assessment/AssessmentRouteGuard";
import { deferInitialAssessment, getOnboardingStatus } from "../../../../services/onboardingService";

const ASSESSMENT_ROUTE = "/assessment/initial";
const DASHBOARD_ROUTE = "/dashboard";

export default function AssessmentStartPage() {
  return (
    <AssessmentRouteGuard>
      <AssessmentStartContent />
    </AssessmentRouteGuard>
  );
}

function AssessmentStartContent() {
  const router = useRouter();
  const [isDeferring, setIsDeferring] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    void getOnboardingStatus().then((status) => {
      if (status.assessmentStatus === "COMPLETED") router.replace("/assessment/result");
    }).catch(() => { /* The route guard handles access failures. */ });
  }, [router]);

  async function handleDefer() {
    setIsDeferring(true);
    setErrorMessage(null);

    try {
      await deferInitialAssessment();
      router.replace(DASHBOARD_ROUTE);
    } catch {
      setErrorMessage("Nu am putut salva alegerea. Încearcă din nou.");
    } finally {
      setIsDeferring(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06101d] px-4 py-8 text-slate-100 sm:px-6">
      <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div aria-hidden="true" className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <section className="relative w-full max-w-xl rounded-2xl border border-slate-700/70 bg-[#07111f]/95 p-7 text-center shadow-2xl shadow-black/30 sm:p-10">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">{"</>"}</div>
        <div className="mx-auto mt-9 flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
          <span aria-hidden="true">✓</span>
          Profil configurat
        </div>
        <h1 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl">Perfect. 👋</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-slate-300">Acum putem afla mai exact unde te afli cu pregătirea.</p>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">Vei parcurge întrebările pe rând. Poți reveni la răspunsuri înainte să finalizezi evaluarea.</p>

        {errorMessage ? <p role="alert" className="mt-6 rounded-lg border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p> : null}

        <div className="mt-9 flex flex-col items-center gap-3">
          <button type="button" onClick={() => router.push(ASSESSMENT_ROUTE)} disabled={isDeferring} className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60">Începe evaluarea →</button>
          <button type="button" onClick={handleDefer} disabled={isDeferring} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60">{isDeferring ? "Se salvează..." : "O fac mai târziu"}</button>
        </div>
      </section>
    </main>
  );
}
