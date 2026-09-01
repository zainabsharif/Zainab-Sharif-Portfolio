import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import QuickLinks from "./QuickLinks";
import GlitchHeading from "../GlitchHeading";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlitchHeading>Contact</GlitchHeading>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="mt-3 max-w-xl text-base text-text-secondary sm:text-lg"
      >
        Freelance work, jobs, or just hi.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]"
      >
        <ContactForm />
        <QuickLinks />
      </motion.div>
    </section>
  );
}
