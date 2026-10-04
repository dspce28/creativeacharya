"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { process } from "@/lib/content";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step", { opacity: 0, y: 80, rotateX: -25, stagger: 0.12, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".process__grid", start: "top 80%" } });
      gsap.from(".process .head > *", { opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  // 3D tilt + spotlight following the pointer
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    gsap.to(el, { rotateY: (x / r.width - 0.5) * 14, rotateX: -(y / r.height - 0.5) * 14, transformPerspective: 800, duration: 0.5 });
    gsap.set(el.querySelector(".step__glow"), { left: x, top: y });
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3" });

  return (
    <section className="section process" ref={root}>
      <div className="container">
        <div className="head">
          <span className="eyebrow">How we work</span>
          <h2 className="h2" style={{ marginTop: 20 }}>
            From idea <span className="outline-text">to</span> <span className="gradient-text">frame</span>
          </h2>
        </div>
        <div className="process__grid">
          {process.map((p, i) => (
            <div className="step" key={p.step} onPointerMove={onMove} onPointerLeave={onLeave}>
              <span className="step__glow" />
              <div className="step__no gradient-text">0{i + 1}</div>
              <h3>{p.step}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
