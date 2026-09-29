"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { bacCurriculum } from "../../lib/bacCurriculum";

const STORAGE_KEY = "infoprep:curriculum-map:v1";
type View = { selected: number; expanded: Record<string, boolean> };
type ScrollPosition = { x: number; y: number };
type Snapshot = View & {
  window: ScrollPosition;
  main: ScrollPosition;
  map: ScrollPosition;
  details: ScrollPosition;
};

function position(element: HTMLElement | null): ScrollPosition {
  return { x: element?.scrollLeft ?? 0, y: element?.scrollTop ?? 0 };
}

function restore(element: HTMLElement | null, saved: ScrollPosition) {
  element?.scrollTo({ left: saved.x, top: saved.y, behavior: "instant" });
}

function isPosition(value: unknown): value is ScrollPosition {
  if (!value || typeof value !== "object") return false;
  const point = value as ScrollPosition;
  return Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0 && point.y >= 0;
}

export function useCurriculumMapState() {
  const [view, setView] = useState<View>({ selected: 0, expanded: {} });
  const [ready, setReady] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const latest = useRef(view);
  const pending = useRef<Snapshot | null>(null);
  const restoring = useRef(true);

  // Read only after hydration, so server and client initially render the same UI.
  useLayoutEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as Snapshot | null;
      if (saved && Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < bacCurriculum.length
          && saved.expanded && typeof saved.expanded === "object"
          && [saved.window, saved.main, saved.map, saved.details].every(isPosition)) {
        const expanded = Object.fromEntries(Object.entries(saved.expanded).filter(([, value]) => value === true));
        pending.current = { ...saved, expanded };
        setView({ selected: saved.selected, expanded });
      }
    } catch { /* Storage may be unavailable; the map remains usable. */ }
    setReady(true);
  }, []);

  useLayoutEffect(() => { latest.current = view; }, [view]);

  useLayoutEffect(() => {
    if (!ready) return;
    const saved = pending.current;
    const apply = () => {
      if (!saved) return;
      restore(mapRef.current, saved.map);
      restore(bodyRef.current, saved.details);
      restore(pageRef.current?.closest<HTMLElement>(".app-main") ?? null, saved.main);
      window.scrollTo({ left: saved.window.x, top: saved.window.y, behavior: "instant" });
    };
    // The restored chapter and dropdowns must exist before restoring scroll.
    apply();
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      apply();
      secondFrame = requestAnimationFrame(() => {
        apply();
        pending.current = null;
        restoring.current = false;
      });
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const page = pageRef.current;
    let leaving = false;
    const save = () => {
      if (leaving || restoring.current || !page?.isConnected) return;
      const snapshot: Snapshot = {
        ...latest.current,
        window: { x: window.scrollX, y: window.scrollY },
        main: position(page.closest<HTMLElement>(".app-main")),
        map: position(mapRef.current),
        details: position(bodyRef.current),
      };
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot)); } catch { /* Optional persistence. */ }
    };
    const beforeNavigation = (event: MouseEvent) => {
      save();
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
          && (!link.getAttribute("target") || link.getAttribute("target") === "_self")) {
        // Ignore scroll resets performed by the router while leaving the map.
        leaving = true;
      }
    };
    // Capture saves before Next's Link handles navigation, without changing hrefs.
    document.addEventListener("scroll", save, true);
    page?.addEventListener("click", beforeNavigation, true);
    window.addEventListener("pagehide", save);
    return () => {
      document.removeEventListener("scroll", save, true);
      page?.removeEventListener("click", beforeNavigation, true);
      window.removeEventListener("pagehide", save);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready || restoring.current) return;
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...saved, ...view,
        window: { x: window.scrollX, y: window.scrollY },
        main: position(pageRef.current?.closest<HTMLElement>(".app-main") ?? null),
        map: position(mapRef.current), details: position(bodyRef.current),
      }));
    } catch { /* Optional persistence. */ }
  }, [view, ready]);

  return {
    selected: view.selected,
    expanded: view.expanded,
    setSelected: (selected: number) => setView((current) => ({ ...current, selected })),
    toggle: (id: string) => setView((current) => ({
      ...current, expanded: { ...current.expanded, [id]: !current.expanded[id] },
    })),
    pageRef, mapRef, bodyRef,
  };
}
