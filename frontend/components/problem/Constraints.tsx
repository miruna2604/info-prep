type ConstraintsProps = { constraints: string[] };

export function Constraints({ constraints }: ConstraintsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-white">Constrângeri</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
        {constraints.map((constraint) => <li key={constraint}>• {constraint}</li>)}
      </ul>
    </section>
  );
}
