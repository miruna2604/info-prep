export type FrequencyAlgorithmSlug = "vector-frecventa-numarul-aparitiilor" | "vector-aparitii-exista-sau-nu";

export type FrequencyStep = {
  line: number;
  inputIndex: number | null;
  x: number | null;
  frequencies: number[];
  oldValue: number | null;
  newValue: number | null;
  kind: "initialize" | "read-n" | "loop" | "read-x" | "update" | "finish";
  explanation: string;
};

export type FrequencyConfig = {
  title: string;
  mode: "count" | "presence";
  code: string[];
};

const code = (presence: boolean) => [
  "int n, x;",
  "int f[101] = {0};",
  "",
  "cin >> n;",
  "",
  "for (int i = 0; i < n; i++) {",
  "    cin >> x;",
  presence ? "    f[x] = 1;" : "    f[x]++;",
  "}",
];

export const frequencyConfigs: Record<FrequencyAlgorithmSlug, FrequencyConfig> = {
  "vector-frecventa-numarul-aparitiilor": { title: "Vector de frecvență – numărul de apariții", mode: "count", code: code(false) },
  "vector-aparitii-exista-sau-nu": { title: "Vector de apariții – există / nu există", mode: "presence", code: code(true) },
};

export function buildFrequencySteps(values: number[], mode: "count" | "presence"): FrequencyStep[] {
  const size = Math.max(6, ...values) + 1;
  const frequencies = Array(size).fill(0) as number[];
  const snapshot = () => [...frequencies];
  const steps: FrequencyStep[] = [
    { line: 0, inputIndex: null, x: null, frequencies: snapshot(), oldValue: null, newValue: null, kind: "initialize", explanation: "Declarăm n și variabila x, în care vom citi pe rând fiecare valoare." },
    { line: 1, inputIndex: null, x: null, frequencies: snapshot(), oldValue: null, newValue: null, kind: "initialize", explanation: "Inițializăm toate pozițiile vectorului f cu 0. Încă nu am întâlnit nicio valoare." },
    { line: 3, inputIndex: null, x: null, frequencies: snapshot(), oldValue: null, newValue: null, kind: "read-n", explanation: `Citim n = ${values.length}, numărul valorilor care urmează.` },
  ];

  for (let i = 0; i < values.length; i++) {
    const x = values[i];
    steps.push({ line: 5, inputIndex: i, x: null, frequencies: snapshot(), oldValue: null, newValue: null, kind: "loop", explanation: i === 0 ? "Bucla începe cu i = 0. Mai avem o valoare de citit." : `Executăm i++; i devine ${i}. Mai avem o valoare de citit.` });
    steps.push({ line: 6, inputIndex: i, x, frequencies: snapshot(), oldValue: null, newValue: null, kind: "read-x", explanation: `Citim v[${i}] = ${x} în variabila x. Valoarea ${x} ne trimite direct la indexul f[${x}].` });
    const oldValue = frequencies[x];
    frequencies[x] = mode === "count" ? oldValue + 1 : 1;
    const newValue = frequencies[x];
    const explanation = mode === "count"
      ? `La f[${x}] aveam ${oldValue}. Executăm f[${x}]++ și obținem ${newValue}.`
      : oldValue === 0
        ? `f[${x}] era 0. Setăm f[${x}] = 1 pentru a marca faptul că ${x} a apărut.`
        : `f[${x}] este deja 1. Atribuim din nou 1; valoarea rămâne 1 deoarece memorăm doar existența.`;
    steps.push({ line: 7, inputIndex: i, x, frequencies: snapshot(), oldValue, newValue, kind: "update", explanation });
  }

  steps.push({ line: 5, inputIndex: null, x: null, frequencies: snapshot(), oldValue: null, newValue: null, kind: "finish", explanation: `Executăm i++; i devine ${values.length}. Condiția i < n este falsă, deci vectorul este complet.` });
  return steps;
}
