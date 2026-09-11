export type ProblemSubject = "Sub I" | "Sub II" | "Sub III";

export type ProblemExample = {
  input: string;
  output: string;
  explanation: string | null;
};

export type ProblemSummary = {
    id: number;
    slug: string;
    title: string;
    subject: ProblemSubject;
};

export type ProblemDetail = ProblemSummary & {
  statement: string;
  inputDescription: string;
  outputDescription: string;
  constraints: string[];
  examples: ProblemExample[];
  starterCode: string;
};