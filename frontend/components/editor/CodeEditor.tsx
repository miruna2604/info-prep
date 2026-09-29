"use client";

import type { KeyboardEvent } from "react";

const INDENT = "    ";

type CodeEditorProps = {
  code: string;
  compact?: boolean;
  editable?: boolean;
  onCodeChange?: (code: string) => void;
};

export function CodeEditor({
  code,
  compact = false,
  editable = false,
  onCodeChange,
}: CodeEditorProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!onCodeChange || (event.key !== "Tab" && event.key !== "Enter")) return;

    event.preventDefault();

    const textarea = event.currentTarget;
    const currentCode = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (event.key === "Enter") {
      const lineStart = currentCode.lastIndexOf("\n", start - 1) + 1;
      const indentation = currentCode.slice(lineStart, start).match(/^[ \t]*/)?.[0] ?? "";
      const insertion = `\n${indentation}`;

      onCodeChange(currentCode.slice(0, start) + insertion + currentCode.slice(end));
      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + insertion.length, start + insertion.length);
      });
      return;
    }

    const hasSelection = start !== end;

    if (!hasSelection && !event.shiftKey) {
      onCodeChange(currentCode.slice(0, start) + INDENT + currentCode.slice(end));
      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + INDENT.length, start + INDENT.length);
      });
      return;
    }

    const firstLineStart = currentCode.lastIndexOf("\n", start - 1) + 1;
    const lastSelectedCharacter = hasSelection && currentCode[end - 1] === "\n"
      ? end - 1
      : end;
    const nextLineBreak = currentCode.indexOf("\n", lastSelectedCharacter);
    const blockEnd = nextLineBreak === -1 ? currentCode.length : nextLineBreak;
    const selectedBlock = currentCode.slice(firstLineStart, blockEnd);
    const lines = selectedBlock.split("\n");

    const updatedLines = lines.map((line) => {
      if (!event.shiftKey) return INDENT + line;
      if (line.startsWith("\t")) return line.slice(1);
      return line.replace(/^ {1,4}/, "");
    });
    const updatedBlock = updatedLines.join("\n");

    if (updatedBlock === selectedBlock) return;

    onCodeChange(
      currentCode.slice(0, firstLineStart) + updatedBlock + currentCode.slice(blockEnd),
    );

    requestAnimationFrame(() => {
      if (hasSelection) {
        textarea.setSelectionRange(firstLineStart, firstLineStart + updatedBlock.length);
      } else {
        const removed = selectedBlock.length - updatedBlock.length;
        const nextPosition = Math.max(firstLineStart, start - removed);
        textarea.setSelectionRange(nextPosition, nextPosition);
      }
    });
  }

  return (
    <section className={`flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 ${compact ? "min-h-[320px]" : "min-h-[420px]"}`}>
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-sm font-medium text-slate-200">C++</span>
        <span className="text-xs text-slate-500">main.cpp</span>
      </div>
      {editable ? (
        <textarea
          aria-label="Editor de cod C++"
          value={code}
          onChange={(event) => onCodeChange?.(event.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          title="Tab: indentează · Shift+Tab: retrage indentarea"
          className="min-h-0 flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600"
        />
      ) : (
        <pre className="flex-1 overflow-auto p-4 font-mono text-sm leading-7 text-slate-200">
          <code>
            {code.split("\n").map((line, index) => (
              <span key={`${index}-${line}`} className="flex">
                <span className="mr-4 w-6 select-none text-right text-slate-600">{index + 1}</span>
                <span>{line || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      )}
    </section>
  );
}
