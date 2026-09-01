import { site } from "../../data/site";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
  { label: "LinkedIn", value: "linkedin.com/in/zainabsharif25", href: site.linkedin },
  { label: "GitHub", value: "github.com/zainabsharif", href: site.github },
  { label: "Resume", value: "Download PDF", href: site.resumeUrl, download: true },
];

export default function QuickLinks() {
  return (
    <ul className="flex flex-col gap-4">
      {links.map((l) => (
        <li key={l.label} className="flex flex-col border-b border-border pb-4">
          <span className="font-mono text-[11px] tracking-widest text-text-secondary uppercase">
            {l.label}
          </span>
          <a
            href={l.href}
            download={l.download || undefined}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="mt-1 text-lg text-text-primary transition-colors hover:text-accent-primary"
          >
            {l.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
