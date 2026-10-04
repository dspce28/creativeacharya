"use client";

import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Animated dark silk folds — live replacement for the template's static
// "counter-bg" render behind the counters and team.
const frag = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float fold(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.x * 2.2 + p.y * 1.3 + t * 0.6) * 0.55;
    h += sin(p.x * 4.1 - p.y * 2.7 - t * 0.45) * 0.25;
    h += sin(p.x * 1.1 + p.y * 5.3 + t * 0.3) * 0.15;
    h += sin(length(p - uMouse * 2.0) * 3.0 - t * 1.2) * 0.08;
    return h;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.4;
    float t = uTime;
    float e = 0.01;
    float h = fold(p, t);
    vec3 n = normalize(vec3(fold(p - vec2(e, 0.0), t) - fold(p + vec2(e, 0.0), t),
                            fold(p - vec2(0.0, e), t) - fold(p + vec2(0.0, e), t), 0.06));
    vec3 l = normalize(vec3(-0.4, 0.6, 0.7));
    float diff = max(dot(n, l), 0.0);
    float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 24.0);
    vec3 col = vec3(0.035) + diff * vec3(0.12) + spec * vec3(0.55);
    col += vec3(0.70, 0.88, 0.32) * spec * 0.05; // faint lime sheen
    col *= smoothstep(1.25, 0.2, length(uv - 0.5));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function Silk() {
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2() } }),
    []
  );
  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uRes.value.set(size.width, size.height);
    uniforms.uMouse.value.lerp(state.pointer, 0.05);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

export default function SilkScene() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false }} eventSource={typeof document !== "undefined" ? document.body : undefined} eventPrefix="client">
      <Silk />
    </Canvas>
  );
}
