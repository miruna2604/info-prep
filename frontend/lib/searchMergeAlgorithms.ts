export type SearchMergeAlgorithmSlug = "cautare-binara" | "interclasarea-a-doi-vectori-sortati";

export type SearchMergeStep = {
  line: number;
  a: number[];
  b: number[];
  result: Array<number | null>;
  st: number | null;
  dr: number | null;
  middle: number | null;
  i: number | null;
  j: number | null;
  k: number | null;
  target: number | null;
  found: boolean | null;
  source: "a" | "b" | null;
  action: string;
  explanation: string;
};

const binaryCode = ["int st = 0;", "int dr = n - 1;", "bool gasit = false;", "", "while (st <= dr && !gasit) {", "    int mij = (st + dr) / 2;", "", "    if (v[mij] == x)", "        gasit = true;", "    else if (x < v[mij])", "        dr = mij - 1;", "    else", "        st = mij + 1;", "}", "", "if (gasit)", "    cout << \"GASIT\";", "else", "    cout << \"NU A FOST GASIT\";"];
const mergeCode = ["int i = 0;", "int j = 0;", "int k = 0;", "", "while (i < n && j < m) {", "    if (a[i] < b[j]) {", "        c[k] = a[i];", "        i++;", "    }", "    else {", "        c[k] = b[j];", "        j++;", "    }", "", "    k++;", "}", "", "while (i < n) {", "    c[k] = a[i];", "    i++;", "    k++;", "}", "", "while (j < m) {", "    c[k] = b[j];", "    j++;", "    k++;", "}"];

const base = (line: number, a: number[], b: number[], result: Array<number | null>, explanation: string, extra: Partial<SearchMergeStep> = {}): SearchMergeStep => ({ line, a, b, result: [...result], explanation, st: null, dr: null, middle: null, i: null, j: null, k: null, target: null, found: null, source: null, action: "Urmărim codul", ...extra });

export function buildBinarySearchSteps(vector: number[], target: number): SearchMergeStep[] {
  let st = 0, dr = vector.length - 1, found = false;
  const steps = [base(0, vector, [], [], "Inițializăm limita stângă la primul index: st = 0.", { st, dr, target, found, action: "Limita stângă" }), base(1, vector, [], [], `Inițializăm limita dreaptă la ultimul index: dr = ${dr}.`, { st, dr, target, found, action: "Limita dreaptă" }), base(2, vector, [], [], "Încă nu am găsit valoarea: gasit = false.", { st, dr, target, found, action: "Inițializare" })];
  while (st <= dr && !found) {
    steps.push(base(4, vector, [], [], `${st} <= ${dr} și !gasit este adevărat. Zona de căutare nu este goală.`, { st, dr, target, found, action: "Continuăm căutarea" }));
    const middle = Math.trunc((st + dr) / 2);
    steps.push(base(5, vector, [], [], `mij = (${st} + ${dr}) / 2 = ${middle}. Elementul din mijloc este ${vector[middle]}.`, { st, dr, middle, target, found, action: "Calculăm mijlocul" }));
    const equal = vector[middle] === target;
    steps.push(base(7, vector, [], [], `${vector[middle]} == ${target} este ${equal ? "adevărat" : "fals"}.`, { st, dr, middle, target, found, action: equal ? "Valoare găsită" : "Alegem jumătatea" }));
    if (equal) {
      found = true;
      steps.push(base(8, vector, [], [], "Setăm gasit = true. Bucla se va opri.", { st, dr, middle, target, found, action: "Găsit" }));
    } else if (target < vector[middle]) {
      steps.push(base(9, vector, [], [], `${target} < ${vector[middle]} este adevărat. Valoarea poate fi numai în jumătatea stângă.`, { st, dr, middle, target, found, action: "Alegem stânga" }));
      const oldDr = dr; dr = middle - 1;
      steps.push(base(10, vector, [], [], `dr devine mij - 1 = ${dr}. Eliminăm indicii ${middle}…${oldDr}.`, { st, dr, middle, target, found, action: "Eliminăm jumătatea dreaptă" }));
    } else {
      steps.push(base(11, vector, [], [], `${target} este mai mare decât ${vector[middle]}. Alegem jumătatea dreaptă.`, { st, dr, middle, target, found, action: "Alegem dreapta" }));
      const oldSt = st; st = middle + 1;
      steps.push(base(12, vector, [], [], `st devine mij + 1 = ${st}. Eliminăm indicii ${oldSt}…${middle}.`, { st, dr, middle, target, found, action: "Eliminăm jumătatea stângă" }));
    }
  }
  steps.push(base(4, vector, [], [], found ? "gasit este true, deci condiția !gasit este falsă." : `st = ${st} și dr = ${dr}; st <= dr este fals, deci zona este goală.`, { st, dr, target, found, action: "Căutarea se oprește" }));
  steps.push(base(15, vector, [], [], `Verificăm gasit: valoarea este ${found ? "true" : "false"}.`, { st, dr, target, found, action: "Decizia finală" }));
  steps.push(base(found ? 16 : 18, vector, [], [], `Afișăm „${found ? "GASIT" : "NU A FOST GASIT"}”.`, { st, dr, target, found, action: "Rezultat" }));
  return steps;
}

