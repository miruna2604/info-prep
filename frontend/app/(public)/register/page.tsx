"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { ApiError } from "../../../services/api";
import {
  RegisterInput,
  registerUser,
} from "../../../services/authService";

type FormField = keyof RegisterInput;
type FormErrors = Partial<Record<FormField, string>>;

const accountBenefits = [
  {
    icon: "</>",
    title: "Păstrează-ți progresul",
    description: "Lecțiile, quiz-urile și problemele tale rămân salvate într-un singur loc.",
  },
  {
    icon: "◎",
    title: "Descoperă unde ai lacune",
    description: "Vezi ce stăpânești și ce concepte mai trebuie exersate.",
  },
  {
    icon: "→",
    title: "Știi mereu ce urmează",
    description: "Primești recomandări pentru următorul pas din pregătirea ta.",
  },
] as const;

const initialFormData: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

function getFieldError(field: FormField, value: string): string | undefined {
  const trimmedValue = value.trim();

  if (field === "username") {
    if (trimmedValue.length < 3) {
      return "Introdu un nume de utilizator de cel puțin 3 caractere.";
    }

    if (trimmedValue.length > 50) {
      return "Numele de utilizator poate avea cel mult 50 de caractere.";
    }
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return "Introdu o adresă de email validă.";
  }

  if (field === "password" && value.length < 8) {
    return "Parola trebuie să aibă cel puțin 8 caractere.";
  }
}

function validateForm(formData: RegisterInput): FormErrors {
  return {
    username: getFieldError("username", formData.username),
    email: getFieldError("email", formData.email),
    password: getFieldError("password", formData.password),
  };
}

function getRegisterError(error: unknown): {
  field?: FormField;
  message: string;
} {
  if (error instanceof ApiError) {
    if (error.message === "Email is already registered") {
      return {
        field: "email",
        message: "Există deja un cont cu această adresă de email.",
      };
    }

    if (error.message === "Username is already registered") {
      return {
        field: "username",
        message: "Acest nume de utilizator este deja folosit.",
      };
    }
  }

  return { message: "Nu am putut crea contul. Încearcă din nou." };
}

function PasswordVisibilityIcon({ isVisible }: { isVisible: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {isVisible ? (
        <>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      ) : (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17.7 17.7 0 0 1-3.3 3.8M6.2 6.2A17.6 17.6 0 0 0 2.5 12S6 18 12 18c.5 0 1 0 1.5-.1" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
      )}
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterInput>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const field = name as FormField;

    setFormData((currentFormData) => ({ ...currentFormData, [field]: value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    setGeneralError(null);
  }

  function handleFieldBlur(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as FormField;
    const error = getFieldError(field, event.target.value);

    setFieldErrors((currentErrors) => ({ ...currentErrors, [field]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setFieldErrors(nextErrors);
    setGeneralError(null);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser(formData);
      router.replace("/onboarding");
    } catch (error) {
      const registerError = getRegisterError(error);

      if (registerError.field) {
        setFieldErrors({ [registerError.field]: registerError.message });
      } else {
        setGeneralError(registerError.message);
      }
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
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative grid w-full lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col border-b border-slate-800/70 p-6 sm:p-9 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <span aria-hidden="true">◆</span>
              Contul tău InfoPrep
            </div>

            <h1 className="mt-7 max-w-md text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Pregătirea ta începe
              <span className="block bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                cu primul pas.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-slate-400">
              Creează-ți contul, iar apoi te ajutăm să afli de unde începi și ce merită să înveți în continuare.
            </p>

            <div className="mt-9 space-y-4">
              {accountBenefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 font-mono text-sm font-semibold text-emerald-300">
                    {benefit.icon}
                  </span>
                  <div>
                    <h2 className="font-semibold text-white">{benefit.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-9 lg:p-12">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-[#07111f]/95 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Începe acum</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Creează-ți contul</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Durează mai puțin de un minut.</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400 font-mono text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/15">{"</>"}</div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="username" className="text-sm font-medium text-slate-200">Nume de utilizator</label>
                    <input id="username" name="username" type="text" autoComplete="username" minLength={3} maxLength={50} required placeholder="ex. miruna26" value={formData.username} onChange={handleInputChange} onBlur={handleFieldBlur} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.username)} aria-describedby="username-help username-error" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60" />
                    {fieldErrors.username ? <p id="username-error" role="alert" className="mt-2 text-xs text-red-300">{fieldErrors.username}</p> : <p id="username-help" className="mt-2 text-xs text-slate-500">Între 3 și 50 de caractere.</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-slate-200">Adresă de email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required placeholder="nume@exemplu.ro" value={formData.email} onChange={handleInputChange} onBlur={handleFieldBlur} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/10 disabled:cursor-not-allowed disabled:opacity-60" />
                    {fieldErrors.email ? <p id="email-error" role="alert" className="mt-2 text-xs text-red-300">{fieldErrors.email}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-slate-200">Parolă</label>
                    <div className="relative mt-2">
                      <input id="password" name="password" type={isPasswordVisible ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={128} required placeholder="Minimum 8 caractere" value={formData.password} onChange={handleInputChange} onBlur={handleFieldBlur} disabled={isSubmitting} aria-invalid={Boolean(fieldErrors.password)} aria-describedby="password-help password-error" className="w-full rounded-xl border border-slate-700 bg-slate-950/55 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60" />
                      <button type="button" onClick={() => setIsPasswordVisible((isVisible) => !isVisible)} aria-label={isPasswordVisible ? "Ascunde parola" : "Afișează parola"} title={isPasswordVisible ? "Ascunde parola" : "Afișează parola"} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" disabled={isSubmitting}>
                        <PasswordVisibilityIcon isVisible={isPasswordVisible} />
                      </button>
                    </div>
                    {fieldErrors.password ? <p id="password-error" role="alert" className="mt-2 text-xs text-red-300">{fieldErrors.password}</p> : <p id="password-help" className="mt-2 text-xs text-slate-500">Folosește o parolă de cel puțin 8 caractere.</p>}
                  </div>

                  {generalError ? <div role="alert" className="flex gap-3 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm leading-5 text-red-200"><span aria-hidden="true" className="font-semibold">!</span><p>{generalError}</p></div> : null}

                  <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0">
                    {isSubmitting ? <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />Se creează contul...</> : <>Creează contul <span aria-hidden="true">→</span></>}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-400">Ai deja cont? <Link href="/login" className="font-semibold text-emerald-300 transition hover:text-emerald-200">Intră în cont</Link></p>
                <p className="mt-4 text-center text-xs leading-5 text-slate-500">Prin crearea contului, datele tale vor fi folosite pentru funcționarea contului și a progresului InfoPrep.</p>
            </>

            <div className="mt-6 border-t border-slate-800 pt-5 text-center">
              <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-emerald-300">← Înapoi la prezentarea generală</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
