import Link from "next/link";
import type { AssessmentResult } from "../../types/assessment";

export function PersonalizedPlan({ plan, compact = false }: { plan: NonNullable<AssessmentResult["plan"]>; compact?: boolean }) {
  const items = compact ? plan.items.slice(0, 3) : plan.items;
  return (
    <section id="plan" className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Pașii următori</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Planul tău inițial</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{plan.context.guidance}</p>
      <ol className="mt-6 space-y-4">
        {items.map((item) => <li key={item.concept} className="flex gap-4 rounded-xl border border-slate-700/60 bg-[#081321] p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-sm text-emerald-300">{item.priority}</span>
          <div>
            <h3 className="font-medium text-slate-100">{item.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.reason}</p>
            <span className="mt-2 inline-block text-xs text-slate-500">{item.status === "recommended" ? "Recomandat" : item.status}</span>
            {item.lesson_route ? <Link href={item.lesson_route} className="ml-4 text-sm text-emerald-300 hover:underline">Deschide lecția →</Link>
              : <p className="mt-2 text-xs text-slate-500">Lecția nu este încă disponibilă.</p>}
          </div>
        </li>)}
      </ol>
      {compact && <Link href="/assessment/result#plan" className="mt-5 inline-block text-sm font-semibold text-emerald-300">Vezi planul complet →</Link>}
    </section>
  );
}
