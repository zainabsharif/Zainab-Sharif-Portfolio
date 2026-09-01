import { useEffect, useRef } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function ShootingStars() {
  const canvasRef = useRef(null);
  const active = useActiveSection(["top", "about", "stack", "projects", "contact"]);
  const reducedMotion = useReducedMotion();
  const isHome = active === "top";

  useEffect(() => {
    if (reducedMotion || !isHome) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];
    let nextSpawn = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const w = canvas.width;
      const h = canvas.height;
      const startX = -20;
      const startY = Math.random() * h * 0.45;
      const endX = w + 20;
      const endY = startY + h * 0.5 + Math.random() * h * 0.2;
      stars.push({ startX, startY, endX, endY, t: 0, duration: 1400 + Math.random() * 700 });
    };

    spawn();
    nextSpawn = 900;

    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      nextSpawn -= dt;
      if (nextSpawn <= 0 && stars.length < 2) {
        spawn();
        nextSpawn = 1400 + Math.random() * 900;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars = stars.filter((s) => {
        s.t += dt;
        const p = Math.min(s.t / s.duration, 1);
        if (p >= 1) return false;

        const x = s.startX + (s.endX - s.startX) * p;
        const y = s.startY + (s.endY - s.startY) * p;
        const tailX = s.startX + (s.endX - s.startX) * Math.max(p - 0.12, 0);
        const tailY = s.startY + (s.endY - s.startY) * Math.max(p - 0.12, 0);
        const fade = p < 0.85 ? 1 : 1 - (p - 0.85) / 0.15;

        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${0.95 * fade})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(255,255,255,0.95)";
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, isHome]);

  if (reducedMotion || !isHome) return null;

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-20" />;
}
