"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AssessmentRouteGuard } from "../../../../components/assessment/AssessmentRouteGuard";
import { CodeEditor } from "../../../../components/editor/CodeEditor";
import { LessonContent } from "../../../../components/lesson/LessonContent";
import { ApiError } from "../../../../services/api";
import { getAssessmentResult, saveAssessmentAnswer, startInitialAttempt, submitAssessmentAttempt } from "../../../../services/assessmentService";
import type { AssessmentAnswer, AssessmentAttempt } from "../../../../types/assessment";

import { draftMatchesAnswer, restoreAssessmentDrafts, type AssessmentDraft as Draft } from "../../../../lib/assessmentDrafts";
const emptyDraft: Draft = { text: "", notLearned: false };

export default function InitialAssessmentPage() {
  return <AssessmentRouteGuard><InitialAssessmentContent /></AssessmentRouteGuard>;
}

function InitialAssessmentContent() {
  const router = useRouter();
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const draftsRef = useRef<Record<number, Draft>>({});
  const savedAnswers = useRef<Record<number, AssessmentAnswer>>({});
  const dirty = useRef<Set<number>>(new Set());
  const conflict = useRef(false);
  const saveQueue = useRef<Promise<unknown>>(Promise.resolve());
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Răspunsurile se salvează automat.");
  const [error, setError] = useState<string | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    let active = true;
    startInitialAttempt().then((loaded) => {
      if (!active) return;
      if (loaded.status === "SUBMITTED") {
        router.replace(`/assessment/result?attempt=${loaded.id}`);
        return;
      }
      let cache: string | null = null;
      try { cache = sessionStorage.getItem(`assessment-drafts-${loaded.id}`); } catch { /* Storage is optional. */ }
      const restored = restoreAssessmentDrafts(loaded, cache);
      savedAnswers.current = restored.answers;
      dirty.current = restored.dirty;
      if (restored.discarded) {
        setSaveStatus("Au fost încărcate răspunsurile mai noi de pe server. Modificările locale vechi nu au fost aplicate.");
      }
      draftsRef.current = restored.drafts;
      setDrafts(restored.drafts);
      setAttempt(loaded);
    }).catch((failure) => {
      if (active) setError(failure instanceof ApiError ? failure.message : "Nu am putut încărca evaluarea. Reîncarcă pagina.");
    });
    return () => { active = false; if (debounce.current) clearTimeout(debounce.current); };
  }, [router]);

  const questions = attempt?.questions ?? [];
  const question = questions[currentIndex];
  const draft = question ? drafts[question.id] ?? emptyDraft : emptyDraft;
  const total = questions.length;
  const unanswered = questions.filter((item) => {
    const value = drafts[item.id];
    return !value?.notLearned && !value?.text.trim();
  }).length;

  function cacheDirtyDrafts() {
    if (!attempt) return;
    const answers = Object.fromEntries([...dirty.current].map((id) => [id, {
      value: draftsRef.current[id], base: savedAnswers.current[id] ?? null,
    }]));
    try { sessionStorage.setItem(`assessment-drafts-${attempt.id}`, JSON.stringify({ version: 2, answers })); } catch { /* Autosave still works. */ }
  }

  function enqueueSave(questionId: number, value: Draft) {
    if (!attempt || !dirty.current.has(questionId)) return saveQueue.current;
    const state = value.notLearned ? "not_learned" : value.text.trim() ? "answered" : "unanswered";
    const saving = saveQueue.current.catch(() => undefined).then(async () => {
      if (conflict.current) throw new ApiError(409, "Răspunsul a fost modificat în altă filă. Reîncarcă pagina înainte de a continua.");
      try {
        const saved = await saveAssessmentAnswer(
          attempt.id, questionId, state, state === "answered" ? { text: value.text } : null,
          savedAnswers.current[questionId] ?? null,
        );
        savedAnswers.current[questionId] = saved;
        if (draftMatchesAnswer(draftsRef.current[questionId], saved)) dirty.current.delete(questionId);
        else dirty.current.add(questionId);
        cacheDirtyDrafts();
      } catch (failure) {
        if (failure instanceof ApiError && failure.status === 409) {
          conflict.current = true;
          setError(failure.message);
        }
        throw failure;
      }
    });
    saveQueue.current = saving;
    return saving;
  }

  function updateDraft(next: Draft) {
    if (!question || !attempt) return;
    const updated = { ...draftsRef.current, [question.id]: next };
    draftsRef.current = updated;
    setDrafts(updated);
    setConfirmSubmit(false);
    if (draftMatchesAnswer(next, savedAnswers.current[question.id])) dirty.current.delete(question.id);
    else dirty.current.add(question.id);
    cacheDirtyDrafts();
    if (debounce.current) clearTimeout(debounce.current);
    setSaveStatus("Se salvează...");
    debounce.current = setTimeout(() => {
      void enqueueSave(question.id, next).then(() => setSaveStatus("Răspuns salvat.")).catch(() => {
        setSaveStatus("Salvarea a eșuat. Reîncearcă folosind Anterior / Următoarea.");
      });
    }, 500);
  }

  async function navigate(direction: -1 | 1) {
    if (!question) return;
    if (debounce.current) clearTimeout(debounce.current);
    setIsBusy(true);
    setError(null);
    setConfirmSubmit(false);
    try {
      await enqueueSave(question.id, draftsRef.current[question.id] ?? emptyDraft);
      setSaveStatus("Răspuns salvat.");
      setCurrentIndex((index) => index + direction);
    } catch (failure) {
      setError(failure instanceof ApiError ? failure.message : "Nu am putut salva răspunsul. Încearcă din nou.");
    } finally { setIsBusy(false); }
  }

  async function finish(confirmed = false) {
    if (!attempt) return;
    if (unanswered && !confirmed) { setConfirmSubmit(true); return; }
    if (debounce.current) clearTimeout(debounce.current);
    setConfirmSubmit(false);
    setIsBusy(true);
    setError(null);
    try {
      // Wait for autosaves, then persist only edits still unsaved locally.
      await saveQueue.current.catch(() => undefined);
      if (conflict.current) throw new ApiError(409, "Reîncarcă pagina pentru a încărca răspunsurile actuale.");
      for (const id of [...dirty.current]) await enqueueSave(id, draftsRef.current[id]);
      await submitAssessmentAttempt(attempt.id);
      try { sessionStorage.removeItem(`assessment-drafts-${attempt.id}`); } catch { /* Optional local cache. */ }
      router.replace(`/assessment/result?attempt=${attempt.id}`);
    } catch (failure) {
      if (failure instanceof ApiError && failure.status === 409) {
        try {
          await getAssessmentResult(attempt.id);
          router.replace(`/assessment/result?attempt=${attempt.id}`);
          return;
        } catch { /* Continue with the original save error if not submitted. */ }
      }
      setError(failure instanceof ApiError ? failure.message : "Nu am putut finaliza evaluarea. Răspunsurile sunt salvate; încearcă din nou.");
      setIsBusy(false);
    }
  }

  if (!attempt) return <main className="flex min-h-screen items-center justify-center bg-[#06101d] px-4 text-center text-sm text-slate-400">{error ?? "Se încarcă evaluarea..."}</main>;

  return (
    <main className="min-h-screen bg-[#06101d] px-4 py-8 text-slate-100 sm:px-6">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-700/70 bg-[#07111f] p-6 shadow-2xl sm:p-9" aria-busy={isBusy}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">Evaluare inițială</p>
        {question ? <>
          <div className="mt-7 flex justify-between gap-3 text-sm">
            <h1 className="font-medium text-emerald-300">Întrebarea {currentIndex + 1} din {total}</h1>
            <span className="text-slate-500">{Math.round(((currentIndex + 1) / total) * 100)}%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label="Progresul evaluării" aria-valuenow={currentIndex + 1} aria-valuemin={0} aria-valuemax={total}>
            <div className="h-full bg-emerald-400 transition-all" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
          </div>
          <div className="mt-8"><LessonContent content={question.prompt} /></div>
          <div className="mt-7">
            {question.answerType === "multiple_choice" ? (
              <fieldset disabled={draft.notLearned || isBusy} className="space-y-3 disabled:opacity-50">
                <legend className="mb-3 text-sm text-slate-400">Alege o variantă</legend>
                {question.questionConfig.options?.map((option) => (
                  <label key={`${question.id}-${option.id}`} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${draft.text === option.id ? "border-emerald-400 bg-emerald-400/10" : "border-slate-700 bg-slate-900/50"}`}>
                    <input type="radio" name={`question-${question.id}`} value={option.id} checked={draft.text === option.id} onChange={() => updateDraft({ ...draft, text: option.id })} className="mt-1 accent-emerald-400" />
                    <span className="text-slate-400">{option.id}.</span><code className="break-words text-sm">{option.text}</code>
                  </label>
                ))}
                <button type="button" onClick={() => updateDraft({ ...draft, text: "" })} className="text-xs text-slate-400 underline">Șterge selecția</button>
              </fieldset>
            ) : question.answerType === "code" ? (
              <div>
                <p className="mb-3 text-sm leading-6 text-slate-400">{question.questionConfig.input_hint}</p>
                <CodeEditor code={draft.text} editable={!draft.notLearned && !isBusy} compact onCodeChange={(text) => updateDraft({ ...draft, text })} />
              </div>
            ) : (
              <label className="block text-sm text-slate-300">Ce se afișează?
                <input value={draft.text} onChange={(event) => updateDraft({ ...draft, text: event.target.value })} disabled={draft.notLearned || isBusy} maxLength={20000} autoComplete="off" spellCheck={false} className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950/50 p-4 font-mono outline-none focus:border-emerald-400 disabled:opacity-50" />
              </label>
            )}
          </div>
          {question.allowNotLearned && <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-400">
            <input type="checkbox" checked={draft.notLearned} onChange={(event) => updateDraft({ ...draft, notLearned: event.target.checked })} disabled={isBusy} className="h-4 w-4 accent-emerald-400" />
            Nu am învățat încă acest concept
          </label>}
          <p role="status" className="mt-4 text-xs text-slate-500">{saveStatus}</p>
          {error && <p role="alert" className="mt-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
          {confirmSubmit && <div role="alert" className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
            <p className="text-sm text-amber-200">Ai {unanswered} întrebări fără răspuns. Vrei să trimiți evaluarea astfel?</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <button type="button" onClick={() => void finish(true)} className="text-sm font-semibold text-amber-200">Da, trimite evaluarea</button>
              <button type="button" onClick={() => setConfirmSubmit(false)} className="text-sm text-slate-300">Revin la răspunsuri</button>
            </div>
          </div>}
          <div className="mt-8 flex justify-between gap-3">
            <button type="button" onClick={() => void navigate(-1)} disabled={currentIndex === 0 || isBusy} className="rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-40">← Anterior</button>
            {currentIndex < total - 1 ? <button type="button" onClick={() => void navigate(1)} disabled={isBusy} className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50">Următoarea →</button>
              : <button type="button" onClick={() => void finish()} disabled={isBusy} className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50">{isBusy ? "Se corectează..." : "Finalizează evaluarea →"}</button>}
          </div>
          {isBusy && currentIndex === total - 1 && <p role="status" className="mt-4 text-sm text-slate-400">Corectarea codului poate dura câteva minute. Păstrează pagina deschisă.</p>}
        </> : <p className="mt-8 text-slate-400">Nu există întrebări publicate.</p>}
      </section>
    </main>
  );
}
