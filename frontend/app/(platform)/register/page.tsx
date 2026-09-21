"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

import { ApiError } from "../../../services/api";
import {
  AuthUser,
  RegisterInput,
  registerUser,
} from "../../../services/authService";

const accountBenefits = [
  {
    icon: "</>",
    title: "Păstrează-ți progresul",
    description: "Revino oricând la lecțiile și problemele la care lucrezi.",
  },
  {
    icon: "✓",
    title: "Urmărește ce ai rezolvat",
    description: "Vezi clar ce stăpânești și unde mai ai de exersat.",
  },
  {
    icon: "ϟ",
    title: "Primește feedback rapid",
    description: "Trimite soluții și învață din fiecare încercare.",
  },
] as const;

const initialFormData: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

function getRegisterErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return "Nu am putut crea contul. Verifică conexiunea și încearcă din nou.";
  }

  if (error.message === "Email is already registered") {
    return "Există deja un cont cu această adresă de email.";
  }

  if (error.message === "Username is already registered") {
    return "Acest nume de utilizator este deja folosit.";
  }

  return error.message;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterInput>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<AuthUser | null>(null);

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
      const user = await registerUser(formData);

      setRegisteredUser(user);
      setFormData(initialFormData);
    } catch (error) {
      setErrorMessage(getRegisterErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCreateAnotherAccount() {
    setRegisteredUser(null);
    setErrorMessage(null);
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
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative grid w-full lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between border-b border-slate-800/70 p-6 sm:p-9 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <span aria-hidden="true">◆</span>
              Contul tău InfoPrep
            </div>

            <h1 className="mt-7 max-w-md text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Progresul tău începe
              <span className="block bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                cu primul pas.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-slate-400">
              Creează-ți contul și construiește un parcurs clar de pregătire pentru Bac, de la primele concepte până la probleme complete.
            </p>

            <div className="mt-9 space-y-4">
              {accountBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 font-mono text-sm font-semibold text-emerald-300">
                    {benefit.icon}
                  </span>
                  <div>
                    <h2 className="font-semibold text-white">{benefit.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Ai deja un cont? Pagina de autentificare urmează în pasul următor.
          </p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-9 lg:p-12">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-[#07111f]/95 p-6 shadow-2xl shadow-black/30 sm:p-8">
            {registeredUser ? (
              <div className="py-4 text-center" aria-live="polite">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-400/15 text-3xl text-emerald-300 shadow-lg shadow-emerald-500/10">
                  ✓
                </div>
                <p className="mt-6 text-sm font-medium text-emerald-400">
                  Cont creat cu succes
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Bine ai venit, {registeredUser.username}!
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Contul pentru <span className="font-medium text-slate-200">{registeredUser.email}</span> a fost salvat în siguranță.
                </p>

                <div className="mt-7 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4 text-left">
                  <p className="text-sm font-medium text-blue-300">
                    Următorul pas
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-400">
                    Vom adăuga pagina de autentificare pentru ca apoi să îți poți accesa progresul.
                  </p>
                </div>

                <Link
                  href="/"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Continuă către platformă
                  <span aria-hidden="true">→</span>
                </Link>
                <button
                  type="button"
                  onClick={handleCreateAnotherAccount}
                  className="mt-3 text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  Creează un alt cont
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Începe acum</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      Creează-ți contul
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Completează cele trei câmpuri de mai jos.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400 font-mono text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/15">
                    {"</>"}
                  </div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-slate-200"
                >
                  Nume de utilizator
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  minLength={3}
                  maxLength={50}
                  required
                  placeholder="ex. miruna26"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Între 3 și 50 de caractere.
                </p>
              </div>

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
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/10"
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
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                  placeholder="Minimum 8 caractere"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Folosește o parolă unică, de cel puțin 8 caractere.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm leading-5 text-red-200"
                >
                  <span aria-hidden="true" className="font-semibold">!</span>
                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                    />
                    Se creează contul...
                  </>
                ) : (
                  <>
                    Creează contul
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Prin crearea contului, datele tale vor fi folosite doar pentru funcțiile platformei.
            </p>

              </>
            )}

            <div className="mt-6 border-t border-slate-800 pt-5 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-slate-400 transition hover:text-emerald-300"
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
