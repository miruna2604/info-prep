import Link from "next/link";

const features = [
  {
    title: "Lecții care construiesc baza",
    description: "Explicații pas cu pas, exemple clare și concepte esențiale.",
    href: "/chapters",
    icon: "▣",
    accent: "emerald",
  },
  {
    title: "Quizuri pentru verificare rapidă",
    description: "Întrebări după fiecare subiect pentru fixarea cunoștințelor.",
    href: "/quizzes",
    icon: "?",
    accent: "blue",
  },
  {
    title: "Probleme cu evaluare automată",
    description: "Probleme de Bac, testare automată și feedback instant.",
    href: "/problems",
    icon: "</>",
    accent: "emerald",
  },
] as const;

const journey = [
  { number: 1, title: "Învață", description: "Lecții clare, în ordine", icon: "▣" },
  { number: 2, title: "Verifică", description: "Quiz după fiecare lecție", icon: "?" },
  { number: 3, title: "Exersează", description: "Probleme evaluate automat", icon: "</>" },
];

export default function Home() {
  return (
    <div className="home-dashboard relative mx-auto max-w-[1500px] overflow-hidden rounded-2xl border border-slate-800/60 bg-[#071424] shadow-2xl shadow-black/20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51,65,85,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.24) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute left-[18%] top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-20 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="home-dashboard-inner relative p-5 sm:p-7 lg:p-10">
        <section className="home-hero grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl">
            <div className="home-badge inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <span aria-hidden="true">◆</span>
              Pregătire pentru Bac • Informatică
            </div>

            <h1 className="home-title mt-7 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Înțelege informatica.
              <span className="mt-2 block bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Rezolvă cu încredere.
              </span>
            </h1>

            <p className="home-copy mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Lecții clare, quizuri după fiecare subiect și probleme evaluate automat — într-un singur parcurs pentru Bac.
            </p>

            <div className="home-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/chapters"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <span aria-hidden="true">▣</span>
                Explorează capitolele
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-600/80 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <span className="font-mono" aria-hidden="true">{"</>"}</span>
                Rezolvă probleme
              </Link>
            </div>

            <div className="home-trust mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-slate-800 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
              <span className="flex items-center gap-2"><b className="text-emerald-300">▣</b> 14 capitole</span>
              <span className="hidden text-slate-700 sm:inline">•</span>
              <span className="flex items-center gap-2"><b className="text-blue-400">C++</b> pas cu pas</span>
              <span className="hidden text-slate-700 sm:inline">•</span>
              <span className="flex items-center gap-2"><b className="text-emerald-300">ϟ</b> Feedback instant</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#07111f]/95 shadow-2xl shadow-black/35">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <span className="text-slate-500">⌘</span>
                main.cpp
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">▶ Rulează</span>
                <span className="hidden rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 sm:inline">♧ Testare</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-x-auto border-b border-slate-800 p-5 lg:border-b-0 lg:border-r">
                <pre className="home-code min-w-[360px] font-mono text-[13px] leading-6 text-slate-300"><code>{`#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  long long suma = 0, x;
  for (int i = 0; i < n; ++i) {
    cin >> x;
    suma += x;
  }
  cout << suma << '\\n';
  return 0;
}`}</code></pre>
              </div>

              <div className="space-y-4 bg-slate-950/25 p-5 text-sm">
                <div>
                  <p className="text-slate-500">Intrare</p>
                  <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-slate-300">
                    <span className="block text-slate-500">5</span>
                    1 2 3 4 5
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Ieșire așteptată</p>
                  <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-emerald-300">15</div>
                </div>
                <div>
                  <p className="text-slate-500">Ieșirea ta</p>
                  <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-emerald-300">15</div>
                </div>
                <p className="flex items-center gap-2 pt-1 font-medium text-emerald-300">
                  <span aria-hidden="true">✓</span> Toate testele au trecut!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-features mt-8 grid gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="home-feature group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/35 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70"
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border font-mono text-lg ${
                feature.accent === "blue"
                  ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
                  : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              }`}>
                {feature.icon}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold leading-5 text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-5 text-slate-400">{feature.description}</p>
              </div>
              <span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-300">›</span>
            </Link>
          ))}
        </section>

        <section className="home-journey mt-4 grid gap-5 rounded-2xl border border-slate-800 bg-slate-950/30 p-5 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="text-lg font-semibold text-white">Parcursul tău pentru Bac</h2>
            <div className="relative mt-5 grid gap-3 md:grid-cols-3">
              <div className="pointer-events-none absolute left-[15%] right-[15%] top-1/2 hidden h-px bg-slate-700 md:block" />
              {journey.map((step) => (
                <div key={step.number} className="relative z-10 flex items-center gap-3 rounded-xl border border-slate-800 bg-[#091727] p-4">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    step.number === 2 ? "bg-blue-600 text-white" : "bg-emerald-500 text-slate-950"
                  }`}>
                    {step.number}
                  </span>
                  <span className="font-mono text-lg text-slate-500">{step.icon}</span>
                  <div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-slate-700/70 bg-slate-900/65 p-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Începe cu bazele</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Construiește fundația C++ pas cu pas.</p>
            </div>
            <Link
              href="/chapters/bazele-programarii-in-cpp"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <span aria-hidden="true">▣</span>
              Deschide primul capitol
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
