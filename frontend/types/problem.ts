export type ProblemDifficulty = "ușor" | "mediu" | "dificil";
export type ProblemStatus = "nerezolvată" | "în progres" | "rezolvată";

export type ProblemExample = {
  input: string;
  output: string;
  explanation?: string;
};

export type ProblemContent = {
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: ProblemExample[];
  starterCode: string;
};

export type Problem = {
  id: string;
  title: string;
  topic: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  content?: ProblemContent;
};
