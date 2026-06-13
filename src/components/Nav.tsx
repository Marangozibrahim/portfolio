import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "/about", idx: "01" },
  { href: "#projects", label: "/projects", idx: "02" },
  { href: "#experience", label: "/experience", idx: "03" },
  { href: "#skills", label: "/skills", idx: "04" },
  { href: "#contact", label: "/contact", idx: "05" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const { href } of links) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = href;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-logo" href="#top">
          ~/marangoz
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
          {links.map(({ href, label, idx }) => (
            <li key={href}>
              <a
                href={href}
                className={active === href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span className="idx">{idx}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
