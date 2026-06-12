const links = [
  { href: "#projects", label: "/projects" },
  { href: "#experience", label: "/experience" },
  { href: "#skills", label: "/skills" },
  { href: "#contact", label: "/contact" },
];

export function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          ~/marangoz<span className="logo-caret" aria-hidden="true" />
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
