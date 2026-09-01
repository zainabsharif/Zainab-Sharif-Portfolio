export default function DiagramNode({ node, x, y, active, onEnter, onLeave, onSelect }) {
  return (
    <button
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onSelect}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full p-2 text-center transition-transform hover:scale-105 sm:w-28 ${
        active ? "scale-105" : ""
      }`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border font-mono text-[10px] transition-colors sm:h-16 sm:w-16 ${
          active
            ? "border-accent-primary bg-accent-primary/15 text-accent-primary shadow-[0_0_24px_rgba(255,61,129,0.35)]"
            : "border-border bg-bg-surface text-text-secondary"
        }`}
      >
        {node.id.slice(0, 4).toUpperCase()}
      </span>
      <span className={`text-xs leading-tight ${active ? "text-text-primary" : "text-text-secondary"}`}>
        {node.label}
      </span>
    </button>
  );
}