export function buildMergeSteps(a: number[], b: number[]): SearchMergeStep[] {
  let i = 0, j = 0, k = 0;
  const result: Array<number | null> = Array(a.length + b.length).fill(null);
  const steps = [base(0, a, b, result, "Inițializăm i = 0 pentru vectorul a.", { i, j, k, action: "Pointer a" }), base(1, a, b, result, "Inițializăm j = 0 pentru vectorul b.", { i, j, k, action: "Pointer b" }), base(2, a, b, result, "Inițializăm k = 0, prima poziție liberă din c.", { i, j, k, action: "Pointer rezultat" })];
  while (i < a.length && j < b.length) {
    steps.push(base(4, a, b, result, `i < n și j < m: ambii vectori mai au elemente.`, { i, j, k, action: "Comparăm următoarele valori" }));
    const takeA = a[i] < b[j];
    steps.push(base(5, a, b, result, `${a[i]} < ${b[j]} este ${takeA ? "adevărat" : "fals"}.`, { i, j, k, source: takeA ? "a" : "b", action: takeA ? "Alegem a[i]" : "Alegem b[j]" }));
    if (takeA) {
      result[k] = a[i];
      steps.push(base(6, a, b, result, `Copiem a[${i}] = ${a[i]} în c[${k}].`, { i, j, k, source: "a", action: "Copiere a → c" }));
      i++; steps.push(base(7, a, b, result, `Executăm i++; i devine ${i}.`, { i, j, k, source: "a", action: "Avansăm în a" }));
    } else {
      result[k] = b[j];
      steps.push(base(10, a, b, result, `Copiem b[${j}] = ${b[j]} în c[${k}].`, { i, j, k, source: "b", action: "Copiere b → c" }));
      j++; steps.push(base(11, a, b, result, `Executăm j++; j devine ${j}.`, { i, j, k, source: "b", action: "Avansăm în b" }));
    }
    k++; steps.push(base(14, a, b, result, `Executăm k++; următoarea poziție liberă este ${k}.`, { i, j, k, action: "Avansăm în c" }));
  }
  steps.push(base(4, a, b, result, `${i < a.length ? "b" : "a"} nu mai are elemente. Ieșim din prima buclă.`, { i, j, k, action: "Un vector s-a terminat" }));
  while (i < a.length) {
    steps.push(base(17, a, b, result, `a mai are elementul ${a[i]} la poziția ${i}.`, { i, j, k, source: "a", action: "Rest rămas în a" }));
    result[k] = a[i]; steps.push(base(18, a, b, result, `Copiem a[${i}] = ${a[i]} în c[${k}].`, { i, j, k, source: "a", action: "Copiere a → c" }));
    i++; steps.push(base(19, a, b, result, `i devine ${i}.`, { i, j, k, source: "a", action: "Avansăm i" }));
    k++; steps.push(base(20, a, b, result, `k devine ${k}.`, { i, j, k, action: "Avansăm k" }));
  }
  while (j < b.length) {
    steps.push(base(23, a, b, result, `b mai are elementul ${b[j]} la poziția ${j}.`, { i, j, k, source: "b", action: "Rest rămas în b" }));
    result[k] = b[j]; steps.push(base(24, a, b, result, `Copiem b[${j}] = ${b[j]} în c[${k}].`, { i, j, k, source: "b", action: "Copiere b → c" }));
    j++; steps.push(base(25, a, b, result, `j devine ${j}.`, { i, j, k, source: "b", action: "Avansăm j" }));
    k++; steps.push(base(26, a, b, result, `k devine ${k}.`, { i, j, k, action: "Avansăm k" }));
  }
  steps.push(base(27, a, b, result, `Interclasarea este completă: ${result.join(" ")}.`, { i, j, k, action: "Rezultat sortat" }));
  return steps;
}

export const searchMergeConfigs = { binary: { title: "Căutare binară", code: binaryCode }, merge: { title: "Interclasarea a doi vectori sortați", code: mergeCode } };
