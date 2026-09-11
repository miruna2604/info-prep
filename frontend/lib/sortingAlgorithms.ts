export type SortingAlgorithmSlug = "bubble-sort" | "selection-sort" | "insertion-sort";

export type SortingStep = {
  line: number;
  values: Array<number | null>;
  i: number;
  j: number | null;
  compare: [number, number] | null;
  minimumIndex: number | null;
  heldValue: number | null;
  sortedStart: number | null;
  sortedEnd: number | null;
  changed: boolean | null;
  action: string;
  explanation: string;
};

export type SortingConfig = {
  title: string;
  defaults: number[];
  code: string[];
  build: (values: number[]) => SortingStep[];
};

const bubbleCode = ["bool schimbat = true;", "", "for (int i = 0; i < n - 1 && schimbat; i++) {", "    schimbat = false;", "", "    for (int j = 0; j < n - i - 1; j++) {", "        if (v[j] > v[j + 1]) {", "            int aux = v[j];", "            v[j] = v[j + 1];", "            v[j + 1] = aux;", "", "            schimbat = true;", "        }", "    }", "}"];
const selectionCode = ["for (int i = 0; i < n - 1; i++) {", "    int pozMin = i;", "", "    for (int j = i + 1; j < n; j++) {", "        if (v[j] < v[pozMin])", "            pozMin = j;", "    }", "", "    int aux = v[i];", "    v[i] = v[pozMin];", "    v[pozMin] = aux;", "}"];
const insertionCode = ["for (int i = 1; i < n; i++) {", "    int x = v[i];", "    int j = i - 1;", "", "    while (j >= 0 && v[j] > x) {", "        v[j + 1] = v[j];", "        j--;", "    }", "", "    v[j + 1] = x;", "}"];

const makeStep = (line: number, values: Array<number | null>, i: number, explanation: string, extra: Partial<SortingStep> = {}): SortingStep => ({ line, values: [...values], i, explanation, j: null, compare: null, minimumIndex: null, heldValue: null, sortedStart: null, sortedEnd: null, changed: null, action: "Urmărim codul", ...extra });

function bubbleSteps(input: number[]): SortingStep[] {
  const values: Array<number | null> = [...input];
  let changed = true;
  const steps = [makeStep(0, values, 0, "Inițializăm schimbat = true pentru a permite prima parcurgere.", { changed, action: "Inițializare" })];
  let i = 0;
  while (i < values.length - 1 && changed) {
    steps.push(makeStep(2, values, i, `i = ${i}, iar schimbat este true. Comparăm vecinii până la indexul ${values.length - i - 2}.`, { changed, sortedStart: values.length - i, sortedEnd: values.length - 1, action: `Parcurgerea ${i + 1}` }));
    changed = false;
    steps.push(makeStep(3, values, i, "Resetăm schimbat = false. Va deveni true numai dacă facem un schimb.", { changed, sortedStart: values.length - i, sortedEnd: values.length - 1, action: "Resetare indicator" }));
    for (let j = 0; j < values.length - i - 1; j++) {
      steps.push(makeStep(5, values, i, `Bucla interioară ajunge la j = ${j}.`, { j, changed, compare: [j, j + 1], sortedStart: values.length - i, sortedEnd: values.length - 1, action: "Următorii vecini" }));
      const left = values[j] as number, right = values[j + 1] as number;
      const wrongOrder = left > right;
      steps.push(makeStep(6, values, i, `Comparăm ${left} > ${right}: ${wrongOrder ? "adevărat" : "fals"}.`, { j, changed, compare: [j, j + 1], sortedStart: values.length - i, sortedEnd: values.length - 1, action: wrongOrder ? "Trebuie interschimbate" : "Ordinea este corectă" }));
      if (wrongOrder) {
        const aux = left;
        steps.push(makeStep(7, values, i, `Salvăm valoarea ${left} în aux.`, { j, changed, compare: [j, j + 1], heldValue: aux, action: "aux primește v[j]" }));
        values[j] = right;
        steps.push(makeStep(8, values, i, `Copiem ${right} pe poziția ${j}.`, { j, changed, compare: [j, j + 1], heldValue: aux, action: "Mutare spre stânga" }));
        values[j + 1] = aux;
        steps.push(makeStep(9, values, i, `Punem valoarea din aux, ${aux}, pe poziția ${j + 1}. Schimbul este complet.`, { j, changed, compare: [j, j + 1], heldValue: aux, action: "Mutare spre dreapta" }));
        changed = true;
        steps.push(makeStep(11, values, i, "Am făcut un schimb, deci schimbat devine true.", { j, changed, compare: [j, j + 1], action: "schimbat = true" }));
      }
    }
    steps.push(makeStep(5, values, i, `j a ajuns la ${values.length - i - 1}; condiția buclei interioare este falsă. Elementul ${values[values.length - i - 1]} este fixat.`, { changed, sortedStart: values.length - i - 1, sortedEnd: values.length - 1, action: "Un element este sortat" }));
    i++;
  }
  steps.push(makeStep(2, values, i, changed ? "Am terminat toate parcurgerile necesare." : "schimbat este false: ultima parcurgere nu a făcut niciun schimb, deci vectorul este deja sortat.", { changed, sortedStart: 0, sortedEnd: values.length - 1, action: "Sortare terminată" }));
  return steps;
}

