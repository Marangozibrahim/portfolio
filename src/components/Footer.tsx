import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer container">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>{profile.location}</span>
    </footer>
  );
}
