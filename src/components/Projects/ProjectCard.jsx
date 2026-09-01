import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const [showDetail, setShowDetail] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hasMedia = Boolean(project.previewImage || project.previewVideo);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 250, damping: 22 });
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(124,92,255,0.35), rgba(255,61,129,0.12) 45%, transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseEnter = () => {
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const showingDetail = !hasMedia || showDetail;

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={hasMedia ? () => setShowDetail((v) => !v) : undefined}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-surface transition-colors hover:border-accent-tertiary/60 hover:shadow-[0_20px_60px_-20px_rgba(124,92,255,0.45)] ${
        hasMedia ? "cursor-pointer" : ""
      }`}
    >
      <motion.div
        aria-hidden
        style={{ background: glowBackground }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {hasMedia && !showDetail && (
        <div className="relative flex flex-1 flex-col">
          <div className="relative h-44 overflow-hidden transition-[height] duration-500 ease-out group-hover:h-64">
            {project.previewVideo ? (
              <video
                ref={videoRef}
                src={`${project.previewVideo}#t=0.1`}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <img
                src={project.previewImage}
                alt={`${project.title} live preview`}
                className="h-full w-full object-cover object-top"
              />
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="rounded-full border border-accent-tertiary/40 bg-bg-primary/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent-tertiary uppercase backdrop-blur">
                {project.category}
              </span>
              <span
                className={`rounded-full border bg-bg-primary/70 px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase backdrop-blur ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-surface to-transparent" />
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-4">
            <h3 className="font-display text-lg font-semibold text-text-primary">{project.title}</h3>
            <p className="mt-1 font-mono text-[10px] text-accent-secondary">Click for details →</p>
          </div>
        </div>
      )}

      {showingDetail && (
        <div className="relative z-10 flex flex-1 flex-col p-6">
          {hasMedia && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetail(false);
              }}
              className="mb-4 self-start font-mono text-[11px] text-accent-secondary hover:underline"
            >
              ← Back to preview
            </button>
          )}

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
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
                className="text-text-secondary hover:text-text-primary hover:underline"
              >
                Repo ↗
              </a>
            )}
            {!project.demoUrl && !project.repoUrl && (
              <span className="text-text-secondary">Code available on request</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
