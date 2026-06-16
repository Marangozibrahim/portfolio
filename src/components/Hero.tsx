import { profile } from "../data/profile";
import { ui } from "../data/ui";
import { useT } from "../i18n/useLang";
import { TerminalHero } from "./TerminalHero";

export function Hero() {
  const t = useT();
  return (
    <header className="hero container" id="top">
      <div className="hero-grid">
        <div>
          <p className="hero-kicker fade-up" style={{ "--d": "60ms" } as React.CSSProperties}>
            {t(profile.role)} — {t(profile.location)}
          </p>
          <p className="hero-status fade-up" style={{ "--d": "120ms" } as React.CSSProperties}>
            <span className="dot" aria-hidden="true"></span>{t(ui.hero.openToWork)}
          </p>
          <h1 className="hero-name fade-up" style={{ "--d": "180ms" } as React.CSSProperties}>
            Halil Ibrahim
            <br />
            <span className="accent">Marangoz</span>
          </h1>
          <p className="hero-tagline fade-up" style={{ "--d": "260ms" } as React.CSSProperties}>
            {t(profile.tagline)}
          </p>
          <div className="hero-actions fade-up" style={{ "--d": "340ms" } as React.CSSProperties}>
            <a className="btn btn-primary" href="#projects">
              {t(ui.hero.viewProjects)}
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              github ↗
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin ↗
            </a>
          </div>
        </div>

        <div className="fade-up" style={{ "--d": "300ms" } as React.CSSProperties}>
          <TerminalHero />
        </div>
      </div>
    </header>
  );
}
