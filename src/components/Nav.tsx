import { useState } from "react";

const links = [
  { href: "#about", label: "/about" },
  { href: "#projects", label: "/projects" },
  { href: "#experience", label: "/experience" },
  { href: "#skills", label: "/skills" },
  { href: "#contact", label: "/contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          ~/marangoz<span className="logo-caret" aria-hidden="true" />
        </a>
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
        </button>
        <ul id="nav-menu" className={`nav-links${open ? " open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
