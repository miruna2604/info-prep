"use client";

type StandardInputProps = {
  value: string;
  onInputChange: (value: string) => void;
};

export function StandardInput({ value, onInputChange }: StandardInputProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-4 py-3">
        <span className="text-sm font-medium text-slate-200">Intrare standard</span>
      </div>
      <textarea
        aria-label="Intrare standard"
        value={value}
        onChange={(event) => onInputChange(event.target.value)}
        spellCheck={false}
        placeholder="Introdu datele de intrare aici..."
        className="h-32 w-full resize-none bg-transparent p-4 font-mono text-sm text-slate-300 outline-none placeholder:text-slate-600"
      />
    </section>
  );
}
