import { profile } from "../data/profile";
import { TerminalHero } from "./TerminalHero";

export function Hero() {
  return (
    <header className="hero container" id="top">
      <div className="hero-grid">
        <div>
          <p className="hero-kicker fade-up" style={{ "--d": "60ms" } as React.CSSProperties}>
            {profile.role} — {profile.location}
          </p>
          <p className="hero-status fade-up" style={{ "--d": "120ms" } as React.CSSProperties}>
            <span className="dot" aria-hidden="true"></span>open to work
          </p>
          <h1 className="hero-name fade-up" style={{ "--d": "180ms" } as React.CSSProperties}>
            Halil Ibrahim
            <br />
            <span className="accent">Marangoz</span>
          </h1>
          <p className="hero-tagline fade-up" style={{ "--d": "260ms" } as React.CSSProperties}>
            I build the parts of the backend that can't fail —{" "}
            <span className="hl">secure auth flows</span>,{" "}
            <span className="hl">clean architecture</span>, and{" "}
            <span className="hl">APIs that hold up under load</span>.
          </p>
          <div className="hero-actions fade-up" style={{ "--d": "340ms" } as React.CSSProperties}>
            <a className="btn btn-primary" href="#projects">
              view projects
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              github ↗
            </a>
          </div>
        </div>

        <div className="fade-up" style={{ "--d": "300ms" } as React.CSSProperties}>
          <TerminalHero />
        </div>
      </div>

      <p className="scroll-hint">
        <span className="chevron" aria-hidden="true">▾</span>scroll
      </p>
    </header>
  );
}
