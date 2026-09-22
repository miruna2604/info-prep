"use client";

import { useState } from "react";
import { ApiError } from "../../services/api";
import {
  runCode,
  submitSolution,
  type RunCodeResult,
  type SubmitSolutionResult,
} from "../../services/submissionService";
import { CodeEditor } from "../editor/CodeEditor";
import { Console } from "../editor/Console";
import { RunButtons } from "../editor/RunButtons";
import { StandardInput } from "../editor/StandardInput";
import { SubmitResult } from "./SubmitResult";

type ProblemWorkspaceProps = {
  problemId: number;
  starterCode: string;
  initialInput: string;
};

export function ProblemWorkspace({problemId, starterCode, initialInput,}: ProblemWorkspaceProps) {
  const [sourceCode, setSourceCode] = useState(starterCode);
  const [standardInput, setStandardInput] = useState(initialInput);
  const [result, setResult] = useState<RunCodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitSolutionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitResult(null);
    setSubmitError(null);
    setRequiresLogin(false);

    try {
      const result = await submitSolution(problemId, sourceCode);
      setSubmitResult(result);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setRequiresLogin(true);
        setSubmitError("Intră în cont pentru a trimite soluția.");
      } else {
        setSubmitError(
          error instanceof Error ? error.message : "Nu am putut trimite soluția.",
        );
      }
    } finally {
      setIsSubmitting(false);
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
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />
      <SubmitResult
        result={submitResult}
        error={submitError}
        requiresLogin={requiresLogin}
      />
    </div>
  );
}
