import { motion } from "framer-motion";
import { site } from "../data/site";
import { useRecruiterMode } from "../context/RecruiterModeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { recruiterMode } = useRecruiterMode();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        01 — About
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.08 }}
        className="max-w-3xl text-2xl leading-relaxed text-text-primary sm:text-3xl"
      >
        {recruiterMode ? site.summaryResume : site.summary}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.16 }}
        className="mt-12 grid gap-6 sm:grid-cols-2"
      >
        {site.education.map((ed) => (
          <div key={ed.degree} className="rounded-lg border border-border bg-bg-surface p-5">
            <p className="font-display text-lg text-text-primary">{ed.degree}</p>
            <p className="mt-1 font-mono text-xs text-accent-secondary">{ed.school}</p>
            {ed.detail && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{ed.detail}</p>}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
