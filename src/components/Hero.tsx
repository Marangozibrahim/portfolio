import { profile } from "../data/profile";
import { Typewriter } from "./Typewriter";

const roles = [
  "Backend Engineer",
  "FastAPI / .NET developer",
  "auth & API systems",
  "clean architecture enjoyer",
];

export function Hero() {
  return (
    <header className="hero container">
      <div className="hero-status fade-up" style={{ "--d": "0ms" } as React.CSSProperties}>
        <span className="dot" aria-hidden="true" />
        open to work
      </div>
      <h1 className="fade-up" style={{ "--d": "120ms" } as React.CSSProperties}>
        {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
        <span className="accent">{profile.name.split(" ").at(-1)}</span>
      </h1>
      <p className="hero-role fade-up" style={{ "--d": "240ms" } as React.CSSProperties}>
        <Typewriter phrases={roles} />
      </p>
      <p className="hero-tagline fade-up" style={{ "--d": "360ms" } as React.CSSProperties}>
        {profile.tagline}
      </p>
      <div className="hero-actions fade-up" style={{ "--d": "480ms" } as React.CSSProperties}>
        <a className="btn btn-primary" href="#projects">
          view projects
        </a>
        <a
          className="btn"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </div>
    </header>
  );
}
