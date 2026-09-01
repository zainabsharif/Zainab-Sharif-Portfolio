import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import StackedName from "./StackedName";
import TerminalResumeButton from "../TerminalResumeButton";
import { useRecruiterMode } from "../../context/RecruiterModeContext";
import { site } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { recruiterMode } = useRecruiterMode();
  const sectionRef = useRef(null);
  const scrollState = useRef({ scale: 1, x: 0, y: 0, opacity: 1 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollState.current, {
        scale: 0.45,
        x: 1.4,
        y: -0.7,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary"
    >
      <div className="absolute inset-0">
        <Scene scrollState={scrollState} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent-secondary uppercase">
          {site.location}
        </p>
        <StackedName recruiterMode={recruiterMode} />

        {recruiterMode ? (
          <p className="mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            Software Engineering student, FAST-NUCES — building full-stack and systems
            projects in Python, C++, and Flask.
          </p>
        ) : (
          <p className="mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            {site.tagline}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <TerminalResumeButton prominent={recruiterMode} />
          <a
            href="#projects"
            className="font-mono text-sm text-text-secondary transition-colors hover:text-accent-primary"
          >
            View projects ↓
          </a>
        </div>
      </div>
    </section>
  );
}
