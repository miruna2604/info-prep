export type ExtremeAlgorithmSlug = "minimul-si-maximul-unui-vector" | "cele-mai-mari-doua-valori-distincte" | "cele-mai-mici-doua-valori-distincte" | "cele-mai-mari-trei-valori-distincte" | "cele-mai-mici-trei-valori-distincte";

export type ExtremeStep = {
  line: number;
  index: number | null;
  values: Record<string, number | string>;
  comparison: string;
  action: string;
  explanation: string;
  output: string;
};

export type ExtremeConfig = {
  title: string;
  defaults: number[];
  code: string[];
  minimumDistinct: number;
  build: (vector: number[]) => ExtremeStep[];
};

const e = (line: number, index: number | null, values: ExtremeStep["values"], explanation: string, extra: Partial<ExtremeStep> = {}): ExtremeStep => ({ line, index, values, explanation, comparison: "", action: "Urmărim codul", output: "", ...extra });

const minMaxCode = ["int n, v[100];", "cin >> n;", "", "for (int i = 0; i < n; i++)", "    cin >> v[i];", "", "int minim = v[0];", "int maxim = v[0];", "", "for (int i = 1; i < n; i++) {", "    if (v[i] < minim)", "        minim = v[i];", "", "    if (v[i] > maxim)", "        maxim = v[i];", "}", "", "cout << \"Minim: \" << minim << '\\n';", "cout << \"Maxim: \" << maxim;"];

function minMaxSteps(vector: number[]): ExtremeStep[] {
  let minimum = vector[0], maximum = vector[0];
  const steps = [e(1, null, { n: vector.length }, `Citim n = ${vector.length} și vectorul.`), e(6, 0, { minim: minimum, maxim: maximum }, `Inițializăm minim cu primul element: ${minimum}.`, { action: "Inițializare minim" }), e(7, 0, { minim: minimum, maxim: maximum }, `Inițializăm maxim tot cu primul element: ${maximum}.`, { action: "Inițializare maxim" })];
  for (let i = 1; i < vector.length; i++) {
    const value = vector[i];
    steps.push(e(9, i, { i, minim: minimum, maxim: maximum }, `Trecem la v[${i}] = ${value}.`, { action: "Următorul element" }));
    const smaller = value < minimum;
    steps.push(e(10, i, { i, minim: minimum, maxim: maximum }, `${value} < ${minimum} este ${smaller ? "adevărat" : "fals"}.`, { comparison: `${value} < ${minimum}`, action: smaller ? "Minim nou" : "Minimul rămâne" }));
    if (smaller) { minimum = value; steps.push(e(11, i, { i, minim: minimum, maxim: maximum }, `Actualizăm minim = ${value}.`, { action: "Actualizare minim" })); }
    const larger = value > maximum;
    steps.push(e(13, i, { i, minim: minimum, maxim: maximum }, `${value} > ${maximum} este ${larger ? "adevărat" : "fals"}.`, { comparison: `${value} > ${maximum}`, action: larger ? "Maxim nou" : "Maximul rămâne" }));
    if (larger) { maximum = value; steps.push(e(14, i, { i, minim: minimum, maxim: maximum }, `Actualizăm maxim = ${value}.`, { action: "Actualizare maxim" })); }
  }
  steps.push(e(17, null, { minim: minimum, maxim: maximum }, `Afișăm minimul ${minimum} și maximul ${maximum}.`, { action: "Rezultat final", output: `Minim: ${minimum} · Maxim: ${maximum}` }));
  return steps;
}

