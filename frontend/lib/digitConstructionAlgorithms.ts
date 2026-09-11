export type DigitAlgorithmSlug =
  | "rasturnatul-unui-numar"
  | "numar-palindrom"
  | "eliminarea-cifrelor-pare";

export type DigitAlgorithmStep = {
  line: number;
  n: number;
  result: number;
  final: number;
  copy: number | null;
  digit: number | null;
  phase: "start" | "extract" | "decide" | "build" | "remove" | "compare" | "finish";
  accepted: boolean | null;
  explanation: string;
};

export type DigitAlgorithmConfig = {
  slug: DigitAlgorithmSlug;
  title: string;
  example: number;
  resultLabel: string;
  code: string[];
  buildSteps: (value: number) => DigitAlgorithmStep[];
};

const step = (data: DigitAlgorithmStep) => data;

const reverseCode = [
  "int n, invers = 0;", "cin >> n;", "", "while (n != 0) {",
  "    invers = invers * 10 + n % 10;", "    n = n / 10;", "}", "", "cout << invers;",
];

function buildReverseSteps(value: number, palindrome = false): DigitAlgorithmStep[] {
  const codeOffset = palindrome ? 2 : 0;
  const steps: DigitAlgorithmStep[] = [step({ line: 0, n: value, result: 0, final: 0, copy: palindrome ? value : null, digit: null, phase: "start", accepted: null, explanation: "Inițializăm numărul construit cu 0." })];
  steps.push(step({ line: 1, n: value, result: 0, final: 0, copy: palindrome ? value : null, digit: null, phase: "start", accepted: null, explanation: `Citim n = ${value}.` }));
  if (palindrome) steps.push(step({ line: 3, n: value, result: 0, final: 0, copy: value, digit: null, phase: "start", accepted: null, explanation: `Salvăm valoarea inițială în copie = ${value}, deoarece n va fi modificat.` }));
  let n = value;
  let result = 0;
  while (n !== 0) {
    const digit = n % 10;
    steps.push(step({ line: 3 + codeOffset, n, result, final: 0, copy: palindrome ? value : null, digit, phase: "extract", accepted: null, explanation: `${n} != 0. Ultima cifră este ${digit}.` }));
    const oldResult = result;
    result = result * 10 + digit;
    steps.push(step({ line: 4 + codeOffset, n, result, final: 0, copy: palindrome ? value : null, digit, phase: "build", accepted: true, explanation: `${oldResult} × 10 + ${digit} = ${result}. Cifra ${digit} este adăugată la dreapta.` }));
    const oldN = n;
    n = Math.trunc(n / 10);
    steps.push(step({ line: 5 + codeOffset, n, result, final: 0, copy: palindrome ? value : null, digit, phase: "remove", accepted: null, explanation: `${oldN} / 10 = ${n}. Eliminăm ultima cifră din n.` }));
  }
  if (palindrome) {
    const equal = value === result;
    steps.push(step({ line: 10, n: 0, result, final: 0, copy: value, digit: null, phase: "compare", accepted: equal, explanation: `Comparăm copie (${value}) cu invers (${result}): sunt ${equal ? "egale" : "diferite"}.` }));
    steps.push(step({ line: equal ? 11 : 13, n: 0, result, final: 0, copy: value, digit: null, phase: "finish", accepted: equal, explanation: `Afișăm „${equal ? "DA" : "NU"}”. ${value} ${equal ? "este" : "nu este"} palindrom.` }));
  } else {
    steps.push(step({ line: 8, n: 0, result, final: 0, copy: null, digit: null, phase: "finish", accepted: null, explanation: `Afișăm invers = ${result}.` }));
  }
  return steps;
}

const palindromeCode = [
  "int n, copie, invers = 0;", "cin >> n;", "", "copie = n;", "",
  "while (n != 0) {", "    invers = invers * 10 + n % 10;", "    n = n / 10;", "}", "",
  "if (copie == invers)", "    cout << \"DA\";", "else", "    cout << \"NU\";",
];

