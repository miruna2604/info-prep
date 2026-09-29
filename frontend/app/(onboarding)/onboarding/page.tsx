"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError } from "../../../services/api";
import { getCurrentUser } from "../../../services/authService";
import { completeOnboarding, getOnboardingStatus } from "../../../services/onboardingService";
import type { Grade, SelfAssessment, StudyProfile } from "../../../types/onboarding";

const NEXT_AFTER_ONBOARDING = "/assessment/start";

const gradeOptions: Array<{ value: Grade; label: string }> = [
  { value: "GRADE_9", label: "Clasa a IX-a" },
  { value: "GRADE_10", label: "Clasa a X-a" },
  { value: "GRADE_11", label: "Clasa a XI-a" },
  { value: "GRADE_12", label: "Clasa a XII-a" },
];

const studyProfileOptions: Array<{ value: StudyProfile; label: string }> = [
  { value: "MATH_INFO", label: "Matematică-informatică" },
  { value: "NATURAL_SCIENCES", label: "Științe ale naturii" },
  { value: "MILITARY", label: "Militar" },
];

const selfAssessmentOptions: Array<{ value: SelfAssessment; label: string; accent: string }> = [
  { value: "BEGINNER", label: "Sunt la început", accent: "text-emerald-400" },
  { value: "BASIC_WITH_GAPS", label: "Știu bazele, dar am multe goluri", accent: "text-amber-300" },
  { value: "COMFORTABLE", label: "Mă descurc destul de bine", accent: "text-blue-300" },
  { value: "ADVANCED", label: "Sunt bine pregătit și vreau să mă perfecționez", accent: "text-violet-300" },
];

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [step, setStep] = useState<Step>(1);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [studyProfile, setStudyProfile] = useState<StudyProfile | null>(null);
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function checkAccess() {
      try {
        await getCurrentUser();
        const status = await getOnboardingStatus();

        if (status.onboardingCompleted) {
          router.replace(NEXT_AFTER_ONBOARDING);
          return;
        }

        if (isCurrent) {
          setIsCheckingAccess(false);
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/login");
          return;
        }

        if (isCurrent) {
          setSubmitError("Nu am putut verifica sesiunea. Încearcă din nou.");
          setIsCheckingAccess(false);
        }
      }
    }

    void checkAccess();
    return () => { isCurrent = false; };
  }, [router]);

  const canContinue = step === 1 ? Boolean(grade) : step === 2 ? Boolean(studyProfile) : Boolean(selfAssessment);
  const question = step === 1 ? "În ce clasă ești?" : step === 2 ? "Ce profil urmezi?" : "Cum simți că stai acum la informatică?";

  function goBack() {
    setSubmitError(null);
    setStep((currentStep) => (currentStep - 1) as Step);
  }

  function goForward() {
    setSubmitError(null);
    setStep((currentStep) => (currentStep + 1) as Step);
  }

  async function finishOnboarding() {
    if (!grade || !studyProfile || !selfAssessment) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await completeOnboarding({ grade, studyProfile, selfAssessment });
      router.replace(NEXT_AFTER_ONBOARDING);
    } catch {
      setSubmitError("Nu am putut salva răspunsurile. Încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCheckingAccess) {
    return <main className="flex min-h-screen items-center justify-center bg-[#06101d] text-sm text-slate-400">Se pregătește onboarding-ul...</main>;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06101d] px-4 py-8 text-slate-100 sm:px-6">
      <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div aria-hidden="true" className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <section className="relative w-full max-w-2xl rounded-2xl border border-slate-700/70 bg-[#07111f]/95 p-6 shadow-2xl shadow-black/30 sm:p-9" aria-labelledby="onboarding-question">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">{"</>"}</span>
          <span className="font-semibold tracking-tight text-white">InfoPrep</span>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between text-sm">
            <p className="font-medium text-emerald-300">Pasul {step} din 3</p>
            <p className="text-slate-500">Mai durează puțin</p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        <div className="mt-10">
          {step === 1 ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">Hai să te cunoaștem</p> : null}
          <h1 id="onboarding-question" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{question}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {step === 1 && "Ne ajută să adaptăm recomandările la etapa în care te afli."}
            {step === 2 && "Salvăm această informație pentru a-ți personaliza experiența pe viitor."}
            {step === 3 && "Este doar o autoevaluare. Nivelul tău va fi evaluat separat."}
          </p>
        </div>

        <fieldset className="mt-7 space-y-3" aria-label={question}>
          <legend className="sr-only">{question}</legend>
          {step === 1 && gradeOptions.map((option) => <OptionCard key={option.value} name="grade" value={option.value} label={option.label} selected={grade === option.value} onSelect={() => setGrade(option.value)} />)}
          {step === 2 && studyProfileOptions.map((option) => <OptionCard key={option.value} name="study-profile" value={option.value} label={option.label} selected={studyProfile === option.value} onSelect={() => setStudyProfile(option.value)} />)}
          {step === 3 && selfAssessmentOptions.map((option) => <OptionCard key={option.value} name="self-assessment" value={option.value} label={option.label} accent={option.accent} selected={selfAssessment === option.value} onSelect={() => setSelfAssessment(option.value)} />)}
        </fieldset>

        {submitError ? <p role="alert" className="mt-5 rounded-lg border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 1 ? <button type="button" onClick={goBack} disabled={isSubmitting} className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-60">← Înapoi</button> : <span />}
          {step < 3 ? <button type="button" onClick={goForward} disabled={!canContinue} className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50">Continuă →</button> : <button type="button" onClick={finishOnboarding} disabled={!canContinue || isSubmitting} className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Se salvează..." : "Finalizează →"}</button>}
        </div>
      </section>
    </main>
  );
}

function OptionCard({ name, value, label, selected, onSelect, accent }: { name: string; value: string; label: string; selected: boolean; onSelect: () => void; accent?: string }) {
  return (
    <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${selected ? "border-emerald-400/70 bg-emerald-400/10 text-white" : "border-slate-700 bg-slate-950/35 text-slate-300 hover:border-slate-500 hover:bg-slate-900"}`}>
      <input type="radio" name={name} value={value} checked={selected} onChange={onSelect} className="sr-only" />
      <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-emerald-300 bg-emerald-400 text-slate-950" : "border-slate-500"}`}>{selected ? "✓" : null}</span>
      {accent ? <span aria-hidden="true" className={accent}>●</span> : null}
      <span className="text-sm font-medium sm:text-base">{label}</span>
    </label>
  );
}
