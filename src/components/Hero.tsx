import { profile } from "../data/profile";
import { TerminalHero } from "./TerminalHero";

export function Hero() {
  return (
    <header className="hero container">
      <h1 className="visually-hidden">
        {profile.name} — {profile.role}
      </h1>
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
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint-chevron">▾</span>
        scroll
      </div>
    </header>
  );
}