const filterCode = (keepEven: boolean) => [
  "int n, rezultat = 0, final = 0, cifra;", "cin >> n;", "", "while (n != 0) {",
  "    cifra = n % 10;", "", `    if (cifra % 2 ${keepEven ? "==" : "!="} 0)`,
  "        rezultat = rezultat * 10 + cifra;", "", "    n = n / 10;", "}", "",
  "while (rezultat != 0) {", "    final = final * 10 + rezultat % 10;",
  "    rezultat = rezultat / 10;", "}", "", "cout << final;",
];

function buildFilterSteps(value: number, keepEven: boolean): DigitAlgorithmStep[] {
  const steps: DigitAlgorithmStep[] = [step({ line: 0, n: value, result: 0, final: 0, copy: null, digit: null, phase: "start", accepted: null, explanation: "Inițializăm rezultat și final cu 0." }), step({ line: 1, n: value, result: 0, final: 0, copy: null, digit: null, phase: "start", accepted: null, explanation: `Citim n = ${value}.` })];
  let n = value;
  let result = 0;
  while (n !== 0) {
    const digit = n % 10;
    steps.push(step({ line: 4, n, result, final: 0, copy: null, digit, phase: "extract", accepted: null, explanation: `${n} % 10 = ${digit}. Extragem ultima cifră.` }));
    const accepted = keepEven ? digit % 2 === 0 : digit % 2 !== 0;
    steps.push(step({ line: 6, n, result, final: 0, copy: null, digit, phase: "decide", accepted, explanation: `${digit} este ${digit % 2 === 0 ? "pară" : "impară"}, deci ${accepted ? "o păstrăm" : "o eliminăm"}.` }));
    if (accepted) {
      const old = result;
      result = result * 10 + digit;
      steps.push(step({ line: 7, n, result, final: 0, copy: null, digit, phase: "build", accepted: true, explanation: `${old} × 10 + ${digit} = ${result}. O adăugăm temporar în rezultat.` }));
    }
    const oldN = n;
    n = Math.trunc(n / 10);
    steps.push(step({ line: 9, n, result, final: 0, copy: null, digit, phase: "remove", accepted, explanation: `${oldN} / 10 = ${n}. Trecem la cifra următoare.` }));
  }
  let final = 0;
  while (result !== 0) {
    const digit = result % 10;
    steps.push(step({ line: 12, n: 0, result, final, copy: null, digit, phase: "extract", accepted: true, explanation: `Începem etapa a doua: extragem ${digit} din rezultatul inversat ${result}.` }));
    const oldFinal = final;
    final = final * 10 + digit;
    steps.push(step({ line: 13, n: 0, result, final, copy: null, digit, phase: "build", accepted: true, explanation: `${oldFinal} × 10 + ${digit} = ${final}. Reconstruim ordinea corectă.` }));
    result = Math.trunc(result / 10);
    steps.push(step({ line: 14, n: 0, result, final, copy: null, digit, phase: "remove", accepted: null, explanation: `Eliminăm cifra folosită; rezultat devine ${result}.` }));
  }
  steps.push(step({ line: 17, n: 0, result: 0, final, copy: null, digit: null, phase: "finish", accepted: null, explanation: `Afișăm final = ${final}.` }));
  return steps;
}

export const digitAlgorithmConfigs: Record<DigitAlgorithmSlug, DigitAlgorithmConfig> = {
  "rasturnatul-unui-numar": { slug: "rasturnatul-unui-numar", title: "Răsturnatul unui număr", example: 1234, resultLabel: "invers", code: reverseCode, buildSteps: (value) => buildReverseSteps(value) },
  "numar-palindrom": { slug: "numar-palindrom", title: "Verificarea unui număr palindrom", example: 12321, resultLabel: "invers", code: palindromeCode, buildSteps: (value) => buildReverseSteps(value, true) },
  "eliminarea-cifrelor-pare": { slug: "eliminarea-cifrelor-pare", title: "Eliminarea cifrelor pare", example: 123456, resultLabel: "rezultat", code: filterCode(false), buildSteps: (value) => buildFilterSteps(value, false) },
};
