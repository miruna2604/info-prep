import { notFound } from "next/navigation";
import { LessonItem } from "../../../../components/chapter/LessonItem";
import { chapters } from "../../../../data/chapters";

type ChapterPageProps = { params: Promise<{ chapterId: string }> };

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const chapter = chapters.find((item) => item.id === chapterId);

  if (!chapter) notFound();

  const completedLessons = chapter.lessons.filter((lesson) => lesson.completed).length;

  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-emerald-400">Capitol</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{chapter.title}</h1>
      <p className="mt-3 max-w-2xl text-slate-400">{chapter.description}</p>
      <div className="mt-8 flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-white">Lecții</h2>
        <span className="text-sm text-slate-400">{completedLessons} din {chapter.lessons.length} finalizate</span>
      </div>
      <div className="mt-4 space-y-3">
        {chapter.lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            position={index + 1}
            chapterId={chapter.id}
          />
        ))}
      </div>
    </section>
  );
}
