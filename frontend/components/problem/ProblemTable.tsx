import Link from "next/link";
import type { ProblemSummary } from "../../types/problem";

type ProblemTableProps = { problems: ProblemSummary[] };

export function ProblemTable({ problems }: ProblemTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-5 py-4 font-medium">Problemă</th>
            <th className="px-5 py-4 font-medium">Subiect</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {problems.map((problem) => (
            <tr key={problem.id} className="transition-colors hover:bg-slate-800/50">
              <td className="px-5 py-4 font-medium">
                <Link href={`/problems/${problem.slug}`} className="text-slate-100 hover:text-emerald-300">
                    {problem.title}
                </Link>
              </td>
              <td className="px-5 py-4 text-slate-400">{problem.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
