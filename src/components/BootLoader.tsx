import { useEffect, useState } from "react";

const BOOT_KEY = "marangoz-boot-shown";
const TICK_MS = 90;
const REVEAL_DELAY_MS = 150;
const DONE_MS = 850;

/** Fullscreen boot screen: progress bar, then split-panel reveal. Once per session. */
export function BootLoader() {
  const [skip] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem(BOOT_KEY) !== null
    );
  });
  const [pct, setPct] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) return;
    sessionStorage.setItem(BOOT_KEY, "1");
    const tick = setInterval(() => {
      setPct((p) => Math.min(100, p + Math.ceil(Math.random() * 22)));
    }, TICK_MS);
    return () => clearInterval(tick);
  }, [skip]);

  useEffect(() => {
    if (skip || pct < 100) return;
    const t1 = setTimeout(() => setReveal(true), REVEAL_DELAY_MS);
    const t2 = setTimeout(() => setDone(true), DONE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [skip, pct]);

  if (done) return null;

  return (
    <div className={`boot${reveal ? " reveal" : ""}`} aria-hidden="true">
      <div className="boot-panel boot-panel-top"></div>
      <div className="boot-panel boot-panel-bottom"></div>
      <div className="boot-content">
        <span className="boot-logo">~/marangoz</span>
        <span className="boot-line">
          <span className="boot-bar" style={{ width: `${pct}%` }}></span>
        </span>
        <span className="boot-pct">{String(pct).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
