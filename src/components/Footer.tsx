import type { MouseEvent } from "react";
import { profile } from "../data/profile";
import { useT } from "../i18n/useLang";
import { Reveal } from "./Reveal";

export function Footer() {
  const t = useT();
  const onMove = (e: MouseEvent<HTMLParagraphElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <>
      <div className="container">
        <Reveal>
          <p className="wordmark" aria-hidden="true" onMouseMove={onMove}>
            MARANGOZ
          </p>
        </Reveal>
      </div>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{t(profile.location)}</span>
      </footer>
    </>
  );
}
