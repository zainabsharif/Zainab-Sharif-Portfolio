export default function GlitchHeading({ children, as: Tag = "h2", size = "text-4xl sm:text-5xl", className = "" }) {
  const layerClass = `font-display font-semibold tracking-tight ${size}`;

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <Tag className={`${layerClass} text-transparent`}>{children}</Tag>
      <Tag
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${layerClass} text-accent-primary mix-blend-screen`}
        style={{ transform: "translate(2px, 0)" }}
      >
        {children}
      </Tag>
      <Tag
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${layerClass} text-accent-secondary mix-blend-screen`}
        style={{ transform: "translate(-2px, 0)" }}
      >
        {children}
      </Tag>
      <Tag className={`absolute inset-0 ${layerClass} text-text-primary mix-blend-overlay`}>{children}</Tag>
    </div>
  );
}
