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
import { buildDigitSumSteps, digitSumCodeLines } from "../lib/digitSumSteps";

export type DigitSumReelProps = {
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
const secondsToFrames = (seconds: number) => Math.round(seconds * FPS);

export const digitSumReelDuration = (
  value: number,
  secondsPerStep: number,
  introSeconds: number,
  outroSeconds: number,
) =>
  secondsToFrames(introSeconds) +
  buildDigitSumSteps(value).length * secondsToFrames(secondsPerStep) +
  secondsToFrames(outroSeconds);

export function DigitSumReel({
  value,
  brand,
  titleLine1,
  titleLine2,
  subtitle,
  closingLine1,
  closingLine2,
  secondsPerStep,
  introSeconds,
  outroSeconds,
  backgroundLogoOpacity,
  cornerLogoOpacity,
}: DigitSumReelProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepFrames = secondsToFrames(secondsPerStep);
  const introFrames = secondsToFrames(introSeconds);
  const outroFrames = secondsToFrames(outroSeconds);
  const steps = buildDigitSumSteps(value);
  const timelineFrame = Math.max(0, frame - introFrames);
  const stepIndex = Math.min(
    steps.length - 1,
    Math.floor(timelineFrame / stepFrames),
  );
  const step = steps[stepIndex];
  const localFrame = timelineFrame % stepFrames;
  const entrance = spring({ frame, fps, config: { damping: 16 } });
  const stepEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 170 },
  });
  const outroStart = introFrames + steps.length * stepFrames;
  const outro = interpolate(frame, [outroStart, outroStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const digits = String(value).split("");
  const remainingLength = step.n === 0 ? 0 : String(step.n).length;
  const processedCount = digits.length - remainingLength;
  const activeIndex = digits.length - processedCount - 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050c16",
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        padding: "90px 72px 110px",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(71,85,105,.35) 1px, transparent 1px), linear-gradient(90deg,rgba(71,85,105,.35) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: 999, background: "rgba(52,211,153,.13)", filter: "blur(100px)", top: 260, right: -220 }} />
      <Img
        src={staticFile("infoprep-logo.png")}
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          objectFit: "contain",
          left: 130,
          top: 545,
          opacity: backgroundLogoOpacity,
          mixBlendMode: "screen",
          filter: "saturate(.75)",
        }}
      />

      <Img
        src={staticFile("infoprep-logo.png")}
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          objectFit: "contain",
          right: 70,
          top: 60,
          opacity: cornerLogoOpacity,
          mixBlendMode: "screen",
          zIndex: 2,
        }}
      />

      <div style={{ position: "relative", opacity: entrance, transform: `translateY(${(1 - entrance) * 30}px)` }}>
        <div style={{ color: "#6ee7b7", fontWeight: 800, fontSize: 28, letterSpacing: 5 }}>{brand.toUpperCase()}</div>
        <h1 style={{ fontSize: 78, lineHeight: 1.04, letterSpacing: -4, margin: "34px 0 18px", maxWidth: 900 }}>
          {titleLine1}<br /><span style={{ color: "#6ee7b7" }}>{titleLine2}</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 31, margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ position: "relative", display: "flex", gap: 22, marginTop: 70 }}>
        <ValueCard label="NUMĂRUL n" value={step.n} color="#93c5fd" />
        <ValueCard label="SUMA" value={step.sum} color="#6ee7b7" />
      </div>

      <div style={{ position: "relative", marginTop: 54, textAlign: "center" }}>
        <div style={{ color: "#64748b", fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>CIFRELE NUMĂRULUI</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 25 }}>
          {digits.map((digit, index) => {
            const processed = index >= digits.length - processedCount;
            const active = step.digit !== null && index === activeIndex && (step.kind === "extract" || step.kind === "add");
            return (
              <div
                key={`${digit}-${index}`}
                style={{
                  width: 112,
                  height: 124,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 24,
                  border: `2px solid ${active ? "#fcd34d" : processed ? "#34d399" : "#60a5fa"}`,
                  background: active ? "rgba(252,211,77,.18)" : processed ? "rgba(52,211,153,.12)" : "rgba(59,130,246,.13)",
                  color: active ? "#fde68a" : processed ? "#6ee7b7" : "#bfdbfe",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontWeight: 800,
                  fontSize: 52,
                  opacity: processed ? 0.5 : 1,
                  transform: active ? `translateY(${-26 * stepEntrance}px) scale(${1 + 0.08 * stepEntrance})` : "none",
                  boxShadow: active ? "0 18px 60px rgba(245,158,11,.2)" : "none",
                }}
              >
                {digit}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 55, padding: "30px 34px", minHeight: 130, borderRadius: 24, border: "1px solid #334155", background: "rgba(15,23,42,.88)", textAlign: "center", opacity: stepEntrance, transform: `translateY(${(1 - stepEntrance) * 15}px)` }}>
        <div style={{ color: "#e2e8f0", fontSize: 29, lineHeight: 1.35 }}>{step.explanation}</div>
        {step.digit !== null && (step.kind === "extract" || step.kind === "add") && (
          <div style={{ color: "#fcd34d", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 800, fontSize: 35, marginTop: 14 }}>cifra = {step.digit}</div>
        )}
      </div>

      <div style={{ position: "relative", marginTop: 42, borderRadius: 26, overflow: "hidden", border: "1px solid #263449", background: "rgba(2,6,23,.9)" }}>
        <div style={{ padding: "18px 28px", color: "#64748b", fontSize: 22, borderBottom: "1px solid #1e293b", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>main.cpp</div>
        <div style={{ padding: "15px 0" }}>
          {digitSumCodeLines.map((line, index) => (
            <div key={line} style={{ minHeight: 48, display: "flex", alignItems: "center", padding: "0 28px", borderLeft: `5px solid ${index === step.line ? "#34d399" : "transparent"}`, background: index === step.line ? "rgba(52,211,153,.12)" : "transparent", color: index === step.line ? "#d1fae5" : "#94a3b8", fontSize: 25, whiteSpace: "pre", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              <span style={{ color: "#334155", width: 45, marginRight: 20, textAlign: "right" }}>{index + 1}</span>{line}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 72, right: 72, bottom: 66 }}>
        <div style={{ height: 8, borderRadius: 99, background: "#1e293b", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(100, (frame / (outroStart + outroFrames)) * 100)}%`, background: "#34d399", borderRadius: 99 }} />
        </div>
      </div>

      {outro > 0 && (
        <AbsoluteFill style={{ background: "rgba(5,12,22,.96)", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: outro, transform: `scale(${0.94 + outro * 0.06})` }}>
          <div style={{ color: "#6ee7b7", fontWeight: 800, fontSize: 28, letterSpacing: 5 }}>{brand.toUpperCase()}</div>
          <div style={{ fontSize: 45, color: "#94a3b8", marginTop: 48 }}>Rezultatul final</div>
          <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 125, fontWeight: 900, color: "#6ee7b7", marginTop: 20 }}>{digits.join(" + ")} = {steps.at(-1)?.sum}</div>
          <div style={{ fontSize: 42, fontWeight: 700, marginTop: 90 }}>{closingLine1}<br /><span style={{ color: "#6ee7b7" }}>{closingLine2}</span></div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

function ValueCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ flex: 1, padding: "28px 30px", border: `1px solid ${color}44`, borderRadius: 24, background: `${color}0d` }}>
      <div style={{ color, fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>{label}</div>
      <div style={{ color, fontSize: 64, fontWeight: 850, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", marginTop: 8 }}>{value}</div>
    </div>
  );
}
