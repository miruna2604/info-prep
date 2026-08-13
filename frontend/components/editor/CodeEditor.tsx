"use client";

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
          spellCheck={false}
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
