"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "@/lib/icons";

// Position-aware hover: a circle grows from the exact point the pointer
// entered and shrinks back toward where it left (template "flair" button).
export function useFlair<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Each .flair fills its parent; move its origin to the pointer position
  // inside that parent and scale the circle in/out from there.
  const run = (e: React.PointerEvent<T>, enter: boolean) => {
    e.currentTarget.querySelectorAll<HTMLElement>(".flair").forEach((f) => {
      const r = f.parentElement!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (enter) gsap.fromTo(f, { x, y, scale: 0 }, { x, y, scale: 1, duration: 0.5, ease: "power2.out" });
      else gsap.to(f, { x, y, scale: 0, duration: 0.4, ease: "power2.out" });
    });
  };
  return {
    ref,
    onPointerEnter: (e: React.PointerEvent<T>) => run(e, true),
    onPointerLeave: (e: React.PointerEvent<T>) => run(e, false),
  };
}

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "main" | "outline" | "dark";
  size?: "md" | "sm";
  type?: "button" | "submit";
  target?: string;
};

export default function Btn({ href, children, variant = "main", size = "md", type = "button", target }: Props) {
  const flair = useFlair<HTMLElement>();
  const cls = `btn ${variant !== "main" ? `btn--${variant}` : ""} ${size === "sm" ? "btn--sm" : ""}`;
  const inner = (
    <>
      <span className="btn__label">
        <span className="flair" />
        {children}
      </span>
      <span className="btn__circle">
        <span className="flair" />
        <ArrowRight />
      </span>
    </>
  );
  const handlers = { onPointerEnter: flair.onPointerEnter, onPointerLeave: flair.onPointerLeave };
  if (href)
    return (
      <a className={cls} href={href} target={target} rel={target ? "noreferrer" : undefined} {...handlers}>
        {inner}
      </a>
    );
  return (
    <button className={cls} type={type} {...handlers}>
      {inner}
    </button>
  );
}
