const links = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Stack", href: "#stack" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Contact", href: "#contact" },
];

export default function NumberedNav() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="font-mono text-xs text-text-secondary transition-colors hover:text-accent-primary"
        >
          <span className="text-accent-tertiary">{l.num}</span> {l.label}
        </a>
      ))}
    </nav>
  );
}
