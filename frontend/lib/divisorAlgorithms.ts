export type DivisorAlgorithmSlug = "divizorii-unui-numar" | "divizorii-proprii" | "divizori-eficient-radical" | "numarul-divizorilor" | "suma-divizorilor" | "verificarea-unui-numar-prim" | "numere-prime-dintr-un-interval" | "descompunerea-in-factori-primi" | "cmmdc-algoritmul-lui-euclid" | "cmmdc-prin-scaderi" | "cmmmc" | "numere-prime-intre-ele";

export type DivisorStep = {
  line: number;
  vars: Record<string, number | boolean>;
  candidate: number | null;
  remainder: number | null;
  accepted: boolean | null;
  output: string;
  explanation: string;
};

export type DivisorConfig = {
  title: string;
  inputs: ("n" | "a" | "b")[];
  defaults: number[];
  code: string[];
  build: (values: number[]) => DivisorStep[];
};

const s = (line: number, vars: DivisorStep["vars"], explanation: string, extra: Partial<DivisorStep> = {}): DivisorStep => ({ line, vars, explanation, candidate: null, remainder: null, accepted: null, output: "", ...extra });
const loopCode = (action: string, declaration: string) => [declaration, "cin >> n;", "", "for (int d = 1; d <= n; d++) {", "    if (n % d == 0)", `        ${action}`, "}", "", action.includes("nr") ? "cout << nr;" : "cout << suma;"];

function divisorScan(n: number, mode: "all" | "proper" | "count" | "sum"): DivisorStep[] {
  let value = 0;
  const output: number[] = [];
  const start = mode === "proper" ? 2 : 1;
  const end = mode === "proper" ? n - 1 : n;
  const actionLine = 5;
  const variables = (d?: number) => ({
    n,
    ...(d === undefined ? {} : { d }),
    ...(mode === "count" ? { nr: value } : {}),
    ...(mode === "sum" ? { suma: value } : {}),
  });
  const steps = [s(0, variables(start), mode === "count" || mode === "sum" ? "Inițializăm rezultatul cu 0." : "Declarăm numărul n."), s(1, variables(start), `Citim n = ${n}.`)];
  for (let d = start; d <= end; d++) {
    const remainder = n % d;
    const accepted = remainder === 0;
    steps.push(s(4, variables(d), `${n} % ${d} = ${remainder}. ${d} ${accepted ? "este" : "nu este"} divizor.`, { candidate: d, remainder, accepted, output: output.join(" ") }));
    if (accepted) {
      if (mode === "proper" || mode === "all") output.push(d);
      else value += mode === "count" ? 1 : d;
      steps.push(s(mode === "proper" || mode === "all" ? 5 : actionLine, variables(d), mode === "proper" ? `Afișăm divizorul propriu ${d}.` : mode === "all" ? `Afișăm divizorul ${d}.` : mode === "count" ? `Creștem contorul: nr = ${value}.` : `Adunăm ${d}: suma = ${value}.`, { candidate: d, remainder, accepted, output: mode === "proper" || mode === "all" ? output.join(" ") : String(value) }));
    }
  }
  const finalLine = mode === "proper" || mode === "all" ? 6 : 8;
  const finalOutput = mode === "proper" || mode === "all" ? output.join(" ") : String(value);
  steps.push(s(finalLine, variables(), `Rezultatul final este ${finalOutput || "mulțimea vidă"}.`, { output: finalOutput }));
  return steps;
}

const properCode = ["int n;", "cin >> n;", "", "for (int d = 2; d < n; d++) {", "    if (n % d == 0)", "        cout << d << \" \";", "}"];
const allDivisorsCode = ["int n;", "cin >> n;", "", "for (int d = 1; d <= n; d++) {", "    if (n % d == 0)", "        cout << d << \" \";", "}"];
const efficientDivisorsCode = ["int n;", "cin >> n;", "", "for (int d = 1; d * d <= n; d++) {", "    if (n % d == 0) {", "        cout << d << \" \";", "        if (d != n / d)", "            cout << n / d << \" \";", "    }", "}"];

