"use client";

import { useEffect, useState } from "react";

export function useAlgorithmPlayer(stepCount: number, initialSpeed = 1500) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);

  useEffect(() => {
    if (!playing || index >= stepCount - 1) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => {
        const next = Math.min(current + 1, stepCount - 1);
        if (next === stepCount - 1) setPlaying(false);
        return next;
      });
    }, speed);
    return () => window.clearTimeout(timer);
  }, [index, playing, speed, stepCount]);

  function reset() { setPlaying(false); setIndex(0); }
  function previous() { setPlaying(false); setIndex((current) => Math.max(0, current - 1)); }
  function next() { setPlaying(false); setIndex((current) => Math.min(stepCount - 1, current + 1)); }
  function toggle() {
    if (index === stepCount - 1) setIndex(0);
    setPlaying((current) => !current);
  }

  return { index, playing, speed, setSpeed, setIndex, reset, previous, next, toggle };
}
