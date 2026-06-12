import { profile } from "../data/profile";
import { useScrollExit } from "../hooks/useScrollExit";
import { TerminalHero } from "./TerminalHero";

export function Hero() {
  const exitRef = useScrollExit<HTMLDivElement>();

  return (
    <header className="hero container">
      <h1 className="visually-hidden">
        {profile.name} — {profile.role}
      </h1>
      <div ref={exitRef} className="hero-exit">
        <div
          className="plus-corners fade-up"
          style={{ "--d": "0ms" } as React.CSSProperties}
        >
          <TerminalHero />
        </div>
        <div
          className="hero-actions fade-up"
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          <a className="btn btn-primary" href="#projects">
            view projects
          </a>
          <a
            className="btn"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            github ↗
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint-chevron">▾</span>
        scroll
      </div>
    </header>
  );
}
