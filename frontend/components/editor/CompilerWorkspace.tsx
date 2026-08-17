"use client";

import { useState } from "react";
import {
  runCode,
  type RunCodeResult,
} from "../../services/submissionService";
import { CodeEditor } from "./CodeEditor";
import { Console } from "./Console";
import { RunButtons } from "./RunButtons";
import { StandardInput } from "./StandardInput";

type CompilerWorkspaceProps = {
  starterCode: string;
};

export function CompilerWorkspace({
  starterCode,
}: CompilerWorkspaceProps) {
  const [sourceCode, setSourceCode] = useState(starterCode);
  const [standardInput, setStandardInput] = useState("");
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
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-400">Exersare</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Compilator C++
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Scrie și testează orice program C++.
          </p>
        </div>

        <RunButtons
          showSubmit={false}
          onRun={handleRun}
          isRunning={isRunning}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <CodeEditor
          code={sourceCode}
          onCodeChange={setSourceCode}
          editable
          compact
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
      </div>
    </>
  );
}