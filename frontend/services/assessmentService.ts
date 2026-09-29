import { apiFetch } from "./api";
import type {
  AnswerState,
  Assessment,
  AssessmentAnswer,
  AssessmentAttempt,
  AssessmentQuestion,
  AssessmentResult,
} from "../types/assessment";

type AssessmentQuestionApi = {
  id: number;
  display_order: number;
  prompt: string;
  answer_type: string;
  question_config: AssessmentQuestion["questionConfig"];
  allow_not_learned: boolean;
  concept_refs: string[];
};

type AssessmentApi = {
  id: number;
  slug: string;
  title: string;
  description: string;
  questions: AssessmentQuestionApi[];
};

type AssessmentAnswerApi = {
  question_id: number;
  state: AnswerState;
  answer_data: Record<string, unknown> | null;
};

type AssessmentAttemptApi = {
  id: number;
  assessment_id: number;
  status: "IN_PROGRESS" | "SUBMITTED";
  answers: AssessmentAnswerApi[];
  questions: AssessmentQuestionApi[];
};

function mapQuestion(question: AssessmentQuestionApi): AssessmentQuestion {
  return {
    id: question.id,
    displayOrder: question.display_order,
    prompt: question.prompt,
    answerType: question.answer_type,
    questionConfig: question.question_config,
    allowNotLearned: question.allow_not_learned,
    conceptRefs: question.concept_refs,
  };
}

function mapAnswer(answer: AssessmentAnswerApi): AssessmentAnswer {
  return {
    questionId: answer.question_id,
    state: answer.state,
    answerData: answer.answer_data,
  };
}

function mapAttempt(attempt: AssessmentAttemptApi): AssessmentAttempt {
  return {
    id: attempt.id,
    assessmentId: attempt.assessment_id,
    status: attempt.status,
    answers: attempt.answers.map(mapAnswer),
    questions: attempt.questions.map(mapQuestion),
  };
}

export async function getInitialAssessment(): Promise<Assessment> {
  const response = await apiFetch<AssessmentApi>("/assessments/initial");
  return {
    id: response.id,
    slug: response.slug,
    title: response.title,
    description: response.description,
    questions: response.questions.map(mapQuestion),
  };
}

export async function startInitialAttempt(): Promise<AssessmentAttempt> {
  return mapAttempt(await apiFetch<AssessmentAttemptApi>("/assessments/initial/attempts", {
    method: "POST",
  }));
}

export async function saveAssessmentAnswer(
  attemptId: number,
  questionId: number,
  state: AnswerState,
  answerData: Record<string, unknown> | null,
  expectedAnswer: AssessmentAnswer | null,
): Promise<AssessmentAnswer> {
  const response = await apiFetch<AssessmentAnswerApi>(
    `/assessments/attempts/${attemptId}/answers/${questionId}`,
    { method: "PUT", body: JSON.stringify({ state, answer_data: answerData, expected_answer: expectedAnswer
      ? { state: expectedAnswer.state, answer_data: expectedAnswer.answerData } : null }) },
  );
  return mapAnswer(response);
}

export async function submitAssessmentAttempt(attemptId: number): Promise<AssessmentAttempt> {
  return mapAttempt(await apiFetch<AssessmentAttemptApi>(
    `/assessments/attempts/${attemptId}/submit`, { method: "POST" },
  ));
}


export function getAssessmentResult(attemptId?: number): Promise<AssessmentResult> {
  return apiFetch<AssessmentResult>(attemptId
    ? `/assessments/attempts/${attemptId}/result`
    : "/assessments/initial/result");
}
