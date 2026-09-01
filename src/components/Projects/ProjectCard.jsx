import { useState } from "react";
import { motion } from "framer-motion";

const statusStyles = {
  Live: "border-accent-secondary/50 bg-accent-secondary/10 text-accent-secondary",
  "In Progress": "border-amber-400/50 bg-amber-400/10 text-amber-300",
  Completed: "border-border bg-bg-surface-hover text-text-secondary",
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={item}
      className="flex flex-col rounded-xl border border-border bg-bg-surface p-6 transition-colors hover:border-accent-tertiary/60"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-accent-tertiary/40 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent-tertiary uppercase">
          {project.category}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">{project.title}</h3>
      {project.client && (
        <p className="mt-1 font-mono text-[11px] text-text-secondary">Client work — {project.client}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.pitch}</p>

      {expanded && (
        <ul className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm leading-relaxed text-text-secondary">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-accent-primary">·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {project.bullets?.length > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start font-mono text-[11px] text-accent-secondary hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-accent-tertiary/30 px-2.5 py-1 font-mono text-[10px] text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-4 border-t border-border pt-4 font-mono text-xs">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent-secondary hover:underline"
          >
            Live demo ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-text-primary hover:underline"
          >
            Repo ↗
          </a>
        )}
        {!project.demoUrl && !project.repoUrl && (
          <span className="text-text-secondary">Code available on request</span>
        )}
      </div>
    </motion.div>
  );
}