function efficientDivisorSteps(n: number): DivisorStep[] {
  const output: number[] = [];
  const steps = [s(0, { n, d: 1 }, "Declarăm numărul n."), s(1, { n, d: 1 }, `Citim n = ${n}.`)];
  for (let d = 1; d * d <= n; d++) {
    const remainder = n % d;
    const accepted = remainder === 0;
    const pair = Math.trunc(n / d);
    steps.push(s(4, { n, d, pereche: pair }, `${d} × ${d} <= ${n}, deci verificăm ${d}. Restul este ${remainder}.`, { candidate: d, remainder, accepted, output: output.join(" ") }));
    if (accepted) {
      output.push(d);
      steps.push(s(5, { n, d, pereche: pair }, `${d} divide ${n}; afișăm primul divizor al perechii.`, { candidate: d, remainder, accepted: true, output: output.join(" ") }));
      const isSame = d === pair;
      steps.push(s(6, { n, d, pereche: pair }, isSame ? `${n} este pătrat perfect aici: ${d} = ${pair}, deci nu repetăm divizorul.` : `Perechea lui ${d} este ${n} / ${d} = ${pair}.`, { candidate: d, remainder, accepted: !isSame, output: output.join(" ") }));
      if (!isSame) {
        output.push(pair);
        steps.push(s(7, { n, d, pereche: pair }, `Afișăm imediat și divizorul-pereche ${pair}.`, { candidate: d, remainder, accepted: true, output: output.join(" ") }));
      }
    }
  }
  const root = Math.sqrt(n);
  steps.push(s(9, { n, radical: Number(root.toFixed(2)) }, `Ne oprim: următorul d ar depăși √${n} ≈ ${root.toFixed(2)}. Toate perechile au fost deja găsite.`, { output: output.join(" ") }));
  return steps;
}
const primeCode = ["int n;", "bool prim = true;", "", "cin >> n;", "", "if (n < 2)", "    prim = false;", "", "for (int d = 2; d * d <= n && prim; d++) {", "    if (n % d == 0)", "        prim = false;", "}", "", "if (prim)", "    cout << \"PRIM\";", "else", "    cout << \"NU ESTE PRIM\";"];

function primeSteps(n: number): DivisorStep[] {
  let prime = true;
  const steps = [s(1, { n, prim: prime }, "Presupunem inițial că numărul este prim."), s(3, { n, prim: prime }, `Citim n = ${n}.`)];
  const validNatural = n >= 2;
  steps.push(s(5, { n, prim: prime }, `${n} < 2 este ${validNatural ? "fals" : "adevărat"}.`, { accepted: validNatural }));
  if (!validNatural) { prime = false; steps.push(s(6, { n, prim: prime }, `${n} este mai mic decât 2, deci prim devine false.`, { accepted: false })); }

  let d = 2;
  let firstIteration = true;
  while (d * d <= n && prime) {
    const incrementExplanation = firstIteration
      ? "Inițializăm d = 2."
      : `Executăm d++; candidatul crește de la ${d - 1} la ${d}.`;
    steps.push(s(8, { n, d, prim: prime, d_patrat: d * d }, `${incrementExplanation} ${d} × ${d} <= ${n} și prim este true, deci intrăm în buclă.`, { candidate: d, accepted: true }));
    const remainder = n % d;
    const divides = remainder === 0;
    steps.push(s(9, { n, d, prim: prime, d_patrat: d * d }, `${n} % ${d} = ${remainder}. ${divides ? `${d} este divizor.` : `${d} nu este divizor.`}`, { candidate: d, remainder, accepted: !divides }));
    if (divides) { prime = false; steps.push(s(10, { n, d, prim: prime }, `Am găsit divizorul propriu ${d}; prim devine false.`, { candidate: d, remainder, accepted: false })); }
    d++;
    firstIteration = false;
  }
  const exitExplanation = !prime
    ? firstIteration
      ? "Condiția prim este deja false, deci bucla nu începe."
      : `După d++, d devine ${d}. Condiția prim este false, deci bucla se oprește imediat.`
    : `${d} × ${d} = ${d * d}, iar ${d * d} <= ${n} este fals. Am depășit √${n}, deci nu mai există candidați de verificat.`;
  steps.push(s(8, { n, d, prim: prime, d_patrat: d * d }, exitExplanation, { candidate: d }));
  steps.push(s(prime ? 14 : 16, { n, prim: prime }, `Afișăm „${prime ? "PRIM" : "NU ESTE PRIM"}”.`, { accepted: prime, output: prime ? "PRIM" : "NU ESTE PRIM" }));
  return steps;
}

