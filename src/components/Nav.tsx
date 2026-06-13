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
          <span className="logo-caret" aria-hidden="true"></span>
        </a>
        <ul className="nav-links">
          {links.map(({ href, label, idx }) => (
            <li key={href}>
              <a href={href} className={active === href ? "active" : ""}>
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
