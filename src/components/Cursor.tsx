"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Template "magic cursor" (tw-cursor.js): a small difference-blend ball that
// trails the pointer (ratio 0.15), disappears over links/buttons and grows
// with a label over elements carrying data-cursor="Label".
export default function Cursor() {
  const ball = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const b = ball.current!;
    const label = b.querySelector<HTMLElement>(".ball__label")!;
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    gsap.set(b, { xPercent: -50, yPercent: -50 });

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(b, { x: pos.x, y: pos.y });
    };
    let state = "";
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, input, textarea, select");
      const next = labelled ? `label:${labelled.dataset.cursor}` : link ? "hide" : "";
      if (next === state) return;
      state = next;
      if (labelled) {
        label.textContent = labelled.dataset.cursor || "";
        gsap.to(b, { width: 90, height: 90, opacity: 1, scale: 1, duration: 0.3 });
        gsap.to(label, { opacity: 1, duration: 0.2 });
      } else if (link) {
        gsap.to(b, { scale: 0, opacity: 0, duration: 0.3 });
      } else {
        gsap.to(b, { width: 10, height: 10, scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(label, { opacity: 0, duration: 0.1 });
      }
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="ball" ref={ball} aria-hidden>
      <span className="ball__label" />
    </div>
  );
}
