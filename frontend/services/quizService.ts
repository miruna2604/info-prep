import { apiFetch } from "./api";

export type QuizSummary = {
  title: string;
  lesson_title: string;
  lesson_slug: string;
  question_count: number;
};

export type QuizOption = {
  id: number;
  text: string;
  display_order: number;
};

export type QuizQuestion = {
  id: number;
  text: string;
  display_order: number;
  options: QuizOption[];
};

export type Quiz = {
  title: string;
  chapter_title: string;
  chapter_slug: string;
  lesson_title: string;
  lesson_slug: string;
  questions: QuizQuestion[];
};

export type QuizResult = {
  correct_answers: number;
  total_questions: number;
  questions: Array<{
    question_id: number;
    selected_option_id: number | null;
    correct_option_id: number;
    is_correct: boolean;
  }>;
};

export async function getChapterQuizzes(
  chapterSlug: string,
): Promise<QuizSummary[]> {
  return apiFetch<QuizSummary[]>(
    `/quizzes/chapters/${encodeURIComponent(chapterSlug)}`,
  );
}

export async function getQuiz(
  chapterSlug: string,
  lessonSlug: string,
): Promise<Quiz> {
  return apiFetch<Quiz>(
    `/quizzes/chapters/${encodeURIComponent(chapterSlug)}/lessons/${encodeURIComponent(lessonSlug)}`,
  );
}

export async function submitQuiz(
  chapterSlug: string,
  lessonSlug: string,
  answers: Array<{ question_id: number; option_id: number }>,
): Promise<QuizResult> {
  return apiFetch<QuizResult>(
    `/quizzes/chapters/${encodeURIComponent(chapterSlug)}/lessons/${encodeURIComponent(lessonSlug)}/submit`,
    {
      method: "POST",
      body: JSON.stringify({ answers }),
    },
  );
}
