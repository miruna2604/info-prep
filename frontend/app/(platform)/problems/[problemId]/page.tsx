import Link from "next/link";
import { notFound } from "next/navigation";
import { ProblemWorkspace } from "../../../../components/problem/ProblemWorkspace";
import { Constraints } from "../../../../components/problem/Constraints";
import { ProblemExamples } from "../../../../components/problem/ProblemExamples";
import { ProblemStatement } from "../../../../components/problem/ProblemStatement";
import { problems } from "../../../../data/problems";

type ProblemPageProps = { params: Promise<{ problemId: string }> };

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { problemId } = await params;
  const problem = problems.find((item) => item.id === problemId);

  if (!problem || !problem.content) notFound();

  return (
    <section className="mx-auto max-w-[1500px]">
      <nav aria-label="Navigare ierarhică" className="mb-5 flex gap-2 text-sm text-slate-400">
        <Link href="/problems" className="hover:text-slate-200">Probleme</Link>
        <span>/</span>
        <span className="truncate text-slate-500">{problem.title}</span>
      </nav>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-5 lg:p-6">
          <ProblemStatement problem={problem} />
          <ProblemExamples examples={problem.content.examples} />
          <Constraints constraints={problem.content.constraints} />
        </article>

        <ProblemWorkspace
          starterCode={problem.content.starterCode}
          initialInput={problem.content.examples[0]?.input ?? ""}
        />
      </div>
    </section>
  );
}
