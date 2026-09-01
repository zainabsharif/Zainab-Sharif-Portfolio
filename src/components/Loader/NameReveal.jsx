export default function NameReveal({ nameRef }) {
  return (
    <div
      ref={nameRef}
      style={{ clipPath: "inset(0 100% 0 0)" }}
      className="pointer-events-none relative z-10 flex flex-col items-center text-center"
    >
      <h1 className="font-display text-5xl font-semibold tracking-tight text-text-primary sm:text-7xl">
        Zainab Sharif
      </h1>
      <p className="mt-3 font-mono text-sm tracking-[0.3em] text-accent-secondary uppercase sm:text-base">
        Web Developer
      </p>
    </div>
  );
}
