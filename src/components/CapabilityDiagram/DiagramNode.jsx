export default function DiagramNode({ node, x, y, color, active, onEnter, onLeave, onSelect }) {
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
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.65) 0%, transparent 38%), radial-gradient(circle at 50% 50%, ${color}dd 0%, ${color}66 65%, ${color}22 100%)`,
          boxShadow: active
            ? `0 0 28px ${color}, inset 0 0 12px rgba(255,255,255,0.25)`
            : `0 4px 14px rgba(0,0,0,0.5), inset 0 0 8px rgba(255,255,255,0.12)`,
        }}
        className="h-14 w-14 rounded-full border border-white/10 transition-shadow sm:h-16 sm:w-16"
      />
      <span
        style={{ color, textShadow: `0 0 6px ${color}, 0 0 16px ${color}` }}
        className="text-xs leading-tight font-semibold"
      >
        {node.label}
      </span>
    </button>
  );
}
