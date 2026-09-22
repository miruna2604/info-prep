"use client";

type RunButtonsProps = {
  showSubmit?: boolean;
  onRun?: () => void;
  onSubmit?: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
};

export function RunButtons({
  showSubmit = true,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}: RunButtonsProps) {
  const isRunDisabled = !onRun || isRunning || isSubmitting;
  const isSubmitDisabled = !onSubmit || isRunning || isSubmitting;

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
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isSubmitDisabled
              ? "bg-emerald-500/40 text-emerald-100/60"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {isSubmitting ? "Se trimite..." : "Trimite"}
        </button>
      )}
    </div>
  );
}