const intervalCode = ["int a, b;", "cin >> a >> b;", "", "for (int n = a; n <= b; n++) {", "    bool prim = true;", "", "    if (n < 2)", "        prim = false;", "", "    for (int d = 2; d * d <= n && prim; d++) {", "        if (n % d == 0)", "            prim = false;", "    }", "", "    if (prim)", "        cout << n << \" \";", "}"];
function intervalSteps(a: number, b: number): DivisorStep[] {
  const steps = [s(1, { a, b }, `Citim intervalul [${a}, ${b}].`)];
  const primes: number[] = [];
  for (let n = a; n <= b; n++) {
    steps.push(s(3, { a, b, n }, n === a ? `Bucla exterioară începe cu n = a = ${n}.` : `Executăm n++; următorul număr verificat este ${n}.`, { candidate: n }));
    let prime = true;
    steps.push(s(4, { a, b, n, prim: prime }, `Pentru ${n}, resetăm prim = true.`));
    const validNatural = n >= 2;
    steps.push(s(6, { a, b, n, prim: prime }, `${n} < 2 este ${validNatural ? "fals" : "adevărat"}.`, { accepted: validNatural }));
    if (!validNatural) {
      prime = false;
      steps.push(s(7, { a, b, n, prim: prime }, `${n} nu poate fi prim, deci prim devine false.`, { accepted: false, output: primes.join(" ") }));
    }

    let d = 2;
    let firstDivisorCandidate = true;
    while (d * d <= n && prime) {
      const incrementExplanation = firstDivisorCandidate
        ? "Inițializăm d = 2."
        : `Executăm d++; d crește de la ${d - 1} la ${d}.`;
      steps.push(s(9, { a, b, n, d, d_patrat: d * d, prim: prime }, `${incrementExplanation} ${d} × ${d} <= ${n} și prim este true, deci verificăm candidatul.`, { candidate: d, accepted: true, output: primes.join(" ") }));
      const remainder = n % d;
      const divides = remainder === 0;
      steps.push(s(10, { a, b, n, d, d_patrat: d * d, prim: prime }, `${n} % ${d} = ${remainder}. ${divides ? `${d} este divizor.` : `${d} nu este divizor.`}`, { candidate: d, remainder, accepted: !divides, output: primes.join(" ") }));
      if (divides) {
        prime = false;
        steps.push(s(11, { a, b, n, d, prim: prime }, `Am găsit un divizor; prim devine false.`, { candidate: d, remainder, accepted: false, output: primes.join(" ") }));
      }
      d++;
      firstDivisorCandidate = false;
    }

    const stopReason = !prime
      ? firstDivisorCandidate
        ? "prim este false, deci bucla interioară nu începe."
        : `După d++, d devine ${d}; prim este false, deci oprim imediat căutarea.`
      : `${d} × ${d} = ${d * d} > ${n}; am depășit √${n} și oprim căutarea.`;
    steps.push(s(9, { a, b, n, d, d_patrat: d * d, prim: prime }, stopReason, { candidate: d, output: primes.join(" ") }));
    steps.push(s(14, { a, b, n, prim: prime }, `Verificăm prim: valoarea este ${prime ? "true" : "false"}.`, { accepted: prime, output: primes.join(" ") }));
    if (prime) {
      primes.push(n);
      steps.push(s(15, { a, b, n, prim: prime }, `${n} este prim, deci îl adăugăm la rezultat.`, { accepted: true, output: primes.join(" ") }));
    }
  }
  steps.push(s(16, { a, b, n: b + 1 }, `După n++, n devine ${b + 1}; condiția n <= b este falsă. Numerele prime găsite sunt: ${primes.join(", ") || "niciunul"}.`, { output: primes.join(" ") }));
  return steps;
}

