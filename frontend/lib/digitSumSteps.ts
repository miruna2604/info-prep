export const digitSumCodeLines = [
  "int n, suma = 0;",
  "cin >> n;",
  "while (n > 0) {",
  "    int cifra = n % 10;",
  "    suma = suma + cifra;",
  "    n = n / 10;",
  "}",
  "cout << suma;",
];

export type DigitSumStep = {
  n: number;
  sum: number;
  digit: number | null;
  line: number;
  kind: "start" | "check" | "extract" | "add" | "remove" | "finish";
  explanation: string;
};

export function buildDigitSumSteps(value: number): DigitSumStep[] {
  const steps: DigitSumStep[] = [
    {
      n: value,
      sum: 0,
      digit: null,
      line: 0,
      kind: "start",
      explanation: "Declarăm numărul n și inițializăm suma cu 0.",
    },
    {
      n: value,
      sum: 0,
      digit: null,
      line: 1,
      kind: "start",
      explanation: `Citim numărul ${value} în variabila n.`,
    },
  ];

  let n = value;
  let sum = 0;

  if (n === 0) {
    steps.push({
      n,
      sum,
      digit: null,
      line: 2,
      kind: "check",
      explanation: "Condiția 0 > 0 este falsă, deci nu intrăm în buclă.",
    });
  }

  while (n > 0) {
    steps.push({
      n,
      sum,
      digit: null,
      line: 2,
      kind: "check",
      explanation: `${n} > 0 este adevărat, deci executăm încă o iterație.`,
    });

    const digit = n % 10;
    steps.push({
      n,
      sum,
      digit,
      line: 3,
      kind: "extract",
      explanation: `${n} % 10 = ${digit}. Am extras ultima cifră.`,
    });

    const previousSum = sum;
    sum += digit;
    steps.push({
      n,
      sum,
      digit,
      line: 4,
      kind: "add",
      explanation: `suma = ${previousSum} + ${digit} = ${sum}.`,
    });

    const previousN = n;
    n = Math.floor(n / 10);
    steps.push({
      n,
      sum,
      digit,
      line: 5,
      kind: "remove",
      explanation: `n = ${previousN} / 10 = ${n}. Ultima cifră a fost eliminată.`,
    });
  }

  steps.push({
    n,
    sum,
    digit: null,
    line: 2,
    kind: "check",
    explanation: "n a ajuns la 0, deci condiția buclei este falsă.",
  });
  steps.push({
    n,
    sum,
    digit: null,
    line: 7,
    kind: "finish",
    explanation: `Afișăm suma cifrelor: ${sum}.`,
  });

  return steps;
}
