import { useEffect, useState } from "react";
import NumberedNav from "./NumberedNav";
import StatusPill from "./StatusPill";
import RecruiterModeToggle from "./RecruiterModeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-bg-surface/85 backdrop-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="neon-text font-mono text-base font-bold text-accent-primary">
          Zainab Sharif
        </a>
        <NumberedNav />
        <div className="flex items-center gap-4">
          <RecruiterModeToggle />
          <StatusPill />
        </div>
      </div>
    </header>
  );
}
