import type { Problem } from "../types/problem";

export const problems: Problem[] = [
  {
    id: "suma-cifrelor",
    title: "Suma cifrelor unui număr",
    subject: "Sub I",
    status: "rezolvată",
    content: {
      statement: "Se citește un număr natural n. Determină suma cifrelor sale.",
      inputFormat: "De la tastatură se citește numărul natural n.",
      outputFormat: "Afișează suma cifrelor lui n.",
      constraints: ["0 ≤ n ≤ 1.000.000.000", "n este un număr natural."],
      examples: [
        {
          input: "572",
          output: "14",
          explanation: "Cifrele sunt 5, 7 și 2, iar 5 + 7 + 2 = 14.",
        },
        {
          input: "1005",
          output: "6",
          explanation: "Cifrele de zero nu modifică suma: 1 + 0 + 0 + 5 = 6.",
        },
      ],
      starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long n;\n  cin >> n;\n\n  // Scrie soluția aici\n\n  return 0;\n}",
    },
  },
  { id: "numar-palindrom", title: "Verifică număr palindrom", subject: "Sub I", status: "rezolvată" },
  { id: "cea-mai-mare-cifra", title: "Cea mai mare cifră", subject: "Sub I", status: "nerezolvată" },
  { id: "numar-pare-vector", title: "Numere pare într-un vector", subject: "Sub II", status: "nerezolvată" },
  { id: "suma-diagonala", title: "Suma diagonalei principale", subject: "Sub II", status: "nerezolvată" },
  { id: "sortare-selectie", title: "Sortare prin selecție", subject: "Sub II", status: "nerezolvată" },
  { id: "subsecventa-crescatoare", title: "Cea mai lungă secvență crescătoare", subject: "Sub III", status: "nerezolvată" },
  { id: "generare-permutari", title: "Generarea permutărilor", subject: "Sub III", status: "nerezolvată" },
];
