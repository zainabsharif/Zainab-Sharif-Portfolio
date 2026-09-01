import { useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import { useRecruiterMode } from "../../context/RecruiterModeContext";
import ProjectCard from "./ProjectCard";
import GlitchHeading from "../GlitchHeading";

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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlitchHeading>Projects</GlitchHeading>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="mt-3 max-w-xl font-display text-2xl font-semibold text-accent-secondary sm:text-3xl"
        style={{
          textShadow:
            "0 0 8px rgba(61,255,208,0.8), 0 0 20px rgba(61,255,208,0.55), 0 0 44px rgba(61,255,208,0.35)",
        }}
      >
        Six builds, one at a time.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ordered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
