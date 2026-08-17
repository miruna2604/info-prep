"use client";

import type { RunCodeResult } from "../../services/submissionService";

type ConsoleProps = {
  result: RunCodeResult | null;
  error: string | null;
  isRunning: boolean;
};

function getConsoleText(
  result: RunCodeResult | null,
  error: string | null,
  isRunning: boolean,
) {
  if (isRunning) {
    return "Codul se rulează prin Judge0...";
  }

  if (error) {
    return `Eroare de comunicare:\n${error}`;
  }

  if (!result) {
    return "Rulează codul pentru a vedea rezultatul aici.";
  }

  if (result.compileOutput) {
    return `Eroare de compilare:\n${result.compileOutput}`;
  }

  if (result.stderr) {
    return `Eroare la rulare:\n${result.stderr}`;
  }

  if (result.message) {
    return result.message;
  }

  if (result.stdout !== null) {
    return result.stdout || "(Programul nu a afișat nimic.)";
  }

  return "Judge0 nu a returnat output.";
}

export function Console({ result, error, isRunning }: ConsoleProps) {
  const text = getConsoleText(result, error, isRunning);

  return (
    <section className="min-h-40 rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              error || result?.compileOutput || result?.stderr
                ? "bg-rose-400"
                : result
                  ? "bg-emerald-400"
                  : "bg-slate-600"
            }`}
          />
          <span className="text-sm font-medium text-slate-200">Consolă</span>
        </div>

        {result && (
          <span className="text-xs text-slate-500">
            {result.status}
            {result.time ? ` · ${result.time}s` : ""}
          </span>
        )}
      </div>

      <pre className="whitespace-pre-wrap p-4 font-mono text-sm leading-6 text-slate-300">
        <code>{text}</code>
      </pre>
    </section>
  );
}