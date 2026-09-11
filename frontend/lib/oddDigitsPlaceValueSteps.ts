export const oddDigitsPlaceValueCode = [
  "int n, rezultat = 0, p = 1, cifra;",
  "cin >> n;",
  "",
  "while (n != 0) {",
  "    cifra = n % 10;",
  "",
  "    // Păstrăm doar cifrele impare",
  "    if (cifra % 2 != 0) {",
  "        rezultat = cifra * p + rezultat;",
  "        p = p * 10;",
  "    }",
  "",
  "    n = n / 10;",
  "}",
  "",
  "cout << rezultat;",
];

export type OddDigitsPlaceValueStep = {
  line: number;
  n: number;
  result: number;
  place: number;
  digit: number | null;
  accepted: boolean | null;
  kind: "start" | "extract" | "decide" | "build" | "place" | "remove" | "finish";
  explanation: string;
};

export function buildOddDigitsPlaceValueSteps(value: number): OddDigitsPlaceValueStep[] {
  const steps: OddDigitsPlaceValueStep[] = [
    { line: 0, n: value, result: 0, place: 1, digit: null, accepted: null, kind: "start", explanation: "Inițializăm rezultat = 0 și p = 1, poziția unităților." },
    { line: 1, n: value, result: 0, place: 1, digit: null, accepted: null, kind: "start", explanation: `Citim n = ${value}.` },
  ];
  let n = value;
  let result = 0;
  let place = 1;
  while (n !== 0) {
    const digit = n % 10;
    steps.push({ line: 4, n, result, place, digit, accepted: null, kind: "extract", explanation: `${n} % 10 = ${digit}. Am extras ultima cifră.` });
    const accepted = digit % 2 !== 0;
    steps.push({ line: 7, n, result, place, digit, accepted, kind: "decide", explanation: `${digit} este ${accepted ? "impară, deci o păstrăm" : "pară, deci o ignorăm"}.` });
    if (accepted) {
      const oldResult = result;
      result = digit * place + result;
      steps.push({ line: 8, n, result, place, digit, accepted, kind: "build", explanation: `${digit} × ${place} + ${oldResult} = ${result}. Cifra intră direct pe poziția corectă.` });
      const oldPlace = place;
      place *= 10;
      steps.push({ line: 9, n, result, place, digit, accepted, kind: "place", explanation: `Am ocupat poziția ${oldPlace}, deci următoarea poziție devine p = ${place}.` });
    }
    const oldN = n;
    n = Math.trunc(n / 10);
    steps.push({ line: 12, n, result, place, digit, accepted, kind: "remove", explanation: `${oldN} / 10 = ${n}. Eliminăm cifra analizată.` });
  }
  steps.push({ line: 15, n: 0, result, place, digit: null, accepted: null, kind: "finish", explanation: `Afișăm rezultat = ${result}. Cifrele pare au fost eliminate fără o a doua răsturnare.` });
  return steps;
}
