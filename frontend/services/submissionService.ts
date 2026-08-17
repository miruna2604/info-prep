import { apiFetch } from "./api";

export type RunCodeInput = {
    sourceCode: string;
    stdin: string;
};

export type RunCodeResult = {
  status: string;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
};

type RunCodeApiResponse = {
  status: string;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
};

export async function runCode({
  sourceCode,
  stdin,
}: RunCodeInput): Promise<RunCodeResult> {
  const response = await apiFetch<RunCodeApiResponse>("/submission/run", {
    method: "POST",
    body: JSON.stringify({
      source_code: sourceCode,
      stdin,
    }),
  });

  return {
    status: response.status,
    stdout: response.stdout,
    stderr: response.stderr,
    compileOutput: response.compile_output,
    message: response.message,
    time: response.time,
    memory: response.memory,
  };
}