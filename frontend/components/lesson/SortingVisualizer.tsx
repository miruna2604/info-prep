"use client";

import { useMemo, useState } from "react";
import { AlgorithmCodePanel } from "../algorithm-visualizer/AlgorithmCodePanel";
import { AlgorithmControls } from "../algorithm-visualizer/AlgorithmControls";
import { AlgorithmExampleSelector } from "../algorithm-visualizer/AlgorithmExampleSelector";
import { ArrayStage } from "../algorithm-visualizer/ArrayStage";
import { useAlgorithmPlayer } from "../algorithm-visualizer/useAlgorithmPlayer";
import type { AlgorithmPreset, ArrayAnimationStep } from "../algorithm-visualizer/types";
import { sortingConfigs, sortingPresets, type SortingAlgorithmSlug } from "../../lib/sortingAlgorithms";

export function SortingVisualizer({ algorithm }: { algorithm: SortingAlgorithmSlug }) {
  const config = sortingConfigs[algorithm];
  const [input, setInput] = useState(config.defaults.join(", "));
  const [values, setValues] = useState(config.defaults);
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [error, setError] = useState("");
  const steps = useMemo(() => config.build(values), [config, values]);
  const player = useAlgorithmPlayer(steps.length);
  const current = steps[player.index];
  const visualStep: ArrayAnimationStep = {
    kind: current.kind,
    values: current.values,
    activeLines: current.kind === "swap" ? [7, 8, 9] : [current.line],
    activeIndices: current.compare ?? (current.minimumIndex !== null ? [current.minimumIndex] : []),
    swapIndices: current.swapIndices,
    sortedStart: current.sortedStart,
    sortedEnd: current.sortedEnd,
    action: current.action,
    explanation: current.explanation,
    metrics: [
      { label: "i", value: current.i },
      { label: "j", value: current.j ?? "—" },
      ...(current.changed !== null ? [{ label: "schimbat", value: current.changed ? "true" : "false" }] : []),
      ...(current.heldValue !== null ? [{ label: algorithm === "insertion-sort" ? "x" : "aux", value: current.heldValue }] : []),
    ],
    comparisonLabels: algorithm === "selection-sort" ? ["v[j]", "v[pozMin]"] : ["v[j]", "v[j+1]"],
  };

  function choosePreset(preset: AlgorithmPreset) {
    setSelectedPreset(preset.id);
    setInput(preset.values.join(", "));
    setValues([...preset.values]);
    setError("");
    player.reset();
  }

  function loadValues() {
    const parts = input.split(/[ ,;]+/).filter(Boolean);
    if (parts.length < 2 || parts.length > 10 || parts.some((part) => !/^-?\d+$/.test(part))) {
      setError("Introdu între 2 și 10 numere întregi, separate prin spațiu sau virgulă.");
      return;
    }
    const parsed = parts.map(Number);
    if (parsed.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 99)) {
      setError("Pentru o animație clară, folosește valori între -99 și 99.");
      return;
    }
    setError("");
    setValues(parsed);
    player.reset();
  }

  return <section className="overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-[#07111f] shadow-2xl shadow-black/25">
    <header className="border-b border-slate-800 bg-slate-950/45 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">Sortare pas cu pas</p><h2 className="mt-1 text-xl font-semibold text-white">{config.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{config.description}</p></header>
    <AlgorithmExampleSelector presets={[...sortingPresets]} selected={selectedPreset} input={input} onPreset={choosePreset} onCustom={() => { setSelectedPreset("custom"); player.reset(); }} onInput={setInput} onLoad={loadValues} />
    {error && <p className="border-b border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm text-rose-200">{error}</p>}
    <div className="grid lg:grid-cols-[0.9fr_1.1fr]"><AlgorithmCodePanel code={config.code} activeLines={visualStep.activeLines} /><ArrayStage step={visualStep} /></div>
    <AlgorithmControls index={player.index} count={steps.length} playing={player.playing} speed={player.speed} onReset={player.reset} onPrevious={player.previous} onToggle={player.toggle} onNext={player.next} onSpeedChange={player.setSpeed} />
  </section>;
}
