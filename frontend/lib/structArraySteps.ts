export const structArrayCode = [
  "int n = 3;",
  "Elev v[3];",
  "",
  "for (int i = 0; i < n; i++) {",
  "    cin >> v[i].nume;",
  "    cin >> v[i].varsta;",
  "    cin >> v[i].medie;",
  "}",
  "",
  "cout << v[0].nume;",
];

export type StudentValue = { nume: string; varsta: string; medie: string };
export type StructArrayStep = {
  line: number;
  index: number | null;
  field: keyof StudentValue | null;
  students: StudentValue[];
  action: string;
  explanation: string;
};

const empty = (): StudentValue => ({ nume: "—", varsta: "—", medie: "—" });
const snapshot = (students: StudentValue[]) => students.map((student) => ({ ...student }));
const input: StudentValue[] = [
  { nume: "Ana", varsta: "18", medie: "9.50" },
  { nume: "Mihai", varsta: "17", medie: "8.75" },
  { nume: "Ioana", varsta: "18", medie: "9.80" },
];

function buildSteps(): StructArrayStep[] {
  const students = [empty(), empty(), empty()];
  const steps: StructArrayStep[] = [
    { line: 0, index: null, field: null, students: snapshot(students), action: "Avem n = 3 elevi", explanation: "Vom memora trei elevi, nu trei valori simple." },
    { line: 1, index: null, field: null, students: snapshot(students), action: "Declarăm Elev v[3]", explanation: "Fiecare element v[i] este o structură Elev completă, cu trei câmpuri." },
  ];

  input.forEach((student, index) => {
    steps.push({ line: 3, index, field: null, students: snapshot(students), action: `i = ${index}`, explanation: `Selectăm elementul v[${index}], adică elevul de pe poziția ${index}.` });
    (Object.keys(student) as Array<keyof StudentValue>).forEach((field, offset) => {
      students[index][field] = student[field];
      steps.push({ line: 4 + offset, index, field, students: snapshot(students), action: `Citim v[${index}].${field}`, explanation: `Punctul selectează câmpul ${field} din structura aflată la poziția ${index}.` });
    });
  });

  steps.push({ line: 9, index: 0, field: "nume", students: snapshot(students), action: "Accesăm v[0].nume", explanation: "v[0] alege primul elev, iar .nume alege numele lui. Se afișează Ana." });
  return steps;
}

export const structArraySteps = buildSteps();
