import { profile } from "../data/profile";

export function Footer() {
  return (
    <>
      <div className="wordmark container" aria-hidden="true">
        MARANGOZ
      </div>
      <footer className="footer container">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.location}</span>
      </footer>
    </>
  );
}
