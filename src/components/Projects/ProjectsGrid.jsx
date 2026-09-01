import { useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import { useRecruiterMode } from "../../context/RecruiterModeContext";
import ProjectCard from "./ProjectCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function ProjectsGrid() {
  const { recruiterMode } = useRecruiterMode();

  const ordered = useMemo(() => {
    if (!recruiterMode) return projects;
    return [...projects].sort((a, b) => Number(b.employable) - Number(a.employable));
  }, [recruiterMode]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        03 — Selected Projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="max-w-xl font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        Nine builds, one at a time.
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ordered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
