"use client";

import Link from "next/link";
import { createContext, useContext, useRef } from "react";
import { useCurriculumMapState } from "./useCurriculumMapState";
import { bacCurriculum, type CurriculumNode } from "../../lib/bacCurriculum";
import styles from "./CurriculumMap.module.css";

// Chapter indexes reference the curriculum; positions and edges describe a suggested route.
const positions = [
  { chapter: 0, x: 550, y: 60, label: "BAZELE C++" },
  { chapter: 1, x: 330, y: 190 },
  { chapter: 4, x: 880, y: 190 },
  { chapter: 2, x: 330, y: 320 },
  { chapter: 7, x: 770, y: 320 },
  { chapter: 9, x: 990, y: 320 },
  { chapter: 3, x: 110, y: 450 },
  { chapter: 5, x: 330, y: 450, label: "Șiruri" },
  { chapter: 6, x: 550, y: 450, label: "Struct" },
  { chapter: 8, x: 770, y: 450 },
  { chapter: 10, x: 990, y: 450 },
  { chapter: 11, x: 330, y: 580, label: "Fișiere" },
  { chapter: 12, x: 330, y: 710, label: "ALGORITMI EFICIENȚI" },
];
const edges = [
  [0, 1], [0, 4], [1, 2],
  [2, 3], [2, 5], [2, 6],
  [3, 11], [5, 11], [6, 11], [11, 12],
  [4, 7], [4, 9], [7, 8], [9, 10],
];

function NodeLabel({ node }: { node: CurriculumNode }) {
  return node.href ? <Link className={styles.topicLink} href={node.href}>{node.label}</Link> : <span>{node.label}</span>;
}

const DropdownContext = createContext<{ expanded: Record<string, boolean>; toggle: (id: string) => void }>({
  expanded: {}, toggle: () => {},
});

function CollapsibleBranch({ node }: { node: CurriculumNode }) {
  const dropdowns = useContext(DropdownContext);
  const expanded = dropdowns.expanded[node.id] ?? false;
  const hasChildren = Boolean(node.children?.length);
  const childrenId = `${node.id}-children`;

  return (
    <li id={node.id}>
      <div className={`${hasChildren ? styles.branchLabel : styles.leafLabel} ${styles.dropdownRow}`}>
        <span className={styles.dropdownLabel}><NodeLabel node={node} /></span>
        {hasChildren && (
          <button
            type="button"
            className={styles.dropdownToggle}
            aria-expanded={expanded}
            aria-controls={childrenId}
            aria-label={`${expanded ? "Restrânge" : "Extinde"}: ${node.label}`}
            onClick={() => dropdowns.toggle(node.id)}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && node.children && (
        <Branches nodes={node.children} collapsible id={childrenId} hidden={!expanded} />
      )}
    </li>
  );
}

function Branches({ nodes, collapsible = false, id, hidden = false }: {
  nodes: CurriculumNode[];
  collapsible?: boolean;
  id?: string;
  hidden?: boolean;
}) {
  return <ul className={styles.branches} id={id} hidden={hidden}>{nodes.map((node) => collapsible ? (
    <CollapsibleBranch key={node.id} node={node} />
  ) : (
    <li key={node.id} id={node.id}>
      <div className={node.children ? styles.branchLabel : styles.leafLabel}><NodeLabel node={node} /></div>
      {node.children && <Branches nodes={node.children} />}
    </li>
  ))}</ul>;
}

export function CurriculumMap() {
  const { selected, setSelected, expanded, toggle, pageRef, mapRef, bodyRef } = useCurriculumMapState();
  const detailsRef = useRef<HTMLElement>(null);
  const chapter = bacCurriculum[selected];

  function selectChapter(index: number) {
    setSelected(index);
    if (window.matchMedia("(max-width: 1200px)").matches) {
      detailsRef.current?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <section ref={pageRef} className={styles.page}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>BAC INFORMATICĂ · C++</p><h1>Harta materiei</h1>
          <p>Urmărește conexiunile. Alege un capitol și explorează noțiunile.</p></div>
        <span className={styles.badge}>13 capitole</span>
      </header>
      <div className={styles.layout}>
        <div className={styles.mapPanel}>
          <div className={styles.mapCaption}><span><i />Parcurs sugerat</span><span>Selectează un capitol</span></div>
          <div ref={mapRef} className={styles.mapScroll} role="region" aria-label="Diagrama capitolelor. Pe ecrane mici, derulează orizontal." tabIndex={0}>
            <div className={styles.canvas}>
              <svg className={styles.connections} viewBox="0 0 1100 780" fill="none" aria-hidden="true">
                {edges.map(([from, to]) => {
                  const a = positions.find((position) => position.chapter === from)!;
                  const b = positions.find((position) => position.chapter === to)!;
                  const start = a.y + 38;
                  const end = b.y - 38;
                  const path = `M ${a.x} ${start} C ${a.x} ${(start + end) / 2}, ${b.x} ${(start + end) / 2}, ${b.x} ${end}`;
                  return <path key={`${from}-${to}`} className={selected === from || selected === to ? styles.activeEdge : undefined} d={path} />;
                })}
              </svg>
              {positions.map(({ chapter: index, x, y, label }) => {
                const node = bacCurriculum[index];
                return <button key={node.id} type="button" className={`${styles.mapNode} ${selected === index ? styles.selected : ""}`} style={{ left: `${x / 11}%`, top: `${y / 7.8}%` }} onClick={() => selectChapter(index)} aria-pressed={selected === index} aria-controls="chapter-details">
                  <span className={styles.nodeNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label ?? node.label}</strong>
                  <span className={styles.nodeCount}>{index === 12 ? "— SIII.3 —" : `${node.children?.length ?? 0} subiecte`} <span aria-hidden="true">↗</span></span>
                </button>;
              })}
            </div>
          </div>
          <p className={styles.mapNote}>Conexiunile propun un traseu de învățare. Poți explora capitolele în orice ordine.</p>
        </div>
        <aside ref={detailsRef} className={styles.details} id="chapter-details" aria-label="Noțiunile capitolului selectat">
          <div className={styles.detailHeader}>
            <p className={styles.eyebrow}>CAPITOLUL {String(selected + 1).padStart(2, "0")}</p>
            <h2 aria-live="polite">{selected === 0 ? "BAZELE C++" : <NodeLabel node={chapter} />}</h2>
            <p>{chapter.children?.length} subiecte de explorat</p>
          </div>
          <div ref={bodyRef} className={styles.detailBody} key={chapter.id}>
            <DropdownContext.Provider value={{ expanded, toggle }}>
            {chapter.children && <Branches nodes={chapter.children} collapsible={["bazele-c", "vectori", "structuri-struct"].includes(chapter.id)} />}
            </DropdownContext.Provider>
          </div>
          <div className={styles.chapterNav}>
            <button type="button" disabled={selected === 0} onClick={() => setSelected(selected - 1)} aria-label="Capitolul anterior">← Anterior</button>
            <span>{selected + 1} / 13</span>
            <button type="button" disabled={selected === 12} onClick={() => setSelected(selected + 1)} aria-label="Capitolul următor">Următor →</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
