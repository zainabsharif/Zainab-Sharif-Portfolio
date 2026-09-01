import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroObject({ scrollState }) {
  const mesh = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const s = scrollState.current;

    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      pointer.current.y * 0.3,
      0.04
    );
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z,
      -pointer.current.x * 0.2,
      0.04
    );

    const scale = s.scale * (1 + Math.sin(performance.now() * 0.0006) * 0.02);
    mesh.current.scale.setScalar(scale);
    mesh.current.position.x = s.x;
    mesh.current.position.y = s.y;
    mesh.current.material.opacity = s.opacity;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#7c5cff"
        emissive="#ff3d81"
        emissiveIntensity={0.15}
        roughness={0.25}
        metalness={0.6}
        flatShading
        transparent
      />
    </mesh>
  );
}
