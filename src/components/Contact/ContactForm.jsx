import { useState } from "react";
import { site } from "../../data/site";

const SUBJECTS = ["Freelance project", "Job opportunity", "Collaboration", "Just saying hi"];
const MAX_LEN = 600;
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.company) {
      // Honeypot tripped — pretend to succeed, drop silently.
      setStatus("sent");
      return;
    }

    if (!form.name || !form.email || !form.message) return;

    if (FORM_ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `[Portfolio] ${form.subject}`
    )}&body=${body}`;
    setStatus("sent");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-mono text-xs text-text-secondary">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            className="rounded-md border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-mono text-xs text-text-secondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className="rounded-md border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="font-mono text-xs text-text-secondary">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={update("subject")}
          className="rounded-md border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="font-mono text-xs text-text-secondary">
            Message
          </label>
          <span className="font-mono text-[11px] text-text-secondary">
            {form.message.length}/{MAX_LEN}
          </span>
        </div>
        <textarea
          id="message"
          required
          rows={5}
          maxLength={MAX_LEN}
          value={form.message}
          onChange={update("message")}
          className="resize-none rounded-md border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary"
        />
      </div>

      {/* Honeypot — hidden from sighted users and screen readers, not from bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 self-start rounded-md border border-accent-primary bg-accent-primary/10 px-5 py-2.5 font-mono text-sm text-accent-primary transition-colors hover:bg-accent-primary/20 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className="font-mono text-xs text-accent-secondary">
          {FORM_ENDPOINT ? "Message sent — thanks!" : "Opening your email client…"}
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-xs text-accent-primary">
          Something went wrong — email {site.email} directly instead.
        </p>
      )}
    </form>
  );
}
