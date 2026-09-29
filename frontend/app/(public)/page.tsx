import Link from "next/link";

const benefits = [
  {
    icon: "map",
    title: "Știi exact ce ai de învățat",
    description: "Materia este organizată pe capitole și concepte, ca să ai un traseu clar pentru BAC.",
  },
  {
    icon: "progress",
    title: "Vezi cât ai progresat",
    description: "Urmărești ce ai parcurs și ce mai ai de consolidat.",
  },
  {
    icon: "code",
    title: "Rezolvi probleme direct în C++",
    description: "Scrii cod, îl rulezi și primești rezultatul direct în platformă.",
  },
  {
    icon: "target",
    title: "Descoperi unde ai lacune",
    description: "InfoPrep identifică ce concepte trebuie să mai exersezi.",
  },
] as const;

const steps = [
  ["01", "Aflăm de unde începi", "O evaluare scurtă ne ajută să vedem ce știi deja și unde ai nevoie de ajutor."],
  ["02", "Primești un plan", "InfoPrep îți arată ce merită să înveți și să exersezi în continuare."],
  ["03", "Înveți și exersezi", "Lecții, quiz-uri și probleme C++ într-un singur parcurs."],
  ["04", "Progresezi inteligent", "Identificăm lacunele și revenim asupra conceptelor care îți dau bătăi de cap."],
] as const;

function FeatureIcon({ name }: { name: (typeof benefits)[number]["icon"] }) {
  const paths = {
    map: <><path d="M4 6.5 9 4l6 2.5L20 4v13.5l-5 2.5-6-2.5-5 2.5V6.5Z" /><path d="M9 4v13.5M15 6.5V20" /></>,
    progress: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="m17 7 3-3" /></>,
  };

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-slate-800/80">
        <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Pregătire pentru Bac · Informatică
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Pregătește-te organizat pentru BACUL la{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                INFORMATICĂ.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Vezi ce trebuie să înveți, descoperă unde ai lacune și află mereu care este următorul pas potrivit pentru tine.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
                Începe pregătirea
              </Link>
              <Link href="/chapters" className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-900/70 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800">
                Vezi materia pentru BAC
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-[#0a1930]/90 p-5 shadow-2xl shadow-black/30 sm:p-6">
            <div className="flex items-center gap-2 border-b border-slate-700/70 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-xs font-medium text-slate-400">Preview InfoPrep</span>
            </div>
            <div className="pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">Pregătire Bac</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold text-white">68%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[68%] rounded-full bg-emerald-400" /></div>
              <div className="mt-7 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">Următorul pas</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Vectori · Vector de frecvență</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">Înțelege când și cum folosești frecvențele în probleme.</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-emerald-300">Continuă →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">Tot ce ai nevoie pentru Bac</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Pregătirea ta, într-un singur loc.</h2>
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <FeatureIcon name={benefit.icon} />
              <h3 className="mt-5 text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="mt-2 leading-7 text-slate-400">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950/35">
        <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">Cum funcționează</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Nu știi de unde să începi? InfoPrep te ghidează.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map(([number, title, description]) => (
              <article key={number} className="rounded-xl border border-slate-800 bg-[#071424] p-5">
                <span className="font-mono text-sm font-semibold text-emerald-400">{number}</span>
                <h3 className="mt-5 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 text-sm text-slate-400">Recomandările te ghidează, dar tu alegi întotdeauna ce vrei să studiezi.</p>
          <p className="mt-2 text-xs text-slate-600">Evaluarea inițială, quiz-urile și recomandările personalizate sunt în dezvoltare.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-18 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">Harta materiei</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Toată materia pentru BAC. Organizată.</h2>
          <p className="mt-5 leading-7 text-slate-400">Vezi clar ce trebuie să stăpânești pentru BAC, organizat pe capitole și concepte.</p>
          <Link href="/harta-materiei" className="mt-7 inline-flex rounded-lg border border-slate-600 px-4 py-2.5 font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-300">Explorează Harta Materiei →</Link>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-6 font-mono text-sm leading-7 text-slate-300 sm:p-8">
          <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">Bac Informatică</p>
          <div className="mx-auto mt-3 h-7 w-px bg-slate-600" />
          <div className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            {[["Vectori", "parcurgere", "frecvență", "sortare"], ["Matrici", "parcurgere", "diagonale", "operații"], ["Subprograme", "void", "return", "parametri"]].map(([title, ...items]) => (
              <div key={title} className="rounded-lg border border-slate-700 bg-slate-950/35 p-3">
                <p className="font-sans font-semibold text-white">{title}</p>
                {items.map((item) => <p key={item} className="mt-1 text-slate-500">{item}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-950/35">
        <div className="mx-auto max-w-3xl px-5 py-18 text-center sm:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">Începe acum</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Află de unde începi cu pregătirea pentru bacul la informatică.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">Fă o evaluare scurtă și construiește-ți pregătirea pas cu pas.</p>
          <p className="mt-4 text-sm text-slate-500">Evaluare scurtă · Plan personalizat · Începi gratuit</p>
          <Link href="/register" className="mt-8 inline-flex items-center justify-center rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">Începe pregătirea →</Link>
          <p className="mt-5 text-sm text-slate-400">Ai deja cont? <Link href="/login" className="font-semibold text-emerald-300 transition hover:text-emerald-200">Intră în cont</Link></p>
          <p className="mt-3 text-xs text-slate-600">Evaluarea și planul personalizat sunt în dezvoltare.</p>
        </div>
      </section>

      <footer className="border-t border-slate-800/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><p className="font-semibold text-slate-300">InfoPrep</p><p className="mt-1">Pregătire pentru bacul la informatică.</p></div>
          <p>© 2026 InfoPrep</p>
        </div>
      </footer>
    </div>
  );
}
