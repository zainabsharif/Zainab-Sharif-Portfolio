import { useEffect, useRef, useState } from "react";
import { TbVolume2, TbVolumeOff } from "react-icons/tb";
import { useAmbientPad } from "../../hooks/useAmbientPad";

const DURATION = 154; // seconds, visual loop length for the progress bar

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function NowPlayingWidget() {
  const [collapsed, setCollapsed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const { playing, muted, toggle, toggleMute } = useAmbientPad();

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setElapsed((t) => (t + 1 >= DURATION ? 0 : t + 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-surface text-accent-secondary shadow-lg"
        aria-label="Show now-playing widget"
      >
        ♫
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex w-72 items-center gap-2.5 rounded-xl border border-border bg-bg-surface/90 p-3 shadow-lg backdrop-blur">
      <div
        className={`h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-accent-primary via-accent-tertiary to-accent-secondary ${
          playing ? "animate-spin" : ""
        }`}
        style={{ animationDuration: "4s" }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-text-primary">Portfolio Ambience</p>
        <p className="truncate font-mono text-[10px] text-text-secondary">Zainab Sharif</p>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bg-primary">
          <div
            className="h-full bg-accent-secondary transition-[width]"
            style={{ width: `${(elapsed / DURATION) * 100}%` }}
          />
        </div>
        <p className="mt-1 font-mono text-[9px] text-text-secondary">
          {formatTime(elapsed)} / {formatTime(DURATION)}
        </p>
      </div>
      <button
        onClick={toggleMute}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
          muted ? "border-accent-primary text-accent-primary" : "border-border text-text-primary hover:border-accent-secondary"
        }`}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <TbVolumeOff size={14} /> : <TbVolume2 size={14} />}
      </button>
      <button
        onClick={toggle}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-text-primary hover:border-accent-secondary"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <button
        onClick={() => setCollapsed(true)}
        className="ml-1 shrink-0 text-text-secondary hover:text-text-primary"
        aria-label="Collapse now-playing widget"
      >
        ×
      </button>
    </div>
  );
}
