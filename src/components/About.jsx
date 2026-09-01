import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { site } from "../data/site";
import { useRecruiterMode } from "../context/RecruiterModeContext";
import { useTypeLoop } from "../hooks/useTypeLoop";
import { useReducedMotion } from "../hooks/useReducedMotion";
import GlitchHeading from "./GlitchHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { recruiterMode } = useRecruiterMode();
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const fullText = recruiterMode ? site.summaryResume : site.summary;
  const typed = useTypeLoop(fullText, { start: inView && !reducedMotion });
  const displayText = reducedMotion ? fullText : typed;
  const showCursor = !reducedMotion && inView;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }}>
        <GlitchHeading>About</GlitchHeading>
      </motion.div>

      <motion.p
        ref={textRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        transition={{ delay: 0.08 }}
        className="neon-text mt-5 max-w-3xl font-mono text-lg leading-relaxed text-white sm:text-2xl"
      >
        {displayText}
        {showCursor && (
          <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[3px] animate-blink bg-white align-middle" />
        )}
      </motion.p>
    </section>
  );
}
