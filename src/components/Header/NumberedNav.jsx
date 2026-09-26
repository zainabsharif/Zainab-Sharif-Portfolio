import { useEffect, useRef, useState } from "react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { useActiveSection } from "../../hooks/useActiveSection";
import { site } from "../../data/site";

const links = [
  { id: "top", label: "Home", href: "#top" },
  { id: "about", label: "About", href: "#about" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const SECTION_IDS = links.map((l) => l.id);

export default function NumberedNav() {
  const active = useActiveSection(SECTION_IDS);
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  useEffect(() => {
    const index = links.findIndex((link) => link.id === active);
    const activeItem = itemRefs.current[index];
    const nav = navRef.current;

    if (!activeItem || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const x = itemRect.left - navRect.left;

    setIndicator({ x, width: itemRect.width });
  }, [active]);

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <div ref={navRef} className="relative flex items-center rounded-full border border-border/80 bg-bg-surface/60 px-1 py-1 backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-0 z-0 rounded-full bg-accent-primary/15 shadow-[0_0_18px_rgba(124,92,255,0.3)] transition-all duration-500 ease-out"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.x}px)`,
          }}
        />

        {links.map((l, index) => {
          const isActive = l.id === active;
          return (
            <a
              key={l.href}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              href={l.href}
              className={`relative z-10 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-300 ${
                isActive
                  ? "text-accent-primary"
                  : "text-text-primary hover:scale-110 hover:text-accent-tertiary hover:shadow-[0_0_16px_rgba(124,92,255,0.5)]"
              }`}
            >
              {l.label}
            </a>
          );
        })}
      </div>

      <span className="mx-2 h-4 w-px bg-border" />

      <a
        href={site.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded-full p-2 text-text-primary transition-colors hover:text-accent-secondary hover:[filter:drop-shadow(0_0_8px_var(--color-accent-secondary))]"
      >
        <TbBrandGithub size={18} />
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded-full p-2 text-text-primary transition-colors hover:text-accent-secondary hover:[filter:drop-shadow(0_0_8px_var(--color-accent-secondary))]"
      >
        <TbBrandLinkedin size={18} />
      </a>
    </nav>
  );
}
