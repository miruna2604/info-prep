"use client";

import { useState } from "react";
import {
  runCode,
  type RunCodeResult,
} from "../../services/submissionService";
import { CodeEditor } from "../editor/CodeEditor";
import { Console } from "../editor/Console";
import { RunButtons } from "../editor/RunButtons";
import { StandardInput } from "../editor/StandardInput";

type ProblemWorkspaceProps = {
  starterCode: string;
  initialInput: string;
};

export function ProblemWorkspace({
  starterCode,
  initialInput,
}: ProblemWorkspaceProps) {
  const [sourceCode, setSourceCode] = useState(starterCode);
  const [standardInput, setStandardInput] = useState(initialInput);
  const [result, setResult] = useState<RunCodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  async function handleRun() {
    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const runResult = await runCode({
        sourceCode,
        stdin: standardInput,
      });

      setResult(runResult);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "A apărut o eroare necunoscută.";

      setError(message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <CodeEditor
        code={sourceCode}
        onCodeChange={setSourceCode}
        editable
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <StandardInput
          value={standardInput}
          onInputChange={setStandardInput}
        />

        <Console
          result={result}
          error={error}
          isRunning={isRunning}
        />
      </div>

      <RunButtons
        showSubmit
        onRun={handleRun}
        isRunning={isRunning}
      />
    </div>
  );
}