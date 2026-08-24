import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonContent } from "../../../../../../components/lesson/LessonContent";
import { ApiError } from "../../../../../../services/api";
import { getChapter } from "../../../../../../services/chapterService";
import { getLesson } from "../../../../../../services/lessonService";

type LessonPageProps = {
  params: Promise<{ chapterSlug: string; lessonSlug: string }>;
};

async function loadLessonPageData(chapterSlug: string, lessonSlug: string) {
  try {
    return await Promise.all([
      getChapter(chapterSlug),
      getLesson(chapterSlug, lessonSlug),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapterSlug, lessonSlug } = await params;

  if (!chapterSlug || !lessonSlug) {
    notFound();
  }

  const [chapter, lesson] = await loadLessonPageData(
    chapterSlug,
    lessonSlug,
  );

  if (lesson.chapter_id !== chapter.id) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl">
      <nav aria-label="Navigare ierarhică" className="flex flex-wrap gap-2 text-sm text-slate-400">
        <Link href="/chapters" className="hover:text-slate-200">Capitole</Link>
        <span>/</span>
        <Link href={`/chapters/${chapter.id}`} className="hover:text-slate-200">{chapter.title}</Link>
      </nav>

      <header className="mt-6 border-b border-slate-800 pb-8">
        <p className="text-sm font-medium text-emerald-400">Lecție</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-emerald-300 md:text-5xl">{lesson.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          {lesson.description}
        </p>
      </header>

      {lesson.content ? (
        <div className="mt-8">
          <LessonContent content={lesson.content} />
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
          Materialul complet al lecției este în curs de pregătire.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="font-semibold text-white">Resurse disponibile</h2>
        {lesson.video_url || lesson.pdf_url ? (
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {lesson.video_url && (
              <Link href={lesson.video_url} className="text-emerald-300 hover:text-emerald-200">
                Deschide materialul video
              </Link>
            )}
            {lesson.pdf_url && (
              <Link href={lesson.pdf_url} className="text-emerald-300 hover:text-emerald-200">
                Deschide materialul PDF
              </Link>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-400">
            Momentan nu există resurse atașate acestei lecții.
          </p>
        )}
      </div>

      <section className="mt-10 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5">
        <h2 className="font-semibold text-emerald-100">
          Ai terminat lecția?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Verifică noțiunile parcurse răspunzând la întrebările quizului.
        </p>
        <Link
          href={`/quizzes/${chapter.slug}/${lesson.slug}`}
          className="mt-4 inline-flex rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300"
        >
          Începe quizul lecției
        </Link>
      </section>

      <footer className="mt-12 border-t border-slate-800 pt-6">
        <Link href={`/chapters/${chapter.id}`} className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
          ← Înapoi la capitol
        </Link>
      </footer>
    </section>
  );
}
