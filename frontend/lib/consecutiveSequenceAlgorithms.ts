export type SequenceAlgorithmSlug = "cea-mai-lunga-secventa-pozitiva" | "cea-mai-lunga-secventa-de-numere-egale" | "cea-mai-lunga-secventa-strict-crescatoare";

export type SequenceStep = {
  line: number;
  index: number | null;
  x: number | null;
  previous: number | null;
  length: number;
  maximum: number;
  currentStart: number | null;
  bestStart: number | null;
  bestEnd: number | null;
  condition: string;
  conditionResult: boolean | null;
  explanation: string;
};

export type SequenceConfig = {
  title: string;
  defaults: number[];
  code: string[];
  build: (values: number[]) => SequenceStep[];
};

const positiveCode = ["int n, x;", "int lungime = 0, maxim = 0;", "", "cin >> n;", "", "for (int i = 0; i < n; i++) {", "    cin >> x;", "", "    if (x > 0)", "        lungime++;", "    else", "        lungime = 0;", "", "    if (lungime > maxim)", "        maxim = lungime;", "}", "", "cout << maxim;"];
const neighborCode = (increasing: boolean) => ["int n, x, anterior;", "cin >> n;", "", "cin >> anterior;", "", "int lungime = 1;", "int maxim = 1;", "", "for (int i = 1; i < n; i++) {", "    cin >> x;", "", `    if (x ${increasing ? ">" : "=="} anterior)`, "        lungime++;", "    else", "        lungime = 1;", "", "    if (lungime > maxim)", "        maxim = lungime;", "", "    anterior = x;", "}", "", "cout << maxim;"];

const makeStep = (line: number, index: number | null, x: number | null, previous: number | null, length: number, maximum: number, currentStart: number | null, bestStart: number | null, bestEnd: number | null, explanation: string, condition = "", conditionResult: boolean | null = null): SequenceStep => ({ line, index, x, previous, length, maximum, currentStart, bestStart, bestEnd, explanation, condition, conditionResult });

function positiveSteps(values: number[]): SequenceStep[] {
  let length = 0, maximum = 0;
  let currentStart: number | null = null, bestStart: number | null = null, bestEnd: number | null = null;
  const steps = [makeStep(1, null, null, null, length, maximum, currentStart, bestStart, bestEnd, "Inițializăm lungime = 0 și maxim = 0."), makeStep(3, null, null, null, length, maximum, currentStart, bestStart, bestEnd, `Citim n = ${values.length}.`)];
  for (let i = 0; i < values.length; i++) {
    const x = values[i];
    steps.push(makeStep(5, i, null, null, length, maximum, currentStart, bestStart, bestEnd, i === 0 ? "Bucla începe cu i = 0." : `Executăm i++; i devine ${i}.`));
    steps.push(makeStep(6, i, x, null, length, maximum, currentStart, bestStart, bestEnd, `Citim valoarea ${x} în x.`));
    const positive = x > 0;
    steps.push(makeStep(8, i, x, null, length, maximum, currentStart, bestStart, bestEnd, `${x} > 0 este ${positive ? "adevărat" : "fals"}.`, `${x} > 0`, positive));
    if (positive) {
      if (length === 0) currentStart = i;
      length++;
      steps.push(makeStep(9, i, x, null, length, maximum, currentStart, bestStart, bestEnd, `Secvența pozitivă continuă: lungime devine ${length}.`));
    } else {
      length = 0; currentStart = null;
      steps.push(makeStep(11, i, x, null, length, maximum, currentStart, bestStart, bestEnd, "Valoarea întrerupe secvența pozitivă: lungime revine la 0."));
    }
    const newRecord = length > maximum;
    steps.push(makeStep(13, i, x, null, length, maximum, currentStart, bestStart, bestEnd, `${length} > ${maximum} este ${newRecord ? "adevărat" : "fals"}.`, `${length} > ${maximum}`, newRecord));
    if (newRecord) {
      maximum = length; bestStart = currentStart; bestEnd = i;
      steps.push(makeStep(14, i, x, null, length, maximum, currentStart, bestStart, bestEnd, `Avem un record nou: maxim = ${maximum}.`));
    }
  }
  steps.push(makeStep(5, null, null, null, length, maximum, currentStart, bestStart, bestEnd, `i devine ${values.length}; condiția i < n este falsă.`));
  steps.push(makeStep(17, null, null, null, length, maximum, currentStart, bestStart, bestEnd, `Afișăm lungimea maximă ${maximum}.`));
  return steps;
}

