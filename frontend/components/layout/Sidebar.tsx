"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Prezentare generală", href: "/", icon: "⌂" },
  { label: "Capitole", href: "/chapters", icon: "▣" },
  { label: "Harta materiei", href: "/harta-materiei", icon: "⑂" },
  { label: "Quizuri", href: "/quizzes", icon: "?" },
  { label: "Probleme", href: "/problems", icon: "</>" },
  { label: "Compilator", href: "/compiler", icon: ">_" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-800/80 bg-[#050d18] md:flex md:min-h-screen md:flex-col">
      <Link href="/" className="flex h-16 items-center gap-3 border-b border-slate-800/70 px-5">
        <div className="font-mono text-xl font-bold text-emerald-400">{"</>"}</div>
        <span className="font-semibold tracking-tight text-white">InfoPrep</span>
      </Link>

      <nav className="flex-1 space-y-2 p-3 pt-5">
        {navigationItems.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors ${
                isActive
                  ? "border-emerald-400/25 bg-slate-800/80 font-medium text-white shadow-[inset_3px_0_0_#34d399]"
                  : "border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center font-mono text-sm ${isActive ? "text-emerald-300" : "text-slate-500"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        <div
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-slate-600"
          title="Profilul va fi disponibil după implementarea autentificării"
        >
          <span className="flex h-7 w-7 items-center justify-center text-lg">♙</span>
          Profil
          <span className="ml-auto text-[10px] uppercase tracking-wider">Curând</span>
        </div>
      </nav>

      <div className="m-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Pregătire BAC</p>
        <p className="mt-2 text-sm leading-5 text-slate-300">Învață. Verifică. Exersează.</p>
      </div>
    </aside>
  );
}
