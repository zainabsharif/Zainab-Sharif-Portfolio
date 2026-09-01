export default function StatusPill() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-secondary" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
      </span>
      <span className="font-mono text-xs text-text-secondary">Available for work</span>
    </div>
  );
}
