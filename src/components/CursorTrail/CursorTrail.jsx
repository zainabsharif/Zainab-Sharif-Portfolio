import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const COLORS = ["#ff3d81", "#3dffd0", "#7c5cff"];

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let colorIndex = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      colorIndex = (colorIndex + 1) % COLORS.length;
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        color: COLORS[colorIndex],
        r: 4 + Math.random() * 4,
      });
      if (particles.current.length > 50) particles.current.shift();
    };
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.life -= 0.04;
      });
      particles.current = particles.current.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden sm:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
