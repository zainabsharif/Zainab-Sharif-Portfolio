import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const SECTION_THEME = {
  top: { color: "#7c5cff", distort: 0.3, speed: 1.4 },
  about: { color: "#7c5cff", distort: 0.3, speed: 1.4 },
  stack: { color: "#3dffd0", distort: 0.5, speed: 2.2 },
  projects: { color: "#ff3d81", distort: 0.75, speed: 3 },
  contact: { color: "#f5c542", distort: 0.45, speed: 1.8 },
};

export default function OrbMesh({ scrollState, activeSection }) {
  const mesh = useRef(null);
  const material = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current || !material.current) return;
    const s = scrollState.current;
    const theme = SECTION_THEME[activeSection] ?? SECTION_THEME.top;

    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.current.y * 0.25, 0.04);
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, -pointer.current.x * 0.2, 0.04);

    const scale = s.scale * (1 + Math.sin(performance.now() * 0.0006) * 0.02);
    mesh.current.scale.setScalar(scale);
    mesh.current.position.x = s.x;
    mesh.current.position.y = s.y;
    material.current.opacity = s.opacity;

    target.set(theme.color);
    material.current.color.lerp(target, delta * 2.2);
    material.current.emissive.lerp(target, delta * 2.2);
    material.current.distort = THREE.MathUtils.lerp(material.current.distort, theme.distort, delta * 2.2);
    material.current.speed = THREE.MathUtils.lerp(material.current.speed, theme.speed, delta * 2.2);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.7, 2]} />
      <MeshDistortMaterial
        ref={material}
        color="#7c5cff"
        emissive="#7c5cff"
        emissiveIntensity={1.1}
        roughness={0.1}
        metalness={0.3}
        iridescence={1}
        iridescenceIOR={1.3}
        clearcoat={0.6}
        clearcoatRoughness={0.2}
        flatShading
        transparent
        distort={0.3}
        speed={1.4}
      />
    </mesh>
  );
}
