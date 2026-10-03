import { ChapterCard } from "../../../components/chapter/ChapterCard";
import { getChapterLessons, getChapters, } from "../../../services/chapterService";

export const dynamic = "force-dynamic";

export default async function ChaptersPage() {
    const chapterResponses = await getChapters();

    const chapters = await Promise.all(
      chapterResponses.map(async (chapter) => {
        const lessonResponses = await getChapterLessons(chapter.slug);

        return {
          id: chapter.slug,
          title: chapter.title,
          description: chapter.description,
          lessons: lessonResponses.map((lesson) => ({
            id: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            completed: false,
            content: lesson.content || undefined,
          })),
        };
      }),
    );

  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">
        Parcurs de învățare
      </p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
        Capitole
      </h1>

      <p className="mt-3 max-w-2xl text-slate-400">
        Construiește o bază solidă în C++, un subiect pe rând.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
