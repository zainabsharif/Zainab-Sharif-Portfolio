export default function StackedName({ recruiterMode }) {
  if (recruiterMode) {
    return (
      <h1 className="font-display text-5xl font-semibold tracking-tight text-text-primary sm:text-7xl">
        Zainab Sharif
      </h1>
    );
  }

  return (
    <div className="relative inline-block select-none">
      <h1 className="font-display text-5xl font-semibold tracking-tight text-transparent sm:text-7xl">
        Zainab Sharif
      </h1>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-display text-5xl font-semibold tracking-tight text-accent-primary mix-blend-screen sm:text-7xl"
        style={{ transform: "translate(2px, 0)" }}
      >
        Zainab Sharif
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-display text-5xl font-semibold tracking-tight text-accent-secondary mix-blend-screen sm:text-7xl"
        style={{ transform: "translate(-2px, 0)" }}
      >
        Zainab Sharif
      </span>
      <span className="absolute inset-0 font-display text-5xl font-semibold tracking-tight text-text-primary mix-blend-overlay sm:text-7xl">
        Zainab Sharif
      </span>
    </div>
  );
}
