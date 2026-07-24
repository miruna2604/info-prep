import Link from "next/link";
import type { Lesson } from "../../types/chapter";

type LessonItemProps = { lesson: Lesson; position: number; chapterId: string };

export function LessonItem({ lesson, position, chapterId }: LessonItemProps) {
  const className = "flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors";
  const lessonDetails = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-slate-300">
        {lesson.completed ? "✓" : position}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="font-medium text-white">{lesson.title}</h2>
        <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>
      </div>
      <div className="shrink-0 text-right text-sm text-slate-500">
        <p>{lesson.durationMinutes} min</p>
        {!lesson.content && <p className="mt-1 text-xs">În curând</p>}
      </div>
    </>
  );

  if (lesson.content) {
    return (
      <Link href={`/chapters/${chapterId}/lessons/${lesson.id}`} className={`${className} hover:border-slate-700`}>
        {lessonDetails}
      </Link>
    );
  }

  return <article className={className}>{lessonDetails}</article>;
}
