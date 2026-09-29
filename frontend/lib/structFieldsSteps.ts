export const structFieldsCode = [
  "struct Elev {",
  "    char nume[30];",
  "    int varsta;",
  "    double medie;",
  "};",
  "",
  "Elev e;",
  "cin >> e.nume;",
  "cin >> e.varsta;",
  "cin >> e.medie;",
  "",
  "cout << e.nume;",
];

export type StructFieldKey = "nume" | "varsta" | "medie";

export type StructFieldsStep = {
  line: number;
  activeField: StructFieldKey | null;
  values: Record<StructFieldKey, string>;
  action: string;
  explanation: string;
};

const emptyValues = { nume: "neinițializat", varsta: "neinițializat", medie: "neinițializat" };

export const structFieldsSteps: StructFieldsStep[] = [
  { line: 0, activeField: null, values: emptyValues, action: "Definim un tip nou", explanation: "struct Elev este un tip creat de noi, care grupează toate informațiile despre un elev." },
  { line: 1, activeField: "nume", values: emptyValues, action: "Declarăm câmpul nume", explanation: "Un câmp este o informație din structură. Câmpurile pot avea tipuri diferite." },
  { line: 2, activeField: "varsta", values: emptyValues, action: "Declarăm câmpul varsta", explanation: "În aceeași structură păstrăm atât text, cât și numere." },
  { line: 3, activeField: "medie", values: emptyValues, action: "Declarăm câmpul medie", explanation: "Structura descrie forma comună pe care o va avea fiecare obiect Elev." },
  { line: 6, activeField: null, values: emptyValues, action: "Creăm variabila e", explanation: "Elev e; creează o variabilă care conține împreună toate cele trei câmpuri." },
  { line: 7, activeField: "nume", values: { ...emptyValues, nume: "Ana" }, action: "Accesăm e.nume", explanation: "Operatorul punct alege câmpul nume al variabilei e și citim valoarea Ana." },
  { line: 8, activeField: "varsta", values: { ...emptyValues, nume: "Ana", varsta: "18" }, action: "Accesăm e.varsta", explanation: "Citim vârsta în câmpul potrivit, fără să afectăm valoarea numelui." },
  { line: 9, activeField: "medie", values: { nume: "Ana", varsta: "18", medie: "9.75" }, action: "Accesăm e.medie", explanation: "Variabila e este acum completă: Ana, 18 ani și media 9.75." },
  { line: 11, activeField: "nume", values: { nume: "Ana", varsta: "18", medie: "9.75" }, action: "Folosim câmpul", explanation: "Accesăm din nou e.nume și afișăm Ana." },
];
