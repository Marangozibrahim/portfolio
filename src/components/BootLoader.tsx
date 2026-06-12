import { useEffect, useState } from "react";

const LOAD_MS = 1100;
const REVEAL_MS = 700;

/** Fullscreen boot screen: progress bar counts up, then panels split open. */
export function BootLoader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "done"
      : "loading",
  );

  useEffect(() => {
    if (phase !== "loading") return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, Math.round(((t - start) / LOAD_MS) * 100));
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("reveal");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => setPhase("done"), REVEAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // lock scroll while booting
  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`boot${phase === "reveal" ? " boot-reveal" : ""}`}
      aria-hidden="true"
    >
      <div className="boot-panel boot-panel-top" />
      <div className="boot-panel boot-panel-bottom" />
      <div className="boot-content">
        <span className="boot-logo">~/marangoz</span>
        <div className="boot-line">
          <div className="boot-bar" style={{ width: `${pct}%` }} />
        </div>
        <span className="boot-pct">{pct}%</span>
      </div>
    </div>
  );
}
