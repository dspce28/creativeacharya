"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Work } from "@/lib/content";

const W = 3.2;
const H = 2.13;

const vertex = /* glsl */ `
  uniform float uVel;
  uniform float uHover;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec3 p = position;
    // flag-like ripple driven by spin velocity
    p.z += sin(uv.x * 3.1415) * uVel * 0.9;
    p.z += sin(uv.y * 3.1415) * uHover * 0.25;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vDepth = world.z;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uVel;
  uniform float uHover;
  uniform float uRadius;
  uniform vec2 uScale;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vec2 uv = (vUv - 0.5) * uScale / (1.0 + uHover * 0.08) + 0.5;
    float shift = uVel * 0.04;
    float r = texture2D(uTex, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTex, uv).g;
    float b = texture2D(uTex, uv - vec2(shift, 0.0)).b;
    vec3 col = vec3(r, g, b);
    float grey = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(grey), col, 0.55 + uHover * 0.45);
    // fade images curving away to the back of the ring
    float depth = smoothstep(-uRadius, uRadius, vDepth);
    col *= mix(0.22, 1.0, depth);
    // brand-blue rim on hover
    vec2 e = smoothstep(vec2(0.0), vec2(0.015), vUv) * smoothstep(vec2(0.0), vec2(0.015), 1.0 - vUv);
    col = mix(vec3(0.0, 0.56, 0.91), col, mix(1.0, e.x * e.y, uHover));
    gl_FragColor = vec4(col, 1.0);
  }
`;

type State = { target: number; current: number; vel: number; dragging: boolean };

function Tile({
  work,
  index,
  count,
  radius,
  spin,
  onOpen,
}: {
  work: Work;
  index: number;
  count: number;
  radius: number;
  spin: React.MutableRefObject<State>;
  onOpen: (w: Work) => void;
}) {
  const tex = useTexture(work.src);
  const mesh = useRef<THREE.Mesh>(null);
  const hover = useRef(0);
  const hovered = useRef(false);

  const uniforms = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    const img = tex.image as HTMLImageElement;
    const ia = img.width / img.height;
    const pa = W / H;
    const scale = ia > pa ? new THREE.Vector2(pa / ia, 1) : new THREE.Vector2(1, ia / pa);
    return {
      uTex: { value: tex },
      uVel: { value: 0 },
      uHover: { value: 0 },
      uRadius: { value: radius },
      uScale: { value: scale },
    };
  }, [tex, radius]);

  const angle0 = (index / count) * Math.PI * 2;

  useFrame(() => {
    const m = mesh.current!;
    const a = angle0 + spin.current.current;
    m.position.set(Math.sin(a) * radius, Math.sin(a * 2 + spin.current.current) * 0.25, Math.cos(a) * radius);
    m.rotation.y = a;
    hover.current += ((hovered.current ? 1 : 0) - hover.current) * 0.1;
    uniforms.uHover.value = hover.current;
    uniforms.uVel.value = THREE.MathUtils.clamp(spin.current.vel * 6, -1, 1);
    const s = 1 + hover.current * 0.12;
    m.scale.set(s, s, 1);
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={(e) => {
        e.stopPropagation();
        hovered.current = true;
        document.body.dataset.galleryHover = "1";
      }}
      onPointerOut={() => {
        hovered.current = false;
        delete document.body.dataset.galleryHover;
      }}
      onClick={(e) => {
        e.stopPropagation();
        // e.delta = pixels moved between pointerdown and pointerup; ignore drags
        if (e.delta < 6) onOpen(work);
      }}
    >
      <planeGeometry args={[W, H, 24, 24]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Ring({ works, spin, onOpen }: { works: Work[]; spin: React.MutableRefObject<State>; onOpen: (w: Work) => void }) {
  const radius = Math.max(4.2, (works.length * (W + 0.6)) / (Math.PI * 2));
  const { camera, size } = useThree();

  useEffect(() => {
    const mobile = size.width < 700;
    camera.position.set(0, mobile ? 1.2 : 1.6, radius + (mobile ? 9 : 6.5));
    camera.lookAt(0, 0, 0);
  }, [camera, radius, size.width]);

  useFrame((state) => {
    const s = spin.current;
    if (!s.dragging) s.target += 0.0018; // idle drift
    const prev = s.current;
    s.current += (s.target - s.current) * 0.075;
    s.vel = s.current - prev;
    state.camera.position.x += (state.pointer.x * 1.2 - state.camera.position.x) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {works.map((w, i) => (
        <Tile key={w.src} work={w} index={i} count={works.length} radius={radius} spin={spin} onOpen={onOpen} />
      ))}
    </group>
  );
}

export default function GalleryScene({
  works,
  scroll,
  onOpen,
}: {
  works: Work[];
  scroll: React.MutableRefObject<number>;
  onOpen: (w: Work) => void;
}) {
  const spin = useRef<State>({ target: 0, current: 0, vel: 0, dragging: false });
  const wrap = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);

  // Drag to spin (mouse + touch), plus scroll-linked rotation.
  useEffect(() => {
    const el = wrap.current!;
    let startX = 0;
    let startT = 0;
    const down = (e: PointerEvent) => {
      spin.current.dragging = true;
      startX = e.clientX;
      startT = spin.current.target;
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!spin.current.dragging) return;
      spin.current.target = startT + (e.clientX - startX) * 0.006;
    };
    const up = () => {
      spin.current.dragging = false;
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    let raf = 0;
    const loop = () => {
      const d = scroll.current - lastScroll.current;
      lastScroll.current = scroll.current;
      spin.current.target += d * Math.PI * 1.5;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(raf);
    };
  }, [scroll]);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }} data-cursor-label="Drag">
      <Canvas camera={{ fov: 40, near: 0.1, far: 100 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Ring works={works} spin={spin} onOpen={onOpen} />
        </Suspense>
      </Canvas>
    </div>
  );
}
