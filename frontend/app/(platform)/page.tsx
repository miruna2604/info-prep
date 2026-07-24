export default function Home() {
  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">Bine ai revenit</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
        Ești gata să te pregătești pentru Bac?
      </h1>

      <p className="mt-3 max-w-2xl text-slate-400">
        Învață conceptele C++, apoi consolidează-le prin probleme practice.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Continuă să înveți</p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Algoritmi și complexitate
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Următoarea ta lecție va apărea aici.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Progres la probleme</p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            0 probleme rezolvate
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Statisticile problemelor vor apărea aici.
          </p>
        </div>
      </div>
    </section>
  );
}
