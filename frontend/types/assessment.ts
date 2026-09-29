export type AssessmentQuestion = {
  id: number;
  displayOrder: number;
  prompt: string;
  answerType: string;
  questionConfig: { options?: { id: string; text: string }[]; input_hint?: string };
  allowNotLearned: boolean;
  conceptRefs: string[];
};

export type Assessment = {
  id: number;
  slug: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
};

export type AnswerState = "answered" | "not_learned" | "unanswered";

export type AssessmentAnswer = {
  questionId: number;
  state: AnswerState;
  answerData: Record<string, unknown> | null;
};

export type AssessmentAttempt = {
  id: number;
  assessmentId: number;
  status: "IN_PROGRESS" | "SUBMITTED";
  answers: AssessmentAnswer[];
  questions: AssessmentQuestion[];
};


export type EvidenceClassification = "strong_evidence" | "needs_review" | "not_learned" | "inconclusive";
export type AssessmentOutcome = "correct" | "partial" | "incorrect" | "not_learned" | "unanswered" | "compilation_error";
export type ConceptEvidence = {
  concept: string;
  label: string;
  classification: EvidenceClassification;
  explanation: string;
  sources: { question_id: number; outcome: AssessmentOutcome }[];
};
export type PlanItem = {
  concept: string;
  label: string;
  chapter: string | null;
  reason: string;
  status: string;
  priority: number;
  classification: EvidenceClassification;
  lesson_route: string | null;
};
export type AssessmentResult = {
  attempt_id: number;
  earned_points: number;
  max_points: number;
  assessment_score: number;
  counts: Record<AssessmentOutcome, number>;
  evidence: ConceptEvidence[];
  items: {
    question_id: number;
    order: number;
    prompt: string;
    answer_type: string;
    options: { id: string; text: string }[];
    concepts: { key: string; label: string }[];
    outcome: AssessmentOutcome;
    verdict: string;
    earned_points: number;
    max_points: number;
    passed_tests: number;
    total_tests: number;
    feedback: string;
    explanation: string;
    correct_answer: string | null;
  }[];
  plan: { items: PlanItem[]; context: { grade: string; study_profile: string; guidance: string } } | null;
};
