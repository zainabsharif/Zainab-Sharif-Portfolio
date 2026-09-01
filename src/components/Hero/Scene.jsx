import { Canvas } from "@react-three/fiber";
import HeroObject from "./HeroObject";

export default function Scene({ scrollState }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#3dffd0" />
      <directionalLight position={[-3, -2, 2]} intensity={0.6} color="#ff3d81" />
      <HeroObject scrollState={scrollState} />
    </Canvas>
  );
}