const factorCode = ["int n;", "cin >> n;", "", "int d = 2;", "", "while (n > 1) {", "    int p = 0;", "", "    while (n % d == 0) {", "        p++;", "        n = n / d;", "    }", "", "    if (p > 0)", "        cout << d << \"^\" << p << \" \";", "", "    d++;", "}"];
function factorSteps(value: number): DivisorStep[] {
  let n = value, d = 2;
  const factors: string[] = [];
  const steps = [s(0, { n }, "Declarăm variabila n."), s(1, { n }, `Citim n = ${n}.`), s(3, { n, d }, "Inițializăm d = 2, primul factor prim posibil.")];
  while (n > 1) {
    steps.push(s(5, { n, d }, `${n} > 1 este adevărat, deci continuăm descompunerea.`, { candidate: d, accepted: true, output: factors.join(" · ") }));
    let p = 0;
    steps.push(s(6, { n, d, p }, `Pentru candidatul d = ${d}, inițializăm puterea p = 0.`, { candidate: d, output: factors.join(" · ") }));
    while (n % d === 0) {
      steps.push(s(8, { n, d, p }, `${n} % ${d} = 0. Împărțirea este exactă, deci ${d} este factor.`, { candidate: d, remainder: 0, accepted: true, output: factors.join(" · ") }));
      p++;
      steps.push(s(9, { n, d, p }, `Executăm p++; puterea factorului ${d} devine ${p}.`, { candidate: d, remainder: 0, accepted: true, output: factors.join(" · ") }));
      const oldN = n;
      n = Math.trunc(n / d);
      steps.push(s(10, { n, d, p }, `${oldN} / ${d} = ${n}. Am eliminat o apariție a factorului ${d}.`, { candidate: d, remainder: 0, accepted: true, output: factors.join(" · ") }));
    }
    const remainder = n % d;
    steps.push(s(8, { n, d, p }, `${n} % ${d} = ${remainder}. Împărțirea nu mai este exactă, deci ieșim din bucla interioară.`, { candidate: d, remainder, accepted: false, output: factors.join(" · ") }));
    const foundFactor = p > 0;
    steps.push(s(13, { n, d, p }, `Verificăm p > 0: ${p} > 0 este ${foundFactor ? "adevărat" : "fals"}.`, { candidate: d, accepted: foundFactor, output: factors.join(" · ") }));
    if (foundFactor) {
      factors.push(`${d}^${p}`);
      steps.push(s(14, { n, d, p }, `Afișăm ${d}^${p}. Factorul și puterea sa sunt acum în rezultat.`, { candidate: d, accepted: true, output: factors.join(" · ") }));
    }
    const oldD = d;
    d++;
    steps.push(s(16, { n, d, p }, `Executăm d++; candidatul crește de la ${oldD} la ${d}.`, { candidate: d, output: factors.join(" · ") }));
  }
  steps.push(s(5, { n, d }, `${n} > 1 este fals. Toți factorii au fost eliminați și bucla exterioară se oprește.`, { candidate: d, accepted: false, output: factors.join(" · ") }));
  const finalOutput = factors.length > 0 ? factors.join(" · ") : "nu are factori primi";
  steps.push(s(17, { n, d }, value === 1 ? "Numărul 1 nu are factori primi." : `${value} = ${finalOutput}. Descompunerea este completă.`, { output: finalOutput }));
  return steps;
}

const euclidCode = ["int a, b;", "cin >> a >> b;", "", "while (b != 0) {", "    int r = a % b;", "    a = b;", "    b = r;", "}", "", "cout << a;"];
function euclidSteps(x: number, y: number, ending: "gcd" | "lcm" | "coprime"): DivisorStep[] {
  let a = x, b = y;
  const steps = [s(1, { a, b }, `Citim a = ${a} și b = ${b}.`)];
  if (ending === "lcm") steps.push(s(3, { a, b, x, y }, `Păstrăm valorile inițiale: x = ${x}, y = ${y}.`));
  const offset = ending === "lcm" ? 3 : 0;
  const variables = (r?: number) => ({
    a,
    b,
    ...(r === undefined ? {} : { r }),
    ...(ending === "lcm" ? { x, y } : {}),
  });
  while (b !== 0) {
    const r = a % b;
    steps.push(s(4 + offset, variables(r), `${a} % ${b} = ${r}. Acesta este noul rest.`, { remainder: r }));
    a = b; steps.push(s(5 + offset, variables(r), `Mutăm vechiul b în a: a = ${a}.`));
    b = r; steps.push(s(6 + offset, variables(r), `Mutăm restul în b: b = ${b}.`));
  }
  if (ending === "gcd") steps.push(s(9, { a, b }, `b este 0, deci CMMDC = ${a}.`, { output: String(a) }));
  if (ending === "lcm") { const lcm = x * y / a; steps.push(s(12, { a, b, x, y, cmmmc: lcm }, `${x} × ${y} / ${a} = ${lcm}.`, { output: String(lcm) })); }
  if (ending === "coprime") steps.push(s(a === 1 ? 10 : 12, { a, b }, `CMMDC este ${a}, deci numerele ${a === 1 ? "sunt" : "nu sunt"} prime între ele.`, { accepted: a === 1, output: a === 1 ? "PRIME ÎNTRE ELE" : "NU SUNT PRIME ÎNTRE ELE" }));
  return steps;
}

const subtractionGcdCode = [
  "#include <iostream>", "", "using namespace std;", "", "int main() {",
  "    int a, b;", "    cout << \"a=\"; cin >> a;", "    cout << \"b=\"; cin >> b;",
  "", "    while (a != b) {", "        if (a > b)", "            a = a - b;",
  "        else", "            b = b - a;", "    }", "", "    cout << a;",
  "    return 0;", "}",
];

