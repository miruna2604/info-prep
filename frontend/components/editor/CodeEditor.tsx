type CodeEditorProps = { code: string };

export function CodeEditor({ code }: CodeEditorProps) {
  return (
    <section className="flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-sm font-medium text-slate-200">C++</span>
        <span className="text-xs text-slate-500">main.cpp</span>
      </div>
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
    </section>
  );
}
