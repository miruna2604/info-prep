export type AlgorithmEventKind =
  | "highlight"
  | "compare"
  | "swap"
  | "move"
  | "markSorted"
  | "complete";

export type AlgorithmPreset = {
  id: string;
  label: string;
  values: readonly number[];
};

export type ArrayAnimationStep = {
  kind: AlgorithmEventKind;
  values: Array<number | null>;
  activeLines: number[];
  activeIndices: number[];
  swapIndices: [number, number] | null;
  sortedStart: number | null;
  sortedEnd: number | null;
  action: string;
  explanation: string;
  metrics?: Array<{ label: string; value: string | number }>;
  comparisonLabels?: [string, string];
};
