import Link from "next/link";
import type { Lesson } from "../../types/chapter";
import {
  elementaryAlgorithmCategories,
  type ElementaryCategoryAccent,
} from "../../lib/elementaryAlgorithmCategories";

type Props = {
  chapterSlug: string;
  lessons: Lesson[];
};

const accentStyles: Record<ElementaryCategoryAccent, {
  border: string;
  glow: string;
  icon: string;
  label: string;
  number: string;
}> = {
  cyan: { border: "border-cyan-400/20", glow: "from-cyan-400/10", icon: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300", label: "text-cyan-300", number: "bg-cyan-400/10 text-cyan-200" },
  violet: { border: "border-violet-400/20", glow: "from-violet-400/10", icon: "border-violet-400/30 bg-violet-400/10 text-violet-300", label: "text-violet-300", number: "bg-violet-400/10 text-violet-200" },
  amber: { border: "border-amber-400/20", glow: "from-amber-400/10", icon: "border-amber-400/30 bg-amber-400/10 text-amber-300", label: "text-amber-300", number: "bg-amber-400/10 text-amber-200" },
  emerald: { border: "border-emerald-400/20", glow: "from-emerald-400/10", icon: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300", label: "text-emerald-300", number: "bg-emerald-400/10 text-emerald-200" },
  rose: { border: "border-rose-400/20", glow: "from-rose-400/10", icon: "border-rose-400/30 bg-rose-400/10 text-rose-300", label: "text-rose-300", number: "bg-rose-400/10 text-rose-200" },
  blue: { border: "border-blue-400/20", glow: "from-blue-400/10", icon: "border-blue-400/30 bg-blue-400/10 text-blue-300", label: "text-blue-300", number: "bg-blue-400/10 text-blue-200" },
  orange: { border: "border-orange-400/20", glow: "from-orange-400/10", icon: "border-orange-400/30 bg-orange-400/10 text-orange-300", label: "text-orange-300", number: "bg-orange-400/10 text-orange-200" },
  lime: { border: "border-lime-400/20", glow: "from-lime-400/10", icon: "border-lime-400/30 bg-lime-400/10 text-lime-300", label: "text-lime-300", number: "bg-lime-400/10 text-lime-200" },
};

export function ElementaryAlgorithmSections({ chapterSlug, lessons }: Props) {
  const lessonPositions = new Map(lessons.map((lesson, index) => [lesson.id, index + 1]));

  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {elementaryAlgorithmCategories.map((category) => {
          const styles = accentStyles[category.accent];
          const availableCount = category.lessons.filter((slug) => lessons.some((lesson) => lesson.id === slug)).length;
          return (
            <Link key={category.id} href={`#${category.id}`} className={`group relative overflow-hidden rounded-2xl border ${styles.border} bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-600`}>
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow} via-transparent to-transparent opacity-70`} />
              <div className="relative flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-bold ${styles.icon}`}>{category.icon}</div>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.label}`}>{category.eyebrow}</p>
                  <h3 className="mt-1 font-semibold text-white group-hover:text-emerald-200">{category.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-slate-400">{category.description}</p>
                  <p className="mt-3 text-xs font-medium text-slate-500">{availableCount} {availableCount === 1 ? "lecție" : "lecții"} · Explorează ↓</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 space-y-12">
        {elementaryAlgorithmCategories.map((category) => {
          const categoryLessons = category.lessons
            .map((slug) => lessons.find((lesson) => lesson.id === slug))
            .filter((lesson): lesson is Lesson => Boolean(lesson));
          const styles = accentStyles[category.accent];
          return (
            <section key={category.id} id={category.id} className="scroll-mt-8">
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${styles.label}`}>{category.eyebrow}</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{category.title}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-400">{category.description}</p>
                </div>
                <span className="hidden shrink-0 text-xs text-slate-500 sm:block">{categoryLessons.length} lecții</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {categoryLessons.map((lesson) => (
                  <Link key={lesson.id} href={`/chapters/${chapterSlug}/lessons/${lesson.id}`} className={`group flex min-h-32 gap-4 rounded-xl border ${styles.border} bg-slate-900 p-4 transition hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-900/80`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${styles.number}`}>{lessonPositions.get(lesson.id)}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-white transition group-hover:text-emerald-200">{lesson.title}</h3>
                      <p className="mt-2 text-sm leading-5 text-slate-400">{lesson.description}</p>
                      <span className={`mt-3 inline-block text-xs font-medium ${styles.label}`}>Deschide animația →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
