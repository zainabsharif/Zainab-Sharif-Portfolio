import { useRecruiterMode } from "../../context/RecruiterModeContext";

export default function RecruiterModeToggle() {
  const { recruiterMode, toggle } = useRecruiterMode();

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={recruiterMode}
      className="group flex items-center gap-2"
      title="Recruiter mode: a simplified, employer-friendly view"
    >
      <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary hidden sm:inline">
        Recruiter mode
      </span>
      <span
        className={`relative inline-block h-5 w-9 shrink-0 rounded-full border transition-colors ${
          recruiterMode ? "border-accent-primary bg-accent-primary/30" : "border-border bg-bg-surface"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-3.5 w-3.5 rounded-full transition-transform ${
            recruiterMode ? "bg-accent-primary" : "bg-text-secondary"
          }`}
          style={{ transform: recruiterMode ? "translateX(16px)" : "translateX(0px)" }}
        />
      </span>
    </button>
  );
}
