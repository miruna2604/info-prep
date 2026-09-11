import { notFound } from "next/navigation";
import { LessonItem } from "../../../../components/chapter/LessonItem";
import { ElementaryAlgorithmSections } from "../../../../components/chapter/ElementaryAlgorithmSections";
import { getChapter, getChapterLessons } from "../../../../services/chapterService";
import { ApiError } from "../../../../services/api";

type ChapterPageProps = { params: Promise<{ chapterSlug: string }> };

async function loadChapterPageData(chapterSlug: string) {
    try {
        return await Promise.all([
          getChapter(chapterSlug),
          getChapterLessons(chapterSlug),
        ]);
    } catch (error) {
        if (error instanceof ApiError && error.status == 404) {
            notFound();
        }
        throw error;
    }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterSlug } = await params;

  if (!chapterSlug) {
    notFound();
  }

  const [chapterResponse, lessonResponses] = await loadChapterPageData(chapterSlug);

  const chapter = {
      id: chapterResponse.slug,
      title: chapterResponse.title,
      description: chapterResponse.description,
      lessons: lessonResponses.map((lesson) => ({
        id: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        completed: false,
        content: lesson.content || undefined,
      })),
  };

  const completedLessons = chapter.lessons.filter((lesson) => lesson.completed).length;

  return (
    <section className={`mx-auto ${chapter.id === "algoritmi-elementari" ? "max-w-5xl" : "max-w-4xl"}`}>
      <p className="text-sm font-medium text-emerald-400">Capitol</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{chapter.title}</h1>
      <p className="mt-3 max-w-2xl text-slate-400">{chapter.description}</p>
      <div className="mt-8 flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-white">Lecții</h2>
        <span className="text-sm text-slate-400">
          {chapter.lessons.length > 0
            ? `${completedLessons} din ${chapter.lessons.length} finalizate`
            : "Lecții în pregătire"}
        </span>
      </div>
      {chapter.lessons.length > 0 && chapter.id === "algoritmi-elementari" ? (
        <ElementaryAlgorithmSections chapterSlug={chapter.id} lessons={chapter.lessons} />
      ) : chapter.lessons.length > 0 ? (
        <div className="mt-4 space-y-3">
          {chapter.lessons.map((lesson, index) => (
            <LessonItem key={lesson.id} lesson={lesson} position={index + 1} chapterSlug={chapter.id} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
          Lecțiile acestui capitol sunt în curs de pregătire.
        </p>
      )}
    </section>
  );
}
