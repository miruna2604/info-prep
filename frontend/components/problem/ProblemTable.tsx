import Link from "next/link";
import type { Problem, ProblemStatus } from "../../types/problem";

type ProblemTableProps = { problems: Problem[] };

const statusStyles: Record<ProblemStatus, string> = {
  rezolvată: "bg-emerald-400/15 text-emerald-300",
  nerezolvată: "bg-slate-800 text-slate-400",
};

export function ProblemTable({ problems }: ProblemTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium">Problemă</th>
            <th className="px-5 py-4 font-medium">Subiect</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {problems.map((problem) => (
            <tr key={problem.id} className="transition-colors hover:bg-slate-800/50">
              <td className="px-5 py-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[problem.status]}`}>
                  {problem.status}
                </span>
              </td>
              <td className="px-5 py-4 font-medium">
                {problem.content ? (
                  <Link href={`/problems/${problem.id}`} className="text-slate-100 hover:text-emerald-300">
                    {problem.title}
                  </Link>
                ) : (
                  <span className="text-slate-100">{problem.title}</span>
                )}
              </td>
              <td className="px-5 py-4 text-slate-400">{problem.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