function topCode(direction: "max" | "min", count: 2 | 3): string[] {
  const prefix = direction === "max" ? "max" : "min";
  const limit = direction === "max" ? "INT_MIN" : "INT_MAX";
  const operator = direction === "max" ? ">" : "<";
  const lines = ["#include <iostream>", "#include <climits>", "using namespace std;", "", "int n, v[100];", "cin >> n;", "", "for (int i = 0; i < n; i++)", "    cin >> v[i];", "", `int ${prefix}1 = ${limit};`, `int ${prefix}2 = ${limit};`];
  if (count === 3) lines.push(`int ${prefix}3 = ${limit};`);
  lines.push("", "for (int i = 0; i < n; i++) {", `    if (v[i] ${operator} ${prefix}1) {`);
  if (count === 3) lines.push(`        ${prefix}3 = ${prefix}2;`);
  lines.push(`        ${prefix}2 = ${prefix}1;`, `        ${prefix}1 = v[i];`, "    }", `    else if (v[i] ${operator} ${prefix}2 && v[i] != ${prefix}1) {`);
  if (count === 3) lines.push(`        ${prefix}3 = ${prefix}2;`);
  lines.push(`        ${prefix}2 = v[i];`, "    }");
  if (count === 3) lines.push(`    else if (v[i] ${operator} ${prefix}3 && v[i] != ${prefix}2 && v[i] != ${prefix}1) {`, `        ${prefix}3 = v[i];`, "    }");
  lines.push("}", "", `cout << ${Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`).join(" << \" \" << ")};`);
  return lines;
}

function topSteps(vector: number[], direction: "max" | "min", count: 2 | 3): ExtremeStep[] {
  const prefix = direction === "max" ? "max" : "min";
  const infinity = direction === "max" ? "−∞" : "+∞";
  const slots: Array<number | null> = Array(count).fill(null);
  const better = (left: number, right: number | null) => right === null || (direction === "max" ? left > right : left < right);
  const shown = () => Object.fromEntries(slots.map((value, i) => [`${prefix}${i + 1}`, value ?? infinity]));
  const initBase = 10;
  const loopLine = count === 2 ? 13 : 14;
  const firstIfLine = loopLine + 1;
  const firstShiftLines = count === 2 ? [firstIfLine + 1, firstIfLine + 2] : [firstIfLine + 1, firstIfLine + 2, firstIfLine + 3];
  const secondIfLine = count === 2 ? firstIfLine + 4 : firstIfLine + 5;
  const secondShiftLines = count === 2 ? [secondIfLine + 1] : [secondIfLine + 1, secondIfLine + 2];
  const thirdIfLine = secondIfLine + 4;
  const outputLine = topCode(direction, count).length - 1;
  const steps: ExtremeStep[] = [e(5, null, { n: vector.length }, `Citim n = ${vector.length} și elementele vectorului.`)];
  for (let i = 0; i < count; i++) steps.push(e(initBase + i, null, shown(), `Inițializăm ${prefix}${i + 1} cu ${infinity}.`, { action: "Inițializare" }));

  for (let i = 0; i < vector.length; i++) {
    const value = vector[i];
    steps.push(e(loopLine, i, { i, ...shown() }, `Analizăm v[${i}] = ${value}.`, { action: "Următorul element" }));
    const entersFirst = better(value, slots[0]);
    steps.push(e(firstIfLine, i, { i, ...shown() }, `Verificăm dacă ${value} trebuie să intre pe primul loc: ${entersFirst ? "da" : "nu"}.`, { comparison: `${value} ${direction === "max" ? ">" : "<"} ${slots[0] ?? infinity}`, action: entersFirst ? "Intră pe locul 1" : "Verificăm locul 2" }));
    if (entersFirst) {
      if (count === 3) { slots[2] = slots[1]; steps.push(e(firstShiftLines[0], i, { i, ...shown() }, `Deplasăm ${prefix}2 în ${prefix}3.`, { action: "Deplasare 2 → 3" })); }
      slots[1] = slots[0];
      steps.push(e(firstShiftLines[count === 3 ? 1 : 0], i, { i, ...shown() }, `Deplasăm vechiul ${prefix}1 în ${prefix}2.`, { action: "Deplasare 1 → 2" }));
      slots[0] = value;
      steps.push(e(firstShiftLines[count === 3 ? 2 : 1], i, { i, ...shown() }, `${value} devine noul ${prefix}1.`, { action: "Locul 1 actualizat" }));
      continue;
    }
    const distinctFromFirst = value !== slots[0];
    const entersSecond = distinctFromFirst && better(value, slots[1]);
    steps.push(e(secondIfLine, i, { i, ...shown() }, `Pentru locul 2: valoarea este ${distinctFromFirst ? "distinctă" : "duplicată"} și ${entersSecond ? "se potrivește" : "nu se potrivește"}.`, { action: entersSecond ? "Intră pe locul 2" : count === 3 ? "Verificăm locul 3" : "Ignorăm valoarea" }));
    if (entersSecond) {
      if (count === 3) { slots[2] = slots[1]; steps.push(e(secondShiftLines[0], i, { i, ...shown() }, `Deplasăm vechiul ${prefix}2 în ${prefix}3.`, { action: "Deplasare 2 → 3" })); }
      slots[1] = value;
      steps.push(e(secondShiftLines[count === 3 ? 1 : 0], i, { i, ...shown() }, `${value} devine ${prefix}2.`, { action: "Locul 2 actualizat" }));
      continue;
    }
    if (count === 3) {
      const distinct = value !== slots[0] && value !== slots[1];
      const entersThird = distinct && better(value, slots[2]);
      steps.push(e(thirdIfLine, i, { i, ...shown() }, `Pentru locul 3: ${value} ${entersThird ? "este acceptată" : distinct ? "nu este suficient de bună" : "este duplicată"}.`, { action: entersThird ? "Intră pe locul 3" : "Ignorăm valoarea" }));
      if (entersThird) { slots[2] = value; steps.push(e(thirdIfLine + 1, i, { i, ...shown() }, `${value} devine ${prefix}3.`, { action: "Locul 3 actualizat" })); }
    }
  }
  const result = slots.map((value) => value ?? infinity).join(" ");
  steps.push(e(outputLine, null, shown(), `Afișăm valorile distincte în ordine: ${result}.`, { action: "Rezultat final", output: result }));
  return steps;
}

export const extremeConfigs: Record<ExtremeAlgorithmSlug, ExtremeConfig> = {
  "minimul-si-maximul-unui-vector": { title: "Minimul și maximul", defaults: [7, 2, 9, 2, 5, 11, 3], code: minMaxCode, minimumDistinct: 1, build: minMaxSteps },
  "cele-mai-mari-doua-valori-distincte": { title: "Cele mai mari două valori distincte", defaults: [7, 2, 9, 9, 5, 11, 3], code: topCode("max", 2), minimumDistinct: 2, build: (v) => topSteps(v, "max", 2) },
  "cele-mai-mici-doua-valori-distincte": { title: "Cele mai mici două valori distincte", defaults: [7, 2, 9, 2, 5, 11, 3], code: topCode("min", 2), minimumDistinct: 2, build: (v) => topSteps(v, "min", 2) },
  "cele-mai-mari-trei-valori-distincte": { title: "Cele mai mari trei valori distincte", defaults: [7, 2, 9, 9, 5, 11, 3], code: topCode("max", 3), minimumDistinct: 3, build: (v) => topSteps(v, "max", 3) },
  "cele-mai-mici-trei-valori-distincte": { title: "Cele mai mici trei valori distincte", defaults: [7, 2, 9, 2, 5, 11, 3], code: topCode("min", 3), minimumDistinct: 3, build: (v) => topSteps(v, "min", 3) },
};
