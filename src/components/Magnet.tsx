"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

// Template "tw-hover-btn": circle drifts toward the pointer (60px range) and a
// dot placed at the entry point grows to fill it.
export default function Magnet({
  href,
  children,
  solid = false,
  target,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
  target?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const item = useRef<HTMLAnchorElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  const placeDot = (e: React.PointerEvent) => {
    const r = item.current!.getBoundingClientRect();
    dot.current!.style.left = `${e.clientX - r.left}px`;
    dot.current!.style.top = `${e.clientY - r.top}px`;
  };
  const move = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    gsap.to(item.current, {
      x: ((e.clientX - r.left - r.width / 2) / r.width) * 60,
      y: ((e.clientY - r.top - r.height / 2) / r.height) * 60,
      duration: 1,
      ease: "power2.out",
    });
  };
  const leave = (e: React.PointerEvent) => {
    placeDot(e);
    gsap.to(item.current, { x: 0, y: 0, duration: 1, ease: "power2.out" });
  };

  return (
    <div className="magnet" ref={wrap} onPointerMove={move} onPointerLeave={leave}>
      <a
        ref={item}
        href={href}
        target={target}
        rel={target ? "noreferrer" : undefined}
        className={`circle-btn ${solid ? "circle-btn--solid" : ""}`}
        onPointerEnter={placeDot}
      >
        <span>{children}</span>
        <i className="circle-btn__dot" ref={dot} />
      </a>
    </div>
  );
}
