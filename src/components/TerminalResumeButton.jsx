import { useState } from "react";
import { site } from "../data/site";

const LINES = ["> fetching Zainab_Sharif-Resume.pdf ...", "> done."];

export default function TerminalResumeButton({ prominent = false }) {
  const [output, setOutput] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const runSequence = () => {
    if (downloading) return;
    setDownloading(true);
    setOutput([]);
    setOutput([LINES[0]]);
    setTimeout(() => setOutput([LINES[0], LINES[1]]), 350);
    setTimeout(() => setDownloading(false), 700);
  };

  return (
    <a
      href={site.resumeUrl}
      download
      onMouseEnter={runSequence}
      onFocus={runSequence}
      onClick={runSequence}
      className={`group inline-flex flex-col items-start rounded-md border px-4 py-2.5 font-mono text-sm transition-colors ${
        prominent
          ? "border-accent-primary bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20"
          : "border-border bg-bg-surface text-text-primary hover:border-accent-secondary hover:text-accent-secondary"
      }`}
    >
      <span className="flex items-center gap-1">
        $ ./download_resume.sh
        <span className="animate-blink">▍</span>
      </span>
      {output.length > 0 && (
        <span className="mt-1 flex flex-col text-[11px] text-text-secondary">
          {output.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      )}
    </a>
  );
}
