import type { Chapter } from "../types/chapter";

export const chapters: Chapter[] = [
  {
    id: "bazele-cpp",
    title: "Bazele C++",
    description: "Variabile, citire, afișare, condiții și bucle.",
    lessons: [
      { id: "variabile", title: "Variabile și tipuri de date", description: "Cum memorăm și reprezentăm date în C++.", durationMinutes: 12, completed: true },
      { id: "citire-afisare", title: "Citire și afișare", description: "Folosim cin și cout pentru a comunica cu programul.", durationMinutes: 10, completed: true },
      { id: "operatori", title: "Operatori", description: "Operatori aritmetici, relaționali și logici.", durationMinutes: 14, completed: true },
      { id: "if-else", title: "Instrucțiunea if / else", description: "Luăm decizii în funcție de o condiție.", durationMinutes: 11, completed: true },
      {
        id: "for",
        title: "Bucla for",
        description: "Repetăm o instrucțiune de un număr cunoscut de ori.",
        durationMinutes: 13,
        completed: true,
        content: {
          objectives: ["să alegi corect situațiile în care folosești o buclă for", "să înțelegi inițializarea, condiția și actualizarea", "să poți parcurge un interval de numere"],
          introduction: "Bucla for repetă un bloc de instrucțiuni atunci când știm de la început de câte ori vrem să îl executăm. Este una dintre cele mai folosite structuri în problemele de Bac.",
          intuition: "Dacă trebuie să afișezi numerele de la 1 la 10, nu scrii cout de zece ori. Îi spui programului: pornește de la 1, continuă cât timp nu depășești 10 și avansează cu o unitate după fiecare pas.",
          steps: ["Inițializare: creăm contorul, de exemplu i = 1.", "Condiție: corpul buclei rulează cât timp i <= 10.", "Corp: executăm instrucțiunile dorite pentru valoarea curentă a lui i.", "Actualizare: după fiecare execuție, i crește cu 1."],
          syntax: "for (inițializare; condiție; actualizare) {\n  // instrucțiuni repetate\n}",
          exampleCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int suma = 0;\n\n  for (int i = 1; i <= 5; i++) {\n    suma += i;\n  }\n\n  cout << suma;\n  return 0;\n}",
          exampleExplanation: "La fiecare pas, i ia pe rând valorile 1, 2, 3, 4 și 5. Variabila suma acumulează aceste valori, iar la final afișăm 15.",
          exampleTrace: { columns: ["Pas", "i", "suma după suma += i"], rows: [["Inițial", "—", "0"], ["1", "1", "1"], ["2", "2", "3"], ["3", "3", "6"], ["4", "4", "10"], ["5", "5", "15"]], conclusion: "Când i devine 6, condiția i <= 5 nu mai este adevărată. Bucla se oprește și se afișează 15." },
          commonMistake: "Nu pune punct și virgulă după paranteza buclei: for (...) ;. Astfel, bucla are corp gol, iar blocul dintre acolade se va executa o singură dată.",
          keyIdeas: ["Folosește for când numărul de repetări este cunoscut sau ușor de exprimat.", "Contorul i se modifică după fiecare execuție a corpului buclei.", "Verifică atent limita: i < n și i <= n nu sunt același lucru."],
        },
      },
      { id: "while", title: "Buclele while și do while", description: "Repetăm cât timp o condiție este adevărată.", durationMinutes: 15, completed: false },
    ],
  },
  { id: "subprograme", title: "Subprograme", description: "Organizează soluțiile în funcții clare și reutilizabile.", lessons: [] },
  { id: "recursivitate", title: "Recursivitate", description: "Rezolvă probleme prin apeluri recursive.", lessons: [] },
  { id: "vectori", title: "Vectori", description: "Tablouri unidimensionale și parcurgeri uzuale.", lessons: [] },
  { id: "matrici", title: "Matrici", description: "Tablouri bidimensionale, linii, coloane și diagonale.", lessons: [] },
  { id: "siruri-caractere", title: "Șiruri de caractere", description: "Prelucrarea textelor și a caracterelor în C++.", lessons: [] },
  { id: "structuri", title: "Structuri", description: "Grupează date diferite într-un singur tip definit de tine.", lessons: [] },
  { id: "fisiere", title: "Fișiere", description: "Citește și scrie date în fișiere text.", lessons: [] },
  {
    id: "backtracking",
    title: "Backtracking",
    description: "Generează și explorează sistematic soluții posibile.",
    lessons: [
      { id: "arbore-decizii", title: "Arborele de decizii", description: "Modelăm alegerile posibile ale unui algoritm.", durationMinutes: 14, completed: false },
      { id: "permutari", title: "Generarea permutărilor", description: "Aplicăm backtracking pentru a genera permutări.", durationMinutes: 19, completed: false },
    ],
  },
  { id: "grafuri", title: "Grafuri", description: "Noduri, muchii și parcurgeri în grafuri.", lessons: [] },
  { id: "arbori", title: "Arbori", description: "Structuri ierarhice și parcurgeri de arbori.", lessons: [] },
];
