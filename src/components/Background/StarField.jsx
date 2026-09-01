import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate(-0.35);
      const band = ctx.createLinearGradient(-w, 0, w, 0);
      band.addColorStop(0, "rgba(124,92,255,0)");
      band.addColorStop(0.5, "rgba(124,92,255,0.12)");
      band.addColorStop(0.55, "rgba(61,255,208,0.09)");
      band.addColorStop(1, "rgba(61,255,208,0)");
      ctx.fillStyle = band;
      ctx.fillRect(-w, -h * 0.2, w * 2, h * 0.4);
      ctx.restore();

      const count = Math.floor((w * h) / 5500);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.3 + 0.2;
        const alpha = Math.random() * 0.7 + 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const glowCount = Math.floor(count / 25);
      for (let i = 0; i < glowCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.6 + 1.2;
        ctx.beginPath();
        ctx.fillStyle = "rgba(200,220,255,0.9)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(200,220,255,0.9)";
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-20" />;
}
