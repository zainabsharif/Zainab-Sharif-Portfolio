import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    float edge = 0.08;
    float wobble = sin(vUv.y * 18.0 + uProgress * 6.0) * 0.015;
    float paint = 1.0 - smoothstep(uProgress - edge + wobble, uProgress + wobble, vUv.x);
    vec3 grad = mix(uColorA, uColorB, vUv.y);
    gl_FragColor = vec4(grad, paint);
  }
`;

const PaintTrailMaterial = shaderMaterial(
  {
    uProgress: 0,
    uColorA: new THREE.Color("#ff3d81"),
    uColorB: new THREE.Color("#7c5cff"),
  },
  vertexShader,
  fragmentShader
);

extend({ PaintTrailMaterial });

export default PaintTrailMaterial;
