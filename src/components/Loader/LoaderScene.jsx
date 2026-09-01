import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Skateboarder from "./Skateboarder";
import "./PaintTrailMaterial";

function PaintPlane({ stateRef }) {
  const ref = useRef(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.scale.set(viewport.width, viewport.height, 1);
    ref.current.material.uProgress = stateRef.current.progress;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <paintTrailMaterial transparent depthWrite={false} />
    </mesh>
  );
}

export default function LoaderScene({ stateRef }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <PaintPlane stateRef={stateRef} />
      <Skateboarder stateRef={stateRef} />
    </Canvas>
  );
}
