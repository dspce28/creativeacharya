"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Ring + dot cursor. Elements opt in with:
//   data-cursor="hover"            -> ring grows
//   data-cursor-label="View"       -> ring fills and shows a label
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ring.current!;
    const d = dot.current!;
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08 });
    const dy = gsap.quickTo(d, "y", { duration: 0.08 });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-label], a, button, [data-cursor]");
      r.classList.remove("is-hover", "is-label");
      if (!t) return;
      const txt = t.dataset.cursorLabel;
      if (txt) {
        label.current!.textContent = txt;
        r.classList.add("is-label");
      } else {
        r.classList.add("is-hover");
      }
    };
    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([r, d], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden>
        <span ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden />
    </>
  );
}
