import { motion } from "framer-motion";
import { skillGroups } from "../../data/skills";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TechStackGrid() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        02 — Tech Stack
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="max-w-xl font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        Tools I reach for.
      </motion.h2>

      <div className="mt-14 space-y-14">
        {skillGroups.map((group) => (
          <div key={group.id} id={group.id} className="scroll-mt-28">
            <h3 className="mb-5 font-mono text-sm text-accent-secondary">{group.title}</h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
            >
              {group.items.map((skill) => (
                <motion.div
                  key={skill}
                  variants={item}
                  className="rounded-lg border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary transition-colors hover:border-accent-primary hover:bg-bg-surface-hover hover:shadow-[0_0_20px_rgba(255,61,129,0.15)]"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