function selectionSteps(input: number[]): SortingStep[] {
  const values: Array<number | null> = [...input];
  const steps: SortingStep[] = [];
  for (let i = 0; i < values.length - 1; i++) {
    steps.push(makeStep(0, values, i, `Poziția ${i} este următoarea poziție care trebuie fixată.`, { sortedStart: 0, sortedEnd: i - 1, action: `Pasul i = ${i}` }));
    let minimumIndex = i;
    steps.push(makeStep(1, values, i, `Presupunem inițial că minimul zonei nesortate este v[${i}] = ${values[i]}.`, { minimumIndex, sortedStart: 0, sortedEnd: i - 1, action: "Inițializare pozMin" }));
    for (let j = i + 1; j < values.length; j++) {
      steps.push(makeStep(3, values, i, `Căutarea minimului ajunge la j = ${j}.`, { j, minimumIndex, compare: [j, minimumIndex], sortedStart: 0, sortedEnd: i - 1, action: "Următorul candidat" }));
      const smaller = (values[j] as number) < (values[minimumIndex] as number);
      steps.push(makeStep(4, values, i, `Comparăm ${values[j]} < ${values[minimumIndex]}: ${smaller ? "adevărat" : "fals"}.`, { j, minimumIndex, compare: [j, minimumIndex], sortedStart: 0, sortedEnd: i - 1, action: smaller ? "Minim nou găsit" : "Minimul rămâne" }));
      if (smaller) { minimumIndex = j; steps.push(makeStep(5, values, i, `Actualizăm pozMin = ${j}.`, { j, minimumIndex, sortedStart: 0, sortedEnd: i - 1, action: "Actualizare pozMin" })); }
    }
    const aux = values[i] as number;
    steps.push(makeStep(8, values, i, `Salvăm v[${i}] = ${aux} în aux.`, { minimumIndex, heldValue: aux, compare: [i, minimumIndex], sortedStart: 0, sortedEnd: i - 1, action: "Salvare în aux" }));
    values[i] = values[minimumIndex];
    steps.push(makeStep(9, values, i, `Mutăm minimul ${values[i]} pe poziția ${i}.`, { minimumIndex, heldValue: aux, compare: [i, minimumIndex], sortedStart: 0, sortedEnd: i, action: "Minimul pe poziție" }));
    values[minimumIndex] = aux;
    steps.push(makeStep(10, values, i, `Punem ${aux} pe poziția eliberată ${minimumIndex}. Schimbul este complet.`, { minimumIndex, compare: [i, minimumIndex], sortedStart: 0, sortedEnd: i, action: "Schimb complet" }));
  }
  steps.push(makeStep(0, values, values.length - 1, "A rămas un singur element nesortat; acesta este automat pe poziția corectă.", { sortedStart: 0, sortedEnd: values.length - 1, action: "Sortare terminată" }));
  return steps;
}

function insertionSteps(input: number[]): SortingStep[] {
  const values: Array<number | null> = [...input];
  const steps = [makeStep(0, values, 1, "Primul element formează deja o zonă sortată de lungime 1.", { sortedStart: 0, sortedEnd: 0, action: "Zona sortată inițială" })];
  for (let i = 1; i < values.length; i++) {
    steps.push(makeStep(0, values, i, `Luăm următorul element, de la poziția i = ${i}.`, { sortedStart: 0, sortedEnd: i - 1, action: `Inserarea ${i}` }));
    const heldValue = values[i] as number;
    steps.push(makeStep(1, values, i, `Salvăm v[${i}] = ${heldValue} în x.`, { heldValue, sortedStart: 0, sortedEnd: i - 1, action: "x este scos temporar" }));
    let j = i - 1;
    steps.push(makeStep(2, values, i, `Pornim căutarea spre stânga cu j = ${j}.`, { j, heldValue, sortedStart: 0, sortedEnd: i - 1, action: "Inițializare j" }));
    while (j >= 0 && (values[j] as number) > heldValue) {
      steps.push(makeStep(4, values, i, `j >= 0 și ${values[j]} > ${heldValue}; trebuie să deplasăm ${values[j]}.`, { j, heldValue, compare: [j, j + 1], sortedStart: 0, sortedEnd: i - 1, action: "Facem loc pentru x" }));
      values[j + 1] = values[j];
      steps.push(makeStep(5, values, i, `Copiem ${values[j]} de la poziția ${j} la poziția ${j + 1}.`, { j, heldValue, compare: [j, j + 1], sortedStart: 0, sortedEnd: i, action: "Deplasare spre dreapta" }));
      j--;
      steps.push(makeStep(6, values, i, `Executăm j--; j devine ${j}.`, { j, heldValue, sortedStart: 0, sortedEnd: i, action: "Continuăm spre stânga" }));
    }
    const reason = j < 0 ? "j a devenit -1: x trebuie pus la început." : `${values[j]} <= ${heldValue}: am găsit locul potrivit după poziția ${j}.`;
    steps.push(makeStep(4, values, i, reason, { j, heldValue, sortedStart: 0, sortedEnd: i, action: "Locul a fost găsit" }));
    values[j + 1] = heldValue;
    steps.push(makeStep(9, values, i, `Inserăm x = ${heldValue} pe poziția ${j + 1}. Zona 0…${i} este acum sortată.`, { j, heldValue, sortedStart: 0, sortedEnd: i, action: "Inserare completă" }));
  }
  steps.push(makeStep(0, values, values.length, "i a ajuns la n. Întregul vector este sortat.", { sortedStart: 0, sortedEnd: values.length - 1, action: "Sortare terminată" }));
  return steps;
}

export const sortingConfigs: Record<SortingAlgorithmSlug, SortingConfig> = {
  "bubble-sort": { title: "Bubble Sort", defaults: [5, 2, 4, 1], code: bubbleCode, build: bubbleSteps },
  "selection-sort": { title: "Selection Sort", defaults: [5, 2, 4, 1], code: selectionCode, build: selectionSteps },
  "insertion-sort": { title: "Insertion Sort", defaults: [2, 5, 7, 4, 3], code: insertionCode, build: insertionSteps },
};
