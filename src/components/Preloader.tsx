"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

const CURVE = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
const FLAT = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

// Template preloader (main.js #01): blinking LOADING letters, then the
// letters rise out, the curtain bends into a curve, flattens, and the whole
// layer lifts away. Added: a real load-progress counter and bar.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const count = el.querySelector<HTMLElement>(".preloader__count")!;
    const bar = el.querySelector<HTMLElement>(".preloader__bar")!;
    window.__lenis?.stop();
    window.scrollTo(0, 0);

    const prog = { v: 0 };
    const render = () => {
      count.textContent = String(Math.round(prog.v)).padStart(2, "0");
      bar.style.transform = `scaleX(${prog.v / 100})`;
    };
    const climb = gsap.to(prog, { v: 90, duration: 1.2, ease: "power2.out", onUpdate: render });

    let started = false;
    const exit = () => {
      if (started) return;
      started = true;
      climb.kill();
      gsap
        .timeline({
          onComplete: () => {
            document.body.classList.remove("is-loading");
            window.__lenis?.start();
            setDone(true);
          },
        })
        .to(prog, { v: 100, duration: 0.3, onUpdate: render })
        .to(".preloader-heading .load-text, .preloader__meta, .preloader__bar", { y: -80, opacity: 0, duration: 0.6 })
        .to("#preloaderSvg", { duration: 0.6, attr: { d: CURVE }, ease: "power2.inOut" })
        .to("#preloaderSvg", { duration: 0.6, attr: { d: FLAT }, ease: "power2.inOut" })
        .add(() => markReady(), "-=0.3")
        .to(el, { y: "-130%", duration: 0.8, ease: "power4.inOut" });
    };
    // template waits 1s after DOMContentLoaded; we also wait for window load
    const minTime = new Promise((r) => setTimeout(r, 1000));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r(null) : window.addEventListener("load", () => r(null), { once: true })));
    Promise.all([minTime, loaded]).then(exit);
    const failsafe = setTimeout(exit, 5000);
    return () => {
      clearTimeout(failsafe);
      climb.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
      </svg>
      <div className="preloader-heading">
        <div className="load-text">
          {"Loading".split("").map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="preloader__meta">
        <span>Creative Acharya</span>
        <span className="preloader__count">00</span>
      </div>
      <div className="preloader__bar" />
    </div>
  );
}
