"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PublicHeader() {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register";

  return (
    <header className="border-b border-slate-800/80 bg-[#06101d]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">
            {"</>"}
          </span>
          <span className="font-semibold tracking-tight text-white">InfoPrep</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm" aria-label="Navigație publică">
          <Link
            href="/chapters"
            className="hidden rounded-lg px-3 py-2 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:inline-flex"
          >
            Materie
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Intră în cont
          </Link>
          {isRegisterPage ? (
            <span
              aria-current="page"
              className="rounded-lg bg-emerald-400 px-3 py-2 font-semibold text-slate-950"
            >
              Creează cont
            </span>
          ) : (
            <Link
              href="/register"
              className="rounded-lg bg-emerald-400 px-3 py-2 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Creează cont
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
