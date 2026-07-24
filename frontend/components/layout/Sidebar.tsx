"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationSections = [
  {
    title: "Învățare",
    items: [
      { label: "Prezentare generală", href: "/" },
      { label: "Capitole", href: "/chapters" },
    ],
  },
  {
    title: "Exersare",
    items: [
      { label: "Probleme", href: "/problems" },
      { label: "Compilator", href: "/compiler" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900/50 md:flex md:flex-col">
      <div className="border-b border-slate-800 px-5 py-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Progresul tău
        </p>
        <p className="mt-2 text-sm font-medium text-slate-200">
          Începe pregătirea pentru Bac
        </p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-0 rounded-full bg-emerald-400" />
        </div>
      </div>

      <nav className="flex-1 space-y-6 p-3">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
              {section.title}
            </p>

            <div className="mt-2 space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    (item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href))
                      ? "bg-slate-800 font-medium text-white"
                      : "text-slate-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <Link
          href="/profile"
          className={`block rounded-md px-3 py-2 text-sm ${
            pathname.startsWith("/profile")
              ? "bg-slate-800 font-medium text-white"
              : "text-slate-400"
          }`}
        >
          Profil
        </Link>
      </div>
    </aside>
  );
}
