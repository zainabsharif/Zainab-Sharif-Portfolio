import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-text-secondary">
          Built by <span className="text-text-primary">{site.name}</span>
        </p>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-text-secondary hover:text-accent-secondary"
        >
          github.com/zainabsharif ↗
        </a>
      </div>
    </footer>
  );
}
