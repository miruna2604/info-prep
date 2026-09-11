"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { bacCurriculum, type CurriculumNode } from "../../lib/bacCurriculum";
import styles from "./CurriculumMap.module.css";

// Chapter indexes reference the curriculum; positions and edges describe a suggested route.
const positions = [
  { chapter: 0, x: 450, y: 55 },
  { chapter: 1, x: 160, y: 190 },
  { chapter: 4, x: 740, y: 190 },
  { chapter: 2, x: 160, y: 325 },
  { chapter: 12, x: 450, y: 325 },
  { chapter: 7, x: 740, y: 325 },
  { chapter: 3, x: 160, y: 460 },
  { chapter: 11, x: 450, y: 460 },
  { chapter: 8, x: 740, y: 460 },
  { chapter: 6, x: 160, y: 595 },
  { chapter: 5, x: 450, y: 595 },
  { chapter: 9, x: 740, y: 595 },
  { chapter: 10, x: 740, y: 730 },
];
const edges = [[0, 1], [0, 4], [1, 2], [1, 12], [12, 11], [4, 7], [2, 3], [2, 5], [7, 8], [3, 6], [8, 9], [9, 10]];

function NodeLabel({ node }: { node: CurriculumNode }) {
  return node.href ? <Link className={styles.topicLink} href={node.href}>{node.label}</Link> : <span>{node.label}</span>;
}

function Branches({ nodes }: { nodes: CurriculumNode[] }) {
  return <ul className={styles.branches}>{nodes.map((node) => (
    <li key={node.id} id={node.id}>
      <div className={node.children ? styles.branchLabel : styles.leafLabel}><NodeLabel node={node} /></div>
      {node.children && <Branches nodes={node.children} />}
    </li>
  ))}</ul>;
}

export function CurriculumMap() {
  const [selected, setSelected] = useState(0);
  const detailsRef = useRef<HTMLElement>(null);
  const chapter = bacCurriculum[selected];

  function selectChapter(index: number) {
    setSelected(index);
    if (window.matchMedia("(max-width: 1200px)").matches) {
      detailsRef.current?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>BAC INFORMATICĂ · C++</p><h1>Harta materiei</h1>
          <p>Urmărește conexiunile. Alege un capitol și explorează noțiunile.</p></div>
        <span className={styles.badge}>13 capitole</span>
      </header>
      <div className={styles.layout}>
        <div className={styles.mapPanel}>
          <div className={styles.mapCaption}><span><i />Parcurs sugerat</span><span>Selectează un capitol</span></div>
          <div className={styles.mapScroll} role="region" aria-label="Diagrama capitolelor. Pe ecrane mici, derulează orizontal." tabIndex={0}>
            <div className={styles.canvas}>
              <svg className={styles.connections} viewBox="0 0 900 800" fill="none" aria-hidden="true">
                {edges.map(([from, to]) => {
                  const a = positions.find((position) => position.chapter === from)!;
                  const b = positions.find((position) => position.chapter === to)!;
                  const start = a.y + 38;
                  const end = b.y - 38;
                  // Route this longer branch through the gutter, clear of the nodes.
                  const path = from === 2 && to === 5
                    ? `M ${a.x} ${start} C 160 390, 305 375, 305 410 L 305 520 C 305 550, 450 530, 450 ${end}`
                    : `M ${a.x} ${start} C ${a.x} ${(start + end) / 2}, ${b.x} ${(start + end) / 2}, ${b.x} ${end}`;
                  return <path key={`${from}-${to}`} className={selected === from || selected === to ? styles.activeEdge : undefined} d={path} />;
                })}
              </svg>
              {positions.map(({ chapter: index, x, y }) => {
                const node = bacCurriculum[index];
                return <button key={node.id} type="button" className={`${styles.mapNode} ${selected === index ? styles.selected : ""}`} style={{ left: `${x / 9}%`, top: `${y / 8}%` }} onClick={() => selectChapter(index)} aria-pressed={selected === index} aria-controls="chapter-details">
                  <span className={styles.nodeNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{node.label}</strong>
                  <span className={styles.nodeCount}>{node.children?.length ?? 0} subiecte <span aria-hidden="true">↗</span></span>
                </button>;
              })}
            </div>
          </div>
          <p className={styles.mapNote}>Conexiunile propun un traseu de învățare. Poți explora capitolele în orice ordine.</p>
        </div>
        <aside ref={detailsRef} className={styles.details} id="chapter-details" aria-label="Noțiunile capitolului selectat">
          <div className={styles.detailHeader}>
            <p className={styles.eyebrow}>CAPITOLUL {String(selected + 1).padStart(2, "0")}</p>
            <h2 aria-live="polite"><NodeLabel node={chapter} /></h2>
            <p>{chapter.children?.length} subiecte de explorat</p>
          </div>
          <div className={styles.detailBody} key={chapter.id}>
            {chapter.children && <Branches nodes={chapter.children} />}
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
