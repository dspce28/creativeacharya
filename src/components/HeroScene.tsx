"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 9000;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aRand;
  attribute float aRing;
  varying vec3 vColor;
  varying float vAlpha;

  // splash palette: cyan -> brand blue -> violet -> pink -> orange
  vec3 palette(float t) {
    vec3 a = vec3(0.0, 0.76, 1.0);
    vec3 b = vec3(0.0, 0.56, 0.91);
    vec3 c = vec3(0.55, 0.36, 0.96);
    vec3 d = vec3(1.0, 0.24, 0.55);
    vec3 e = vec3(1.0, 0.6, 0.24);
    t = fract(t) * 4.0;
    if (t < 1.0) return mix(a, b, t);
    if (t < 2.0) return mix(b, c, t - 1.0);
    if (t < 3.0) return mix(c, d, t - 2.0);
    return mix(d, e, t - 3.0);
  }

  void main() {
    vec3 p = position;
    float r = length(p.xy);
    float ang = atan(p.y, p.x);

    // rings rotate at different speeds like a lens focus barrel
    float speed = (0.08 + aRing * 0.05) * (mod(aRing, 2.0) < 1.0 ? 1.0 : -1.0);
    ang += uTime * speed;

    // breathing wave travelling outward
    float wave = sin(r * 2.2 - uTime * 1.6 + aRand * 6.28) * 0.08;
    r += wave;

    p.x = cos(ang) * r;
    p.y = sin(ang) * r;
    p.z += sin(uTime * 0.7 + aRand * 12.0) * 0.25 + wave * 2.0;

    // scroll explodes the lens into a splash
    vec3 dir = normalize(vec3(cos(ang), sin(ang), aRand - 0.5));
    p += dir * uScroll * (2.5 + aRand * 6.0);
    p.z += uScroll * aRand * 4.0;

    // mouse repulsion
    vec2 m = uMouse * vec2(6.0, 3.6);
    vec2 diff = p.xy - m;
    float dist = length(diff);
    float force = smoothstep(2.2, 0.0, dist);
    p.xy += normalize(diff + 0.0001) * force * 1.2;
    p.z += force * 1.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + aRand * 4.0 + force * 6.0) * uPixelRatio * (8.0 / -mv.z);

    vColor = palette(ang / 6.2831 + uTime * 0.03 + aRing * 0.04);
    vColor = mix(vColor, vec3(1.0), force * 0.6);
    vAlpha = (0.35 + aRand * 0.65) * (1.0 - uScroll * 0.6);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

function Lens({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2());
  const { gl } = useThree();

  const { geometry, uniforms } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const ring = new Float32Array(COUNT);
    const RINGS = 14;
    for (let i = 0; i < COUNT; i++) {
      // 70% on lens rings, 30% loose dust
      const onRing = Math.random() < 0.7;
      const k = Math.floor(Math.random() * RINGS);
      const r = onRing ? 0.9 + k * 0.32 + (Math.random() - 0.5) * 0.06 : 0.5 + Math.random() * 6.5;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (onRing ? 0.3 : 3);
      rand[i] = Math.random();
      ring[i] = onRing ? k : RINGS + Math.random() * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.setAttribute("aRing", new THREE.BufferAttribute(ring, 1));
    return {
      geometry: g,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(10, 10) },
        uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      },
    };
  }, [gl]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uScroll.value += (scroll.current - uniforms.uScroll.value) * 0.08;
    mouse.current.lerp(state.pointer, 0.08);
    uniforms.uMouse.value.copy(mouse.current);
    if (points.current) {
      points.current.rotation.x = -0.35 + mouse.current.y * 0.15;
      points.current.rotation.y = mouse.current.x * 0.25;
    }
  });

  return (
    <points ref={points} geometry={geometry} position={[1.6, 0.4, 0]}>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({ scroll }: { scroll: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Lens scroll={scroll} />
    </Canvas>
  );
}
