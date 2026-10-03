import Link from "next/link";
import { notFound } from "next/navigation";

import { ApiError } from "../../../../services/api";
import { getChapter } from "../../../../services/chapterService";
import { getChapterQuizzes } from "../../../../services/quizService";

export const dynamic = "force-dynamic";

type ChapterQuizzesPageProps = {
  params: Promise<{ chapterSlug: string }>;
};

async function loadPageData(chapterSlug: string) {
  try {
    return await Promise.all([
      getChapter(chapterSlug),
      getChapterQuizzes(chapterSlug),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function ChapterQuizzesPage({
  params,
}: ChapterQuizzesPageProps) {
  const { chapterSlug } = await params;
  const [chapter, quizzes] = await loadPageData(chapterSlug);

  return (
    <section className="mx-auto max-w-4xl">
      <nav className="text-sm text-slate-400">
        <Link href="/quizzes" className="hover:text-slate-200">Quizuri</Link>
      </nav>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
        {chapter.title}
      </h1>
      <p className="mt-3 text-slate-400">
        Alege quizul lecției pe care vrei să o verifici.
      </p>

      {quizzes.length > 0 ? (
        <div className="mt-8 space-y-3">
          {quizzes.map((quiz, index) => (
            <Link
              key={quiz.lesson_slug}
              href={`/quizzes/${chapter.slug}/${quiz.lesson_slug}`}
              className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-emerald-400/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm text-emerald-300">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-medium text-white">{quiz.lesson_title}</h2>
                <p className="mt-1 text-sm text-slate-400">{quiz.title}</p>
              </div>
              <span className="text-sm text-slate-500">
                {quiz.question_count} întrebări
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
          Quizurile acestui capitol sunt în curs de dezvoltare.
        </p>
      )}
    </section>
  );
}
