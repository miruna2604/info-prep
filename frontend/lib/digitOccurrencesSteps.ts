export const digitOccurrencesCodeLines = [
  "int n, c, nr = 0;",
  "cin >> n >> c;",
  "",
  "while (n != 0) {",
  "    if (n % 10 == c)",
  "        nr++;",
  "",
  "    n = n / 10;",
  "}",
  "",
  "cout << nr;",
];

export type DigitOccurrencesStep = {
  n: number;
  count: number;
  line: number;
  kind: "start" | "loop-check" | "compare" | "count" | "remove" | "finish";
  activeDigitIndex: number | null;
  currentDigit: number | null;
  matches: boolean | null;
  explanation: string;
};

export function buildDigitOccurrencesSteps(value: number, target: number): DigitOccurrencesStep[] {
  const base = (step: Omit<DigitOccurrencesStep, "n" | "count"> & { n?: number; count?: number }): DigitOccurrencesStep => ({
    n: value,
    count: 0,
    ...step,
  });
  const steps: DigitOccurrencesStep[] = [
    base({ line: 0, kind: "start", activeDigitIndex: null, currentDigit: null, matches: null, explanation: "Declarăm n, cifra căutată c și contorul nr, inițializat cu 0." }),
    base({ line: 1, kind: "start", activeDigitIndex: null, currentDigit: null, matches: null, explanation: `Citim n = ${value} și cifra căutată c = ${target}.` }),
  ];

  let n = Math.abs(value);
  let count = 0;
  while (n !== 0) {
    const remainingDigits = String(n).length;
    const activeDigitIndex = remainingDigits - 1;
    const currentDigit = n % 10;
    const matches = currentDigit === target;
    steps.push(base({ n, count, line: 3, kind: "loop-check", activeDigitIndex, currentDigit, matches: null, explanation: `${n} != 0, deci mai avem o cifră de verificat.` }));
    steps.push(base({ n, count, line: 4, kind: "compare", activeDigitIndex, currentDigit, matches, explanation: `${n} % 10 = ${currentDigit}. ${currentDigit} ${matches ? "este egală" : "nu este egală"} cu cifra căutată ${target}.` }));
    if (matches) {
      count += 1;
      steps.push(base({ n, count, line: 5, kind: "count", activeDigitIndex, currentDigit, matches: true, explanation: `Cifrele sunt egale, deci creștem contorul: nr = ${count}.` }));
    }
    const previousN = n;
    n = Math.trunc(n / 10);
    steps.push(base({ n, count, line: 7, kind: "remove", activeDigitIndex, currentDigit, matches, explanation: `${previousN} / 10 = ${n}. Eliminăm cifra ${currentDigit} și continuăm.` }));
  }

  steps.push(base({ n: 0, count, line: 3, kind: "loop-check", activeDigitIndex: null, currentDigit: null, matches: null, explanation: "n a ajuns la 0, deci bucla se oprește." }));
  steps.push(base({ n: 0, count, line: 10, kind: "finish", activeDigitIndex: null, currentDigit: null, matches: null, explanation: `Afișăm nr = ${count}. Cifra ${target} apare de ${count} ${count === 1 ? "dată" : "ori"} în ${value}.` }));
  return steps;
}