function subtractionGcdSteps(first: number, second: number): DivisorStep[] {
  let a = first, b = second;
  const steps = [s(6, { a, b }, `Citim a = ${a}.`), s(7, { a, b }, `Citim b = ${b}.`)];
  while (a !== b) {
    steps.push(s(9, { a, b }, `${a} != ${b}, deci mai avem de redus perechea.`));
    const aIsLarger = a > b;
    steps.push(s(10, { a, b }, `${a} > ${b} este ${aIsLarger ? "adevărat" : "fals"}. Scădem numărul mai mic din cel mai mare.`, { accepted: aIsLarger }));
    if (aIsLarger) {
      const oldA = a;
      a -= b;
      steps.push(s(11, { a, b }, `${oldA} - ${b} = ${a}. Doar a se modifică.`));
    } else {
      const oldB = b;
      b -= a;
      steps.push(s(13, { a, b }, `${oldB} - ${a} = ${b}. Doar b se modifică.`));
    }
  }
  steps.push(s(9, { a, b }, `Acum a == b == ${a}. Condiția buclei este falsă și ne oprim.`, { accepted: true }));
  steps.push(s(16, { a, b }, `Afișăm CMMDC = ${a}.`, { output: String(a) }));
  return steps;
}

const lcmCode = ["int a, b;", "cin >> a >> b;", "", "int x = a;", "int y = b;", "", "while (b != 0) {", "    int r = a % b;", "    a = b;", "    b = r;", "}", "", "int cmmmc = x * y / a;", "", "cout << cmmmc;"];
const coprimeCode = [...euclidCode.slice(0, 8), "", "if (a == 1)", "    cout << \"PRIME INTRE ELE\";", "else", "    cout << \"NU SUNT PRIME INTRE ELE\";"];

export const divisorConfigs: Record<DivisorAlgorithmSlug, DivisorConfig> = {
  "divizorii-unui-numar": { title: "1. Toți divizorii (inclusiv cei improprii)", inputs: ["n"], defaults: [12], code: allDivisorsCode, build: ([n]) => divisorScan(n, "all") },
  "divizorii-proprii": { title: "2. Divizorii proprii", inputs: ["n"], defaults: [12], code: properCode, build: ([n]) => divisorScan(n, "proper") },
  "divizori-eficient-radical": { title: "3. Metoda eficientă până la √n", inputs: ["n"], defaults: [36], code: efficientDivisorsCode, build: ([n]) => efficientDivisorSteps(n) },
  "numarul-divizorilor": { title: "Numărul divizorilor", inputs: ["n"], defaults: [12], code: loopCode("nr++;", "int n, nr = 0;"), build: ([n]) => divisorScan(n, "count") },
  "suma-divizorilor": { title: "Suma divizorilor", inputs: ["n"], defaults: [12], code: loopCode("suma = suma + d;", "int n, suma = 0;"), build: ([n]) => divisorScan(n, "sum") },
  "verificarea-unui-numar-prim": { title: "Verificarea unui număr prim", inputs: ["n"], defaults: [17], code: primeCode, build: ([n]) => primeSteps(n) },
  "numere-prime-dintr-un-interval": { title: "Numere prime dintr-un interval", inputs: ["a", "b"], defaults: [10, 20], code: intervalCode, build: ([a, b]) => intervalSteps(a, b) },
  "descompunerea-in-factori-primi": { title: "Descompunerea în factori primi", inputs: ["n"], defaults: [60], code: factorCode, build: ([n]) => factorSteps(n) },
  "cmmdc-algoritmul-lui-euclid": { title: "1. Algoritmul lui Euclid cu împărțiri", inputs: ["a", "b"], defaults: [24, 18], code: euclidCode, build: ([a, b]) => euclidSteps(a, b, "gcd") },
  "cmmdc-prin-scaderi": { title: "2. Algoritmul lui Euclid cu scăderi", inputs: ["a", "b"], defaults: [24, 18], code: subtractionGcdCode, build: ([a, b]) => subtractionGcdSteps(a, b) },
  "cmmmc": { title: "Cel mai mic multiplu comun", inputs: ["a", "b"], defaults: [24, 18], code: lcmCode, build: ([a, b]) => euclidSteps(a, b, "lcm") },
  "numere-prime-intre-ele": { title: "Numere prime între ele", inputs: ["a", "b"], defaults: [8, 15], code: coprimeCode, build: ([a, b]) => euclidSteps(a, b, "coprime") },
};
