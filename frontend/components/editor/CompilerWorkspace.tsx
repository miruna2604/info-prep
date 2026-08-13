"use client";

import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { Console } from "./Console";
import { StandardInput } from "./StandardInput";

type CompilerWorkspaceProps = {
  starterCode: string;
};

export function CompilerWorkspace({ starterCode }: CompilerWorkspaceProps) {
  const [sourceCode, setSourceCode] = useState(starterCode);
  const [standardInput, setStandardInput] = useState("");

  return (
    <div className="mt-6 flex flex-col gap-4">
      <CodeEditor
        code={sourceCode}
        onCodeChange={setSourceCode}
        editable
        compact
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <StandardInput value={standardInput} onInputChange={setStandardInput} />
        <Console />
      </div>
      <p className="text-xs text-slate-600">
        Codul și datele de intrare sunt păstrate local până când conectăm
        rularea la Judge0.
      </p>
    </div>
  );
}
