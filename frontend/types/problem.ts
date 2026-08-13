export type ProblemStatus = "nerezolvată" | "rezolvată";
export type BacSubject = "Sub I" | "Sub II" | "Sub III";

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
  subject: BacSubject;
  status: ProblemStatus;
  content?: ProblemContent;
};
