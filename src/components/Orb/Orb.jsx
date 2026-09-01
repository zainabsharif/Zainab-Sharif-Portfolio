import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OrbMesh from "./OrbMesh";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["top", "about", "stack", "projects", "contact"];

export default function Orb() {
  const scrollState = useRef({ scale: 0, x: 0, y: 0, opacity: 0 });
  const activeSection = useActiveSection(SECTION_IDS);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollState.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1.15,
          opacity: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "60% top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#ffffff" />
        <OrbMesh scrollState={scrollState} activeSection={activeSection} />
      </Canvas>
    </div>
  );
}
