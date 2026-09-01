export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift-a mix-blend-screen absolute -top-1/4 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-accent-tertiary/30 blur-[120px]" />
      <div className="animate-drift-b mix-blend-screen absolute top-1/3 -right-1/4 h-[55vw] w-[55vw] rounded-full bg-accent-primary/25 blur-[120px]" />
      <div className="animate-drift-c mix-blend-screen absolute bottom-[-20%] left-1/4 h-[50vw] w-[50vw] rounded-full bg-accent-secondary/25 blur-[120px]" />
    </div>
  );
}
