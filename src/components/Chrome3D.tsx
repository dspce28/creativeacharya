"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Real-time chrome objects that stand in for the template's pre-rendered
// 3D PNG shapes (chrome ball, linked rings, twisted "C").
type Variant = "ball" | "rings" | "twist";

function Chrome({ variant }: { variant: Variant }) {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d8d8d8", metalness: 1, roughness: 0.12, envMapIntensity: 1.4 }),
    []
  );
  const dark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.9, roughness: 0.25, envMapIntensity: 1 }),
    []
  );

  useFrame((state, dt) => {
    const g = group.current!;
    g.rotation.y += dt * 0.35;
    g.rotation.x += (state.pointer.y * 0.4 - g.rotation.x) * 0.05;
    g.rotation.z += (-state.pointer.x * 0.3 - g.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      {variant === "ball" && (
        <>
          <mesh material={dark}>
            <sphereGeometry args={[1.25, 64, 64]} />
          </mesh>
          {[-0.75, -0.25, 0.25, 0.75].map((y) => (
            <mesh key={y} material={mat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[Math.sqrt(1.25 * 1.25 - y * y) + 0.02, 0.05, 24, 96]} />
            </mesh>
          ))}
          <mesh material={mat} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[1.27, 0.06, 24, 96]} />
          </mesh>
        </>
      )}
      {variant === "rings" &&
        [0, 1, 2].map((i) => (
          <mesh key={i} material={mat} position={[(i - 1) * 0.95, (i - 1) * -0.55, 0]} rotation={[i % 2 ? Math.PI / 2 : 0.3, 0.4, 0.2]}>
            <torusGeometry args={[0.72, 0.22, 48, 128]} />
          </mesh>
        ))}
      {variant === "twist" && (
        <mesh material={mat} rotation={[0.4, 0, 0]}>
          <torusKnotGeometry args={[0.95, 0.32, 260, 40, 2, 5]} />
        </mesh>
      )}
    </group>
  );
}

export default function Chrome3D({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
          <Chrome variant={variant} />
        </Float>
        {/* Procedural studio lighting — no HDR download needed. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, -2]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#b3e151" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 1.5, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 0, 6]} scale={3} />
        </Environment>
      </Canvas>
    </div>
  );
}
