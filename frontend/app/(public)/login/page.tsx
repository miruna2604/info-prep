"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../services/api";
import {
  LoginInput,
  loginUser,
} from "../../../services/authService";

const initialFormData: LoginInput = {
  email: "",
  password: "",
};

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "Emailul sau parola sunt incorecte.";
    }

    return error.message;
  }

  return "Nu ne-am putut conecta la server. Încearcă din nou.";
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginInput>(
    initialFormData,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user = await loginUser(formData);
      router.push(user.onboardingCompleted ? "/dashboard" : "/onboarding");
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center overflow-hidden rounded-2xl border border-slate-800/70 bg-[#071424] shadow-2xl shadow-black/20">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51,65,85,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.22) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="relative grid w-full lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between border-b border-slate-800/70 p-6 sm:p-9 lg:min-h-[620px] lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              <span aria-hidden="true">◆</span>
              Bine ai revenit
            </div>

            <h1 className="mt-7 max-w-md text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Continuă de unde
              <span className="block bg-gradient-to-r from-blue-300 to-emerald-400 bg-clip-text text-transparent">
                ai rămas.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-slate-400">
              Intră în cont pentru a continua lecțiile și problemele tale de pregătire pentru Bac.
            </p>

            <div className="mt-9 rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 font-mono text-emerald-300">
                  {"</>"}
                </span>

                <div>
                  <h2 className="font-semibold text-white">
                    Progresul tău te așteaptă
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-400">
                    Lecții, rezultate și soluții păstrate într-un singur loc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            Nu ai încă un cont?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Creează unul gratuit
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-9 lg:p-12">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-[#07111f]/95 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-300">
                  Autentificare
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Intră în cont
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Folosește emailul și parola contului tău.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-bold text-white shadow-lg shadow-blue-500/15">
                {"</>"}
              </div>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-200"
                >
                  Adresă de email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nume@exemplu.ro"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-200"
                >
                  Parolă
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={128}
                  required
                  placeholder="Parola contului tău"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm leading-5 text-red-200"
                >
                  <span
                    aria-hidden="true"
                    className="font-semibold"
                  >
                    !
                  </span>

                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/15 transition hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Se verifică datele...
                  </>
                ) : (
                  <>
                    Intră în cont
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Tokenul de autentificare este păstrat într-un cookie HttpOnly, inaccesibil JavaScriptului.
            </p>

            <div className="mt-6 border-t border-slate-800 pt-5 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-slate-400 transition hover:text-blue-300"
              >
                ← Înapoi la prezentarea generală
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
