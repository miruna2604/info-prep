"use client";

type RunButtonsProps = {
  showSubmit?: boolean;
  onRun?: () => void;
  isRunning?: boolean;
};

export function RunButtons({
  showSubmit = true,
  onRun,
  isRunning = false,
}: RunButtonsProps) {
  const isRunDisabled = !onRun || isRunning;

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onRun}
        disabled={isRunDisabled}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isRunDisabled
            ? "bg-slate-800 text-slate-500"
            : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
        }`}
      >
        {isRunning ? "Se rulează..." : "Rulează"}
      </button>

      {showSubmit && (
        <button
          type="button"
          disabled
          className="rounded-lg bg-emerald-500/40 px-4 py-2 text-sm font-medium text-emerald-100/60"
        >
          Trimite
        </button>
      )}
    </div>
  );
}