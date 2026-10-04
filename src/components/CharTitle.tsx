"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

// Template "tw-char-animation": characters slide in from the right and fade
// up when the title enters the viewport. Second line renders muted.
export default function CharTitle({
  lines,
  as: Tag = "h2",
  className = "",
  dark = false,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.innerWidth <= 768) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(el.querySelectorAll(".ct-line"), { type: "words,chars" });
      gsap.set(el, { perspective: 300 });
      gsap.from(split.chars, {
        x: 100,
        autoAlpha: 0,
        duration: 1,
        delay: 0.2,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
      return () => split.revert();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={`sec-title ${dark ? "dark" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span key={l} className={`ct-line ${i > 0 ? "fade" : ""}`} style={{ display: "block" }}>
          {l}
        </span>
      ))}
    </Tag>
  );
}
