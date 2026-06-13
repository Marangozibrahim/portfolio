import { useEffect, useState } from "react";

/**
 * Fixed viewport HUD: corner marks, scroll progress rail,
 * and a location/scroll readout. Hidden below 860px via CSS.
 */
export function HudFrame() {
  const [pct, setPct] = useState(0);
  const [section, setSection] = useState("~/");

  useEffect(() => {
    const ids = ["#about", "#projects", "#experience", "#skills", "#contact"];
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);

      let current = "~/";
      for (const id of ids) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
      setSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <span className="hud-corner hud-tl" aria-hidden="true">+</span>
      <span className="hud-corner hud-tr" aria-hidden="true">+</span>
      <span className="hud-corner hud-bl" aria-hidden="true">+</span>
      <div className="hud-rail" aria-hidden="true">
        <div className="hud-rail-fill" style={{ height: `${pct}%` }}></div>
      </div>
      <div className="hud-readout" aria-hidden="true">
        <span>
          loc <span className="val">{section}</span>
        </span>
        <span>
          scroll <span className="val">{pct}%</span>
        </span>
      </div>
    </>
  );
}
