"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

// Template "tw-char-animation" (custom-gsap.js #01): on viewports > 768px,
// chars slide in from x:100 with autoAlpha, 1s, 0.5s delay, 0.05s stagger,
// triggered once at "top 90%".
export default function CharTitle({
  lines,
  as: Tag = "h2",
  className = "",
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.innerWidth <= 768) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(el, { type: "chars, words" });
      gsap.set(el, { perspective: 300 });
      gsap.from(split.chars, {
        duration: 1,
        delay: 0.5,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 60%", toggleActions: "play none none none" },
      });
      return () => split.revert();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={`sec-title ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="ct-line">
          {l}
        </span>
      ))}
    </Tag>
  );
}
