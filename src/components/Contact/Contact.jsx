import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import QuickLinks from "./QuickLinks";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        04 — Contact
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="max-w-xl font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        Freelance work, jobs, or just hi.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]"
      >
        <ContactForm />
        <QuickLinks />
      </motion.div>
    </section>
  );
}
