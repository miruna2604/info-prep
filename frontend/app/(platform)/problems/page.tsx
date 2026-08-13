import { ProblemTable } from "../../../components/problem/ProblemTable";
import { problems } from "../../../data/problems";

export default function ProblemsPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">Exersare</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
        Probleme
      </h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Exersează conceptele de Bac prin probleme organizate pe subiecte.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Total probleme</p>
          <p className="mt-2 text-2xl font-semibold text-white">{problems.length}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Rezolvate</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            {problems.filter((problem) => problem.status === "rezolvată").length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Nerezolvate</p>
          <p className="mt-2 text-2xl font-semibold text-slate-200">
            {problems.filter((problem) => problem.status === "nerezolvată").length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ProblemTable problems={problems} />
      </div>
    </section>
  );
}
