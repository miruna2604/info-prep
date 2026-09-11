import type {ProblemDetail, ProblemExample, ProblemSubject, ProblemSummary} from "../types/problem";
import { apiFetch } from "./api";

type ProblemSummaryApiResponse = {
  id: number;
  slug: string;
  title: string;
  subject: ProblemSubject;
};

type ProblemExampleApiResponse = {
  input: string;
  output: string;
  explanation: string | null;
};

type ProblemDetailApiResponse = ProblemSummaryApiResponse & {
  statement: string;
  input_description: string;
  output_description: string;
  constraints: string[];
  examples: ProblemExampleApiResponse[];
  starter_code: string;
};

function mapProblemExample(
  response: ProblemExampleApiResponse,
): ProblemExample {
  return {
    input: response.input,
    output: response.output,
    explanation: response.explanation,
  };
}

function mapProblemSummary(
  response: ProblemSummaryApiResponse,
): ProblemSummary {
  return {
    id: response.id,
    slug: response.slug,
    title: response.title,
    subject: response.subject,
  };
}

export async function getProblems(): Promise<ProblemSummary[]> {
  const response = await apiFetch<ProblemSummaryApiResponse[]>(
    "/problems/",
  );

  return response.map(mapProblemSummary);
}

export async function getProblem(
  problemSlug: string,
): Promise<ProblemDetail> {
  const response = await apiFetch<ProblemDetailApiResponse>(
    `/problems/${encodeURIComponent(problemSlug)}`,
  );

  return {
    ...mapProblemSummary(response),
    statement: response.statement,
    inputDescription: response.input_description,
    outputDescription: response.output_description,
    constraints: response.constraints,
    examples: response.examples.map(mapProblemExample),
    starterCode: response.starter_code,
  };
}