import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { buildCountDigitsSteps, countDigitsCodeLines } from "../lib/countDigitsSteps";

export type CountDigitsReelProps = {
  value: number;
  brand: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  closingLine1: string;
  closingLine2: string;
  secondsPerStep: number;
  introSeconds: number;
  outroSeconds: number;
  backgroundLogoOpacity: number;
  cornerLogoOpacity: number;
};

const FPS = 30;
const frames = (seconds: number) => Math.round(seconds * FPS);

export const countDigitsReelDuration = (
  value: number,
  secondsPerStep: number,
  introSeconds: number,
  outroSeconds: number,
) =>
  frames(introSeconds) +
  buildCountDigitsSteps(value).length * frames(secondsPerStep) +
  frames(outroSeconds);

export function CountDigitsReel(props: CountDigitsReelProps) {
  const {
    value, brand, titleLine1, titleLine2, subtitle, closingLine1, closingLine2,
    secondsPerStep, introSeconds, outroSeconds, backgroundLogoOpacity, cornerLogoOpacity,
  } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepFrames = frames(secondsPerStep);
  const introFrames = frames(introSeconds);
  const outroFrames = frames(outroSeconds);
  const steps = buildCountDigitsSteps(value);
  const timelineFrame = Math.max(0, frame - introFrames);
  const stepIndex = Math.min(steps.length - 1, Math.floor(timelineFrame / stepFrames));
  const step = steps[stepIndex];
  const localFrame = timelineFrame % stepFrames;
  const entrance = spring({ frame, fps, config: { damping: 16 } });
  const stepEntrance = spring({ frame: localFrame, fps, config: { damping: 18, stiffness: 170 } });
  const outroStart = introFrames + steps.length * stepFrames;
  const outro = interpolate(frame, [outroStart, outroStart + 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const visibleValue = String(Math.abs(value));
  const remainingLength = step.n === 0 ? 0 : String(Math.abs(step.n)).length;
  const removedCount = visibleValue.length - remainingLength;
  const activeIndex = visibleValue.length - removedCount - 1;
  const result = steps.at(-1)?.count ?? 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050c16", color: "white", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", padding: "90px 72px 110px", overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: 0.22, backgroundImage: "linear-gradient(rgba(71,85,105,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(71,85,105,.35) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: 999, background: "rgba(56,189,248,.13)", filter: "blur(100px)", top: 260, right: -220 }} />
      <Img src={staticFile("infoprep-logo.png")} style={{ position: "absolute", width: 820, height: 820, objectFit: "contain", left: 130, top: 545, opacity: backgroundLogoOpacity, mixBlendMode: "screen", filter: "saturate(.75)" }} />
      <Img src={staticFile("infoprep-logo.png")} style={{ position: "absolute", width: 150, height: 150, objectFit: "contain", right: 70, top: 60, opacity: cornerLogoOpacity, mixBlendMode: "screen", zIndex: 2 }} />

      <div style={{ position: "relative", opacity: entrance, transform: `translateY(${(1 - entrance) * 30}px)` }}>
        <div style={{ color: "#7dd3fc", fontWeight: 800, fontSize: 28, letterSpacing: 5 }}>{brand.toUpperCase()}</div>
        <h1 style={{ fontSize: 78, lineHeight: 1.04, letterSpacing: -4, margin: "34px 0 18px", maxWidth: 900 }}>{titleLine1}<br /><span style={{ color: "#7dd3fc" }}>{titleLine2}</span></h1>
        <p style={{ color: "#94a3b8", fontSize: 31, margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ position: "relative", display: "flex", gap: 22, marginTop: 62 }}>
        <ValueCard label="NUMĂRUL n" value={step.n} color="#93c5fd" />
        <ValueCard label="NUMĂR DE CIFRE" value={step.count} color="#7dd3fc" />
      </div>

      <div style={{ position: "relative", marginTop: 42, textAlign: "center" }}>
        <div style={{ color: "#64748b", fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>ÎMPĂRȚIM LA 10 ȘI NUMĂRĂM</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24 }}>
          {visibleValue.split("").map((digit, index) => {
            const removed = index >= visibleValue.length - removedCount;
            const active = index === activeIndex && step.activeDigitIndex !== null && ["loop-check", "count", "remove"].includes(step.kind);
            return <div key={`${digit}-${index}`} style={{ width: 112, height: 118, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 24, border: `2px solid ${active ? "#fcd34d" : removed ? "#334155" : "#60a5fa"}`, background: active ? "rgba(252,211,77,.18)" : removed ? "rgba(15,23,42,.5)" : "rgba(59,130,246,.13)", color: active ? "#fde68a" : removed ? "#475569" : "#bfdbfe", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 800, fontSize: 52, opacity: removed ? 0.45 : 1, transform: active ? `translateY(${-22 * stepEntrance}px) scale(${1 + 0.08 * stepEntrance})` : "none", boxShadow: active ? "0 18px 60px rgba(245,158,11,.2)" : "none" }}>{digit}</div>;
          })}
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 42, padding: "26px 32px", minHeight: 112, borderRadius: 24, border: "1px solid #334155", background: "rgba(15,23,42,.88)", textAlign: "center", opacity: stepEntrance, transform: `translateY(${(1 - stepEntrance) * 15}px)` }}>
        <div style={{ color: "#e2e8f0", fontSize: 28, lineHeight: 1.35 }}>{step.explanation}</div>
      </div>

      <div style={{ position: "relative", marginTop: 34, borderRadius: 26, overflow: "hidden", border: "1px solid #263449", background: "rgba(2,6,23,.92)" }}>
        <div style={{ padding: "15px 28px", color: "#64748b", fontSize: 21, borderBottom: "1px solid #1e293b", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>main.cpp</div>
        <div style={{ padding: "10px 0" }}>
          {countDigitsCodeLines.map((line, index) => <div key={`${index}-${line}`} style={{ minHeight: 41, display: "flex", alignItems: "center", padding: "0 28px", borderLeft: `5px solid ${index === step.line ? "#38bdf8" : "transparent"}`, background: index === step.line ? "rgba(56,189,248,.13)" : "transparent", color: index === step.line ? "#e0f2fe" : "#94a3b8", fontSize: 23, whiteSpace: "pre", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}><span style={{ color: "#334155", width: 45, marginRight: 20, textAlign: "right" }}>{index + 1}</span>{line}</div>)}
        </div>
      </div>

      <div style={{ position: "absolute", left: 72, right: 72, bottom: 66 }}><div style={{ height: 8, borderRadius: 99, background: "#1e293b", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.min(100, (frame / (outroStart + outroFrames)) * 100)}%`, background: "#38bdf8", borderRadius: 99 }} /></div></div>

      {outro > 0 && <AbsoluteFill style={{ background: "rgba(5,12,22,.97)", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: outro, transform: `scale(${0.94 + outro * 0.06})` }}>
        <div style={{ color: "#7dd3fc", fontWeight: 800, fontSize: 28, letterSpacing: 5 }}>{brand.toUpperCase()}</div>
        <div style={{ fontSize: 45, color: "#94a3b8", marginTop: 48 }}>Rezultatul final</div>
        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 92, fontWeight: 900, color: "#7dd3fc", marginTop: 24 }}>{value} are {result} {result === 1 ? "cifră" : "cifre"}</div>
        <div style={{ fontSize: 42, fontWeight: 700, marginTop: 90 }}>{closingLine1}<br /><span style={{ color: "#7dd3fc" }}>{closingLine2}</span></div>
      </AbsoluteFill>}
    </AbsoluteFill>
  );
}

function ValueCard({ label, value, color }: { label: string; value: number; color: string }) {
  return <div style={{ flex: 1, padding: "25px 30px", border: `1px solid ${color}44`, borderRadius: 24, background: `${color}0d` }}><div style={{ color, fontSize: 21, fontWeight: 700, letterSpacing: 3 }}>{label}</div><div style={{ color, fontSize: 62, fontWeight: 850, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", marginTop: 7 }}>{value}</div></div>;
}
