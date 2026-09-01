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

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {links.map((l) => {
        const isActive = l.id === active;
        return (
          <a
            key={l.href}
            href={l.href}
            className={`neon-text rounded-full px-3.5 py-1.5 font-mono text-xs transition-all hover:scale-110 hover:bg-accent-tertiary/15 hover:text-accent-tertiary hover:shadow-[0_0_16px_rgba(124,92,255,0.5)] ${
              isActive ? "bg-accent-primary/15 text-accent-primary" : "text-text-primary"
            }`}
          >
            {l.label}
          </a>
        );
      })}

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
