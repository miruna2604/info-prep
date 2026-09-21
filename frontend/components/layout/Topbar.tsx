"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";

import {
  AuthUser,
  getCurrentUser,
  logoutUser,
} from "../../services/authService";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(
    null,
  );
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadCurrentUser() {
      setIsLoadingUser(true);

      try {
        const user = await getCurrentUser();

        if (isCurrentRequest) {
          setCurrentUser(user);
        }
      } catch {
        if (isCurrentRequest) {
          setCurrentUser(null);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingUser(false);
        }
      }
    }

    void loadCurrentUser();

    return () => {
      isCurrentRequest = false;
    };
  }, [pathname]);

  async function handleLogout() {
    setLogoutError(null);
    setIsLoggingOut(true);

    try {
      await logoutUser();

      setCurrentUser(null);
      router.push("/login");
    } catch {
      setLogoutError("Deconectarea nu a reușit. Încearcă din nou.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  const userInitial = currentUser?.username
    .charAt(0)
    .toUpperCase();

  return (
    <header className="app-topbar flex h-16 items-center justify-between border-b border-slate-800/70 bg-[#06101d]/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 font-mono text-sm font-bold text-slate-950">
          {"</>"}
        </div>

        <span className="font-semibold tracking-tight">
          InfoPrep
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {logoutError && (
          <p
            role="alert"
            className="hidden text-xs text-red-300 sm:block"
          >
            {logoutError}
          </p>
        )}

        <button
          type="button"
          aria-label="Notificări"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <span aria-hidden="true">♧</span>
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </button>

        {isLoadingUser ? (
          <div
            aria-label="Se verifică autentificarea"
            className="h-9 w-24 animate-pulse rounded-xl bg-slate-800"
          />
        ) : currentUser ? (
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/55 py-1.5 pl-3 pr-1.5 transition hover:border-slate-700 hover:bg-slate-800"
            >
              <span className="hidden text-right sm:block">
                <span className="block text-sm font-medium text-white">
                  {currentUser.username}
                </span>

                <span className="block max-w-40 truncate text-xs text-slate-500">
                  {currentUser.email}
                </span>
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/15">
                {userInitial}
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="Ieși din cont"
              title="Ieși din cont"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/55 px-3 text-sm font-medium text-slate-400 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-white"
                />
              ) : (
                <>
                  <span aria-hidden="true">↪</span>
                  <span className="hidden lg:inline">Ieși</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Intră în cont
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Creează cont
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}