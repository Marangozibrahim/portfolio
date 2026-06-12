import { useEffect, useState } from "react";

/**
 * Fixed viewport HUD: corner marks, scroll progress rail,
 * and a debug readout (cursor / scroll / session time).
 * Hidden on mobile via CSS.
 */
export function HudFrame() {
  const [scrollPct, setScrollPct] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const timer = setInterval(
      () => setTime(Math.round(performance.now() / 100) / 10),
      100,
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="hud" aria-hidden="true">
      <span className="hud-corner hud-tl">+</span>
      <span className="hud-corner hud-tr">+</span>
      <span className="hud-corner hud-bl">+</span>
      <span className="hud-corner hud-br">+</span>
      <div className="hud-rail">
        <div className="hud-rail-fill" style={{ height: `${scrollPct}%` }} />
      </div>
      <div className="hud-debug">
        <div className="hud-debug-col">
          <div>x: {cursor.x}</div>
          <div>y: {cursor.y}</div>
        </div>
        <div className="hud-debug-col">
          <div>scroll: {scrollPct}%</div>
          <div>t: {time.toFixed(1)}s</div>
        </div>
      </div>
    </div>
  );
}
