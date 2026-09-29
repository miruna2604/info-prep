import type { AssessmentAnswer, AssessmentAttempt } from "../types/assessment";

export type AssessmentDraft = { text: string; notLearned: boolean };

export function draftMatchesAnswer(draft: AssessmentDraft, answer?: AssessmentAnswer): boolean {
  const state = draft.notLearned ? "not_learned" : draft.text.trim() ? "answered" : "unanswered";
  return state === (answer?.state ?? "unanswered") &&
    (state !== "answered" || draft.text === answer?.answerData?.text);
}

export function restoreAssessmentDrafts(attempt: AssessmentAttempt, cache: string | null) {
  const answers = Object.fromEntries(attempt.answers.map((answer) => [answer.questionId, answer]));
  const drafts: Record<number, AssessmentDraft> = Object.fromEntries(attempt.answers.map((answer) => [answer.questionId, {
    text: typeof answer.answerData?.text === "string" ? answer.answerData.text : "",
    notLearned: answer.state === "not_learned",
  }]));
  const dirty = new Set<number>();
  let discarded = false;
  try {
    const local = JSON.parse(cache ?? "{}");
    // Old caches lack a server baseline and cannot be safely reconciled.
    if (local?.version === 2) for (const question of attempt.questions) {
      const entry = local.answers?.[question.id];
      const value = entry?.value;
      if (!value || typeof value.text !== "string" || typeof value.notLearned !== "boolean") continue;
      if (JSON.stringify(entry.base) === JSON.stringify(answers[question.id] ?? null)) {
        drafts[question.id] = value;
        if (!draftMatchesAnswer(value, answers[question.id])) dirty.add(question.id);
      } else {
        discarded = true;
      }
    }
  } catch { /* A malformed cache must not prevent server-answer recovery. */ }
  return { answers, drafts, dirty, discarded };
}
