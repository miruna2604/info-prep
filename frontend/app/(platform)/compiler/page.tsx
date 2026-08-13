import { CompilerWorkspace } from "../../../components/editor/CompilerWorkspace";
import { RunButtons } from "../../../components/editor/RunButtons";

const starterCode = `#include <iostream>
using namespace std;

int main() {
  // Scrie codul tău aici

  return 0;
}`;

export default function CompilerPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-400">Exersare</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Compilator C++
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Scrie și testează orice program C++.
          </p>
        </div>

        <RunButtons showSubmit={false} />
      </div>

      <CompilerWorkspace starterCode={starterCode} />

      <p className="mt-3 text-xs text-slate-600">
        Rularea codului va fi activată după conectarea la Judge0.
      </p>
    </section>
  );
}
