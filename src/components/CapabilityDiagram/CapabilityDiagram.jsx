import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { capabilityNodes } from "../../data/capabilityNodes";
import DiagramNode from "./DiagramNode";

const RADIUS = 38;

export default function CapabilityDiagram() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const activeId = hoveredId ?? selectedId;

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
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-accent-tertiary uppercase"
      >
        What I bring
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        className="max-w-xl font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        Six areas, one engineer.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
        className="relative mx-auto mt-16 aspect-square w-full max-w-[560px]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[46%] w-[46%] flex-col items-center justify-center rounded-full border border-border bg-bg-surface/70 p-6 text-center backdrop-blur">
            {active ? (
              <>
                <p className="font-mono text-[10px] tracking-widest text-accent-secondary uppercase">
                  {active.label}
                </p>
                <p className="mt-2 text-sm leading-snug text-text-primary">{active.statement}</p>
              </>
            ) : (
              <p className="text-xs text-text-secondary">
                Hover or tap a node to see what it means.
              </p>
            )}
          </div>
        </div>

        {positioned.map(({ node, x, y }) => (
          <DiagramNode
            key={node.id}
            node={node}
            x={x}
            y={y}
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
