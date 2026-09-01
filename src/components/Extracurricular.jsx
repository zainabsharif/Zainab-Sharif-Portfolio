import { motion } from "framer-motion";
import { extracurricular } from "../data/extracurricular";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Extracurricular() {
  return (
    <section id="extracurricular" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        Leadership
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="max-w-xl font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        Design beyond my own projects.
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {extracurricular.map((role) => (
          <motion.div
            key={role.org}
            variants={item}
            className="rounded-xl border border-border bg-bg-surface p-6"
          >
            <p className="font-display text-lg text-text-primary">{role.role}</p>
            <p className="mt-1 font-mono text-xs text-accent-secondary">{role.org}</p>
            <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-text-secondary">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-accent-primary">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
