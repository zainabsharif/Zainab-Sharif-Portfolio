import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function Skateboarder({ stateRef }) {
  const group = useRef(null);
  const wheelA = useRef(null);
  const wheelB = useRef(null);
  const { viewport } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = stateRef.current.progress;
    const xRange = viewport.width * 0.46;
    const x = -xRange + p * xRange * 2;
    group.current.position.x = x;
    group.current.position.y = Math.sin(p * Math.PI * 6) * 0.06 + 0.1;
    group.current.rotation.z = Math.sin(p * Math.PI * 4) * 0.05 - p * 0.15;
    const spin = delta * 22;
    if (wheelA.current) wheelA.current.rotation.x -= spin;
    if (wheelB.current) wheelB.current.rotation.x -= spin;
  });

  return (
    <group ref={group}>
      {/* board */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <boxGeometry args={[0.9, 0.06, 0.32]} />
        <meshStandardMaterial color="#3dffd0" />
      </mesh>
      <mesh ref={wheelA} position={[-0.3, -0.42, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      <mesh ref={wheelB} position={[0.3, -0.42, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      <mesh position={[-0.3, -0.42, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      <mesh position={[0.3, -0.42, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>

      {/* rider */}
      <mesh position={[0, 0.32, 0]} rotation={[0, 0, -0.08]} castShadow>
        <capsuleGeometry args={[0.16, 0.5, 4, 8]} />
        <meshStandardMaterial color="#ff3d81" />
      </mesh>
      <mesh position={[0.02, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      {/* arms */}
      <mesh position={[-0.22, 0.4, 0]} rotation={[0, 0, 0.9]}>
        <capsuleGeometry args={[0.05, 0.35, 4, 8]} />
        <meshStandardMaterial color="#ff3d81" />
      </mesh>
      <mesh position={[0.24, 0.32, 0]} rotation={[0, 0, -1.3]}>
        <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
        <meshStandardMaterial color="#ff3d81" />
      </mesh>
      {/* back leg kicked up */}
      <mesh position={[-0.18, -0.05, 0]} rotation={[0, 0, 0.6]}>
        <capsuleGeometry args={[0.06, 0.32, 4, 8]} />
        <meshStandardMaterial color="#7c5cff" />
      </mesh>
      <mesh position={[0.16, -0.1, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.06, 0.32, 4, 8]} />
        <meshStandardMaterial color="#7c5cff" />
      </mesh>
    </group>
  );
}
