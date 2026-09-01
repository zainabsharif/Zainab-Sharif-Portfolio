import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { capabilityNodes } from "../../data/capabilityNodes";
import DiagramNode from "./DiagramNode";
import ConnectorLines from "./ConnectorLines";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import GlitchHeading from "../GlitchHeading";

const RADIUS = 38;
const PALETTE = ["#ff3d81", "#3dffd0", "#7c5cff", "#fbbf24", "#38bdf8"];

export default function CapabilityDiagram() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const activeId = hoveredId ?? selectedId;
  const reducedMotion = useReducedMotion();

  const positioned = useMemo(() => {
    const n = capabilityNodes.length;
    return capabilityNodes.map((node, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return {
        node,
        x: 50 + RADIUS * Math.cos(angle),
        y: 50 + RADIUS * Math.sin(angle) * 0.92,
      };
    });
  }, []);

  const active = capabilityNodes.find((n) => n.id === activeId);

  const select = (node) => {
    setSelectedId(node.id);
    const target = document.querySelector(node.target);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="capability" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        What I bring
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        <GlitchHeading>Five areas, one engineer.</GlitchHeading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
        className="relative mx-auto mt-16 aspect-square w-full max-w-[560px]"
      >
        <ConnectorLines positioned={positioned} activeId={activeId} reducedMotion={reducedMotion} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-[46%] w-[46%] items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fde68a,#f59e0b,#fb923c,#f59e0b,#fde68a)] blur-md ${
                reducedMotion ? "" : "animate-spin-slow"
              }`}
            />
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_38%_32%,#fffbe8,#fde68a_35%,#f59e0b_70%,#b45309_100%)] shadow-[0_0_70px_22px_rgba(251,191,36,0.4)]" />

            <div className="relative z-10 flex h-[84%] w-[84%] flex-col items-center justify-center rounded-full border border-amber-200/30 bg-bg-surface/85 p-6 text-center backdrop-blur">
              {active ? (
                <>
                  <p className="font-mono text-[10px] tracking-widest text-accent-secondary uppercase">
                    {active.label}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-text-primary">{active.statement}</p>
                </>
              ) : (
                <p className="text-xs text-text-secondary">
                  Hover or tap a planet to see what it means.
                </p>
              )}
            </div>
          </div>
        </div>

        {positioned.map(({ node, x, y }, i) => (
          <DiagramNode
            key={node.id}
            node={node}
            x={x}
            y={y}
            color={PALETTE[i % PALETTE.length]}
            active={node.id === activeId}
            onEnter={() => setHoveredId(node.id)}
            onLeave={() => setHoveredId(null)}
            onSelect={() => select(node)}
          />
        ))}
      </motion.div>
    </section>
  );
}
