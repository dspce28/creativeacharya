"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

const BLADES = 8;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const count = el.querySelector<HTMLElement>(".preloader__count")!;
    window.__lenis?.stop();
    window.scrollTo(0, 0);

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-loading");
        window.__lenis?.start();
        setDone(true);
      },
    });

    // Aperture opens: blades slide outward while the whole iris turns.
    tl.fromTo(".preloader__blade", { x: 0 }, { x: 70, duration: 1.8, ease: "power2.inOut" })
      .fromTo(".preloader__blades", { rotation: 0 }, { rotation: 120, svgOrigin: "0 0", duration: 1.8, ease: "power2.inOut" }, 0)
      .to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, "0")),
      }, 0)
      .to(".preloader__iris", { scale: 18, opacity: 0, duration: 0.9, ease: "power3.in" })
      .to(".preloader__curtain", { scaleY: 1, duration: 0.6, ease: "power3.inOut" }, "-=0.5")
      .set(".preloader__count, .preloader__name", { opacity: 0 })
      .add(() => markReady())
      .to(".preloader__curtain", { scaleY: 0, transformOrigin: "top", duration: 0.7, ease: "power3.inOut" })
      .to(el, { autoAlpha: 0, duration: 0.01 });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden>
      <div className="preloader__iris">
        <svg viewBox="-100 -100 200 200">
          <defs>
            <clipPath id="iris-clip">
              <circle r="92" />
            </clipPath>
          </defs>
          <circle r="96" fill="none" stroke="#008ee9" strokeWidth="2" />
          <g clipPath="url(#iris-clip)">
            <g className="preloader__blades">
              {Array.from({ length: BLADES }).map((_, i) => (
                <g key={i} transform={`rotate(${i * (360 / BLADES)})`}>
                  <path
                    className="preloader__blade"
                    d="M-6 0 L118 -55 L118 55 Z"
                    fill={i % 2 ? "#12141f" : "#1a1d2b"}
                    stroke="#008ee9"
                    strokeWidth="0.6"
                  />
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
      <div className="preloader__name">Creative Acharya — Loading visuals</div>
      <div className="preloader__count">000</div>
      <div className="preloader__curtain" />
    </div>
  );
}
