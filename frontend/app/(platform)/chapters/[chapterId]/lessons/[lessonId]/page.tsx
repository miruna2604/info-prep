import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonContent } from "../../../../../../components/lesson/LessonContent";
import { chapters } from "../../../../../../data/chapters";

type LessonPageProps = {
  params: Promise<{ chapterId: string; lessonId: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapterId, lessonId } = await params;
  const chapter = chapters.find((item) => item.id === chapterId);
  const lesson = chapter?.lessons.find((item) => item.id === lessonId);

  if (!chapter || !lesson || !lesson.content) notFound();

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
        <p className="mt-3 max-w-2xl text-slate-400">{lesson.description}</p>
        <p className="mt-4 text-sm text-slate-500">Aproximativ {lesson.durationMinutes} minute</p>
      </header>

      <div className="mt-8">
        <LessonContent lesson={lesson} />
      </div>

      <footer className="mt-12 border-t border-slate-800 pt-6">
        <Link href={`/chapters/${chapter.id}`} className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
          ← Înapoi la capitol
        </Link>
      </footer>
    </section>
  );
}
