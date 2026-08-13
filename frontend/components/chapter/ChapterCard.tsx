import Link from "next/link";
import type { Chapter } from "../../types/chapter";

type ChapterCardProps = { chapter: Chapter };

function getStatus(completedLessons: number, lessonCount: number) {
  if (lessonCount === 0) return { label: "În curând", className: "bg-slate-800 text-slate-400" };
  if (completedLessons === 0) return { label: "Neînceput", className: "bg-slate-800 text-slate-300" };
  if (completedLessons === lessonCount) return { label: "Finalizat", className: "bg-emerald-400/15 text-emerald-300" };
  return { label: "În progres", className: "bg-amber-400/15 text-amber-300" };
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const lessonCount = chapter.lessons.length;
  const completedLessons = chapter.lessons.filter((lesson) => lesson.completed).length;
  const progress = lessonCount === 0 ? 0 : Math.round((completedLessons / lessonCount) * 100);
  const status = getStatus(completedLessons, lessonCount);

  return (
    <Link href={`/chapters/${chapter.id}`} className="block rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-slate-700">
      <div className="flex justify-end">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">{chapter.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{chapter.description}</p>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-400">
          {lessonCount === 0 ? "Lecții în pregătire" : `${completedLessons} / ${lessonCount} lecții`}
        </span>
        {lessonCount > 0 && <span className="font-medium text-slate-200">{progress}%</span>}
      </div>
      {lessonCount > 0 && (
        <div aria-label={`Progres ${chapter.title}: ${progress}%`} className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-emerald-400" style={{ width: `${progress}%` }} />
        </div>
      )}
    </Link>
  );
}
