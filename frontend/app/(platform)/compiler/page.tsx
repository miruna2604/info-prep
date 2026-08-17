import { CompilerWorkspace } from "../../../components/editor/CompilerWorkspace";

const starterCode = `#include <iostream>
using namespace std;

int main() {
  // Scrie codul tău aici

  return 0;
}`;

export default function CompilerPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <CompilerWorkspace starterCode={starterCode} />
    </section>
  );
}