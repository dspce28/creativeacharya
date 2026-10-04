"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Template-style cursor: lime dot + trailing outlined ring that grows over links.
export default function Cursor() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const o = outer.current!;
    const i = inner.current!;
    const ox = gsap.quickTo(o, "x", { duration: 0.5, ease: "power3" });
    const oy = gsap.quickTo(o, "y", { duration: 0.5, ease: "power3" });
    const ix = gsap.quickTo(i, "x", { duration: 0.06 });
    const iy = gsap.quickTo(i, "y", { duration: 0.06 });
    const move = (e: PointerEvent) => {
      ox(e.clientX);
      oy(e.clientY);
      ix(e.clientX);
      iy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, input, textarea, select, [data-cursor]");
      o.classList.toggle("is-hover", Boolean(hit));
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div className="cursor-outer" ref={outer} aria-hidden />
      <div className="cursor-inner" ref={inner} aria-hidden />
    </>
  );
}
