import type { Lesson } from "../../types/chapter";

type LessonContentProps = { lesson: Lesson };

export function LessonContent({ lesson }: LessonContentProps) {
  const content = lesson.content;

  if (!content) return null;

  return (
    <article className="space-y-10">
      {content.videoUrl && (
        <section>
          <h2 className="text-xl font-semibold text-white">Video</h2>
          <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <iframe
              className="h-full w-full"
              src={content.videoUrl}
              title={`Video: ${lesson.title}`}
              allowFullScreen
            />
          </div>
        </section>
      )}

      <section className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <h2 className="font-semibold text-emerald-200">La final vei putea</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {content.objectives.map((objective) => <li key={objective}>• {objective}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Pe scurt</h2>
        <p className="mt-3 leading-7 text-slate-300">{content.introduction}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Intuiție</h2>
        <p className="mt-3 leading-7 text-slate-300">{content.intuition}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Cum funcționează</h2>
        <ol className="mt-4 space-y-3">
          {content.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-emerald-300">{index + 1}</span>
              <span className="pt-0.5 leading-6">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Sintaxă C++</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm leading-6 text-emerald-200"><code>{content.syntax}</code></pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Exemplu explicat</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm leading-6 text-slate-200"><code>{content.exampleCode}</code></pre>
        <p className="mt-4 leading-7 text-slate-300">{content.exampleExplanation}</p>

        {content.exampleTrace && (
          <div className="mt-5 overflow-hidden rounded-xl border border-sky-400/20 bg-sky-400/5">
            <div className="border-b border-sky-400/20 px-4 py-3">
              <h3 className="font-semibold text-sky-200">Execuție pas cu pas</h3>
              <p className="mt-1 text-sm text-slate-400">Urmărește valorile după fiecare repetare a buclei.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-900/70 text-slate-300">
                  <tr>
                    {content.exampleTrace.columns.map((column) => <th key={column} className="px-4 py-3 font-medium">{column}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {content.exampleTrace.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => <td key={`${row[0]}-${index}`} className="px-4 py-3 font-mono">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-sky-400/20 px-4 py-3 text-sm leading-6 text-slate-300">{content.exampleTrace.conclusion}</p>
          </div>
        )}
      </section>

      <aside className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
        <h2 className="font-semibold text-amber-200">Greșeală frecventă</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{content.commonMistake}</p>
      </aside>

      <section>
        <h2 className="text-xl font-semibold text-white">Idei-cheie</h2>
        <ul className="mt-3 space-y-2 text-slate-300">
          {content.keyIdeas.map((idea) => <li key={idea}>• {idea}</li>)}
        </ul>
      </section>
    </article>
  );
}
