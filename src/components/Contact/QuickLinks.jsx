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
    <ul className="flex flex-col gap-3">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            download={l.download || undefined}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex flex-col rounded-lg border border-transparent px-3 py-2.5 transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent-primary/50 hover:bg-bg-surface hover:shadow-[0_0_24px_rgba(255,61,129,0.35)]"
          >
            <span className="font-mono text-[11px] tracking-widest text-text-secondary uppercase transition-colors group-hover:text-accent-primary">
              {l.label}
            </span>
            <span className="mt-1 text-lg text-text-primary transition-colors group-hover:text-accent-primary">
              {l.value}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
