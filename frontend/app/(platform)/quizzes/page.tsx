import Link from "next/link";

import { getChapters } from "../../../services/chapterService";
import { getChapterQuizzes } from "../../../services/quizService";

export default async function QuizzesPage() {
  const chapters = await getChapters();
  const chaptersWithQuizzes = await Promise.all(
    chapters.map(async (chapter) => ({
      chapter,
      quizzes: await getChapterQuizzes(chapter.slug),
    })),
  );

  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">Verifică ce ai învățat</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Quizuri</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Alege un capitol, apoi quizul corespunzător unei lecții.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chaptersWithQuizzes.map(({ chapter, quizzes }) => (
          <Link
            key={chapter.id}
            href={`/quizzes/${chapter.slug}`}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-slate-700"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-white">{chapter.title}</h2>
              <span className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                {quizzes.length > 0 ? `${quizzes.length} quizuri` : "În curând"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {quizzes.length > 0
                ? "Exersează noțiunile din lecțiile acestui capitol."
                : "Quizurile acestui capitol sunt în curs de dezvoltare."}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
