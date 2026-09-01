import { useMemo } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../../data/skills";
import { techIcons } from "../../data/techIcons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import GlitchHeading from "../GlitchHeading";

export default function TechStackGrid() {
  const reducedMotion = useReducedMotion();

  const skills = useMemo(() => {
    const seen = new Set();
    const flat = [];
    skillGroups.forEach((group) => {
      group.items.forEach((skill) => {
        if (skill.startsWith("SFML")) return;
        if (seen.has(skill)) return;
        seen.add(skill);
        flat.push(skill);
      });
    });
    return flat;
  }, []);

  const tiles = reducedMotion ? skills : [...skills, ...skills];

  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlitchHeading>Tech Stack</GlitchHeading>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="neon-text mt-3 max-w-xl text-base text-white sm:text-lg"
      >
        Tools I reach for. Hover one to see what it is.
      </motion.p>

      <div className={`mt-16 ${reducedMotion ? "" : "-mx-6 overflow-hidden px-6"}`}>
        <div
          className={
            reducedMotion
              ? "flex flex-wrap gap-5"
              : "flex w-max gap-5 animate-scroll-x hover:[animation-play-state:paused]"
          }
        >
          {tiles.map((skill, i) => {
            const entry = techIcons[skill];
            const Icon = entry?.Icon;
            const color = entry?.color ?? "#ff3d81";
            return (
              <div
                key={`${skill}-${i}`}
                style={{ "--tile-color": color }}
                className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-bg-surface px-5 py-5 transition-all hover:-translate-y-1 hover:border-[var(--tile-color)] hover:bg-bg-surface-hover hover:shadow-[0_0_28px_var(--tile-color)]"
              >
                {Icon && (
                  <Icon
                    size={40}
                    color={color}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                )}
                <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-sm text-text-primary opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:opacity-100">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