function neighborSteps(values: number[], increasing: boolean): SequenceStep[] {
  let previous = values[0], length = 1, maximum = 1, currentStart = 0, bestStart = 0, bestEnd = 0;
  const symbol = increasing ? ">" : "==";
  const sequenceName = increasing ? "crescătoare" : "de valori egale";
  const steps = [makeStep(1, null, null, null, 0, 0, null, null, null, `Citim n = ${values.length}.`), makeStep(3, 0, previous, previous, 0, 0, null, null, null, `Citim primul element în anterior: ${previous}.`), makeStep(5, 0, previous, previous, length, 0, currentStart, bestStart, bestEnd, "Primul element formează o secvență de lungime 1."), makeStep(6, 0, previous, previous, length, maximum, currentStart, bestStart, bestEnd, "Inițializăm și recordul maxim = 1.")];
  for (let i = 1; i < values.length; i++) {
    const x = values[i];
    steps.push(makeStep(8, i, null, previous, length, maximum, currentStart, bestStart, bestEnd, i === 1 ? "Bucla începe cu i = 1." : `Executăm i++; i devine ${i}.`));
    steps.push(makeStep(9, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `Citim x = ${x}; anterior este încă ${previous}.`));
    const continues = increasing ? x > previous : x === previous;
    steps.push(makeStep(11, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `${x} ${symbol} ${previous} este ${continues ? "adevărat" : "fals"}.`, `${x} ${symbol} ${previous}`, continues));
    if (continues) {
      length++;
      steps.push(makeStep(12, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `Secvența ${sequenceName} continuă: lungime = ${length}.`));
    } else {
      length = 1; currentStart = i;
      steps.push(makeStep(14, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `Începe o secvență nouă la ${x}: lungime = 1.`));
    }
    const newRecord = length > maximum;
    steps.push(makeStep(16, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `${length} > ${maximum} este ${newRecord ? "adevărat" : "fals"}.`, `${length} > ${maximum}`, newRecord));
    if (newRecord) {
      maximum = length; bestStart = currentStart; bestEnd = i;
      steps.push(makeStep(17, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `Actualizăm recordul: maxim = ${maximum}.`));
    }
    previous = x;
    steps.push(makeStep(19, i, x, previous, length, maximum, currentStart, bestStart, bestEnd, `Salvăm anterior = ${x} pentru comparația următoare.`));
  }
  steps.push(makeStep(8, null, null, previous, length, maximum, currentStart, bestStart, bestEnd, `i devine ${values.length}; condiția i < n este falsă.`));
  steps.push(makeStep(22, null, null, previous, length, maximum, currentStart, bestStart, bestEnd, `Afișăm lungimea maximă ${maximum}.`));
  return steps;
}

export const sequenceConfigs: Record<SequenceAlgorithmSlug, SequenceConfig> = {
  "cea-mai-lunga-secventa-pozitiva": { title: "Cea mai lungă secvență de numere pozitive", defaults: [2, -1, 4, 7, 3, -2, 5, 6], code: positiveCode, build: positiveSteps },
  "cea-mai-lunga-secventa-de-numere-egale": { title: "Cea mai lungă secvență de numere egale", defaults: [2, 5, 5, 5, 3, 3, 7], code: neighborCode(false), build: (values) => neighborSteps(values, false) },
  "cea-mai-lunga-secventa-strict-crescatoare": { title: "Cea mai lungă secvență strict crescătoare", defaults: [8, 2, 4, 7, 9, 3, 5], code: neighborCode(true), build: (values) => neighborSteps(values, true) },
};
