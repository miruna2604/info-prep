export const countDigitsCodeLines = [
  "int n, nr = 0;",
  "cin >> n;",
  "if (n == 0)",
  "    nr = 1;",
  "else {",
  "    while (n != 0) {",
  "        nr++;",
  "        n = n / 10;",
  "    }",
  "}",
  "cout << nr;",
];

export type CountDigitsStep = {
  n: number;
  count: number;
  line: number;
  kind: "start" | "zero-check" | "loop-check" | "count" | "remove" | "finish";
  activeDigitIndex: number | null;
  explanation: string;
};

export function buildCountDigitsSteps(value: number): CountDigitsStep[] {
  const steps: CountDigitsStep[] = [
    {
      n: value,
      count: 0,
      line: 0,
      kind: "start",
      activeDigitIndex: null,
      explanation: "Declarăm n și inițializăm contorul nr cu 0.",
    },
    {
      n: value,
      count: 0,
      line: 1,
      kind: "start",
      activeDigitIndex: null,
      explanation: `Citim valoarea ${value} în variabila n.`,
    },
    {
      n: value,
      count: 0,
      line: 2,
      kind: "zero-check",
      activeDigitIndex: null,
      explanation:
        value === 0
          ? "n este 0. Acesta este cazul special: numărul 0 are o cifră."
          : `${value} nu este 0, deci trecem la ramura else.`,
    },
  ];

  if (value === 0) {
    steps.push({
      n: 0,
      count: 1,
      line: 3,
      kind: "count",
      activeDigitIndex: 0,
      explanation: "Atribuim nr = 1, deoarece cifra 0 trebuie numărată.",
    });
  } else {
    let n = value;
    let count = 0;
    const totalDigits = String(Math.abs(value)).length;

    steps.push({
      n,
      count,
      line: 4,
      kind: "start",
      activeDigitIndex: null,
      explanation: "Intrăm în ramura else și începem să eliminăm cifrele.",
    });

    while (n !== 0) {
      const remainingDigits = String(Math.abs(n)).length;
      const activeDigitIndex = totalDigits - (totalDigits - remainingDigits) - 1;

      steps.push({
        n,
        count,
        line: 5,
        kind: "loop-check",
        activeDigitIndex,
        explanation: `${n} != 0 este adevărat. Mai avem cel puțin o cifră de numărat.`,
      });

      count += 1;
      steps.push({
        n,
        count,
        line: 6,
        kind: "count",
        activeDigitIndex,
        explanation: `Am găsit o cifră, deci creștem contorul: nr = ${count}.`,
      });

      const previousN = n;
      n = Math.trunc(n / 10);
      steps.push({
        n,
        count,
        line: 7,
        kind: "remove",
        activeDigitIndex,
        explanation: `${previousN} / 10 = ${n}. Ultima cifră a fost eliminată.`,
      });
    }

    steps.push({
      n: 0,
      count,
      line: 5,
      kind: "loop-check",
      activeDigitIndex: null,
      explanation: "n a ajuns la 0. Condiția buclei este falsă și ne oprim.",
    });
  }

  const result = value === 0 ? 1 : String(Math.abs(value)).length;
  steps.push({
    n: 0,
    count: result,
    line: 10,
    kind: "finish",
    activeDigitIndex: null,
    explanation: `Afișăm nr = ${result}. Numărul ${value} are ${result} ${result === 1 ? "cifră" : "cifre"}.`,
  });

  return steps;
}
