import Link from "next/link";
import { notFound } from "next/navigation";

import { QuizPlayer } from "../../../../../components/quiz/QuizPlayer";
import { ApiError } from "../../../../../services/api";
import { getQuiz } from "../../../../../services/quizService";

type QuizPageProps = {
  params: Promise<{ chapterSlug: string; lessonSlug: string }>;
};

async function loadQuiz(chapterSlug: string, lessonSlug: string) {
  try {
    return await getQuiz(chapterSlug, lessonSlug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { chapterSlug, lessonSlug } = await params;
  const quiz = await loadQuiz(chapterSlug, lessonSlug);

  return (
    <section className="mx-auto max-w-3xl">
      <nav className="flex flex-wrap gap-2 text-sm text-slate-400">
        <Link href="/quizzes" className="hover:text-slate-200">Quizuri</Link>
        <span>/</span>
        <Link href={`/quizzes/${quiz.chapter_slug}`} className="hover:text-slate-200">
          {quiz.chapter_title}
        </Link>
      </nav>

      <header className="mt-6 border-b border-slate-800 pb-8">
        <p className="text-sm font-medium text-emerald-400">Quiz cu răspuns unic</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {quiz.lesson_title}
        </h1>
        <p className="mt-3 text-slate-400">
          Selectează câte un singur răspuns pentru fiecare întrebare.
        </p>
      </header>

      <div className="mt-8">
        <QuizPlayer quiz={quiz} />
      </div>
    </section>
  );
}
