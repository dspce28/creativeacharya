"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

const LETTERS = "Loading".split("");
const BLADES = 6;

// Template preloader (letter wave + SVG curtain that bends and lifts away),
// plus a camera-aperture that opens with real load progress.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const count = el.querySelector<HTMLElement>(".preloader__count")!;
    window.__lenis?.stop();
    window.scrollTo(0, 0);

    const prog = { v: 0 };
    const render = () => {
      count.textContent = `${Math.round(prog.v)}%`;
      gsap.set(".preloader__bar", { scaleX: prog.v / 100 });
      gsap.set(".preloader__blade", { x: (prog.v / 100) * 34 });
    };

    // Climb to 85% quickly, then wait for window load (images/fonts) to finish.
    const climb = gsap.to(prog, { v: 85, duration: 1.6, ease: "power2.out", onUpdate: render });
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      climb.kill();
      gsap
        .timeline({
          onComplete: () => {
            document.body.classList.remove("is-loading");
            window.__lenis?.start();
            setDone(true);
          },
        })
        .to(prog, { v: 100, duration: 0.5, ease: "power1.inOut", onUpdate: render })
        .to(".preloader__inner, .preloader__count", { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" })
        .to("#preloaderSvg", { attr: { d: "M0,502S175,272,500,272s500,230,500,230V0H0Z" }, duration: 0.8, ease: "power4.in" }, "-=0.1")
        .add(() => markReady())
        .to("#preloaderSvg", { attr: { d: "M0,2S175,1,500,1s500,1,500,1V0H0Z" }, duration: 0.8, ease: "power4.out" })
        .to(el, { autoAlpha: 0, duration: 0.01 });
    };
    const minTime = new Promise((r) => setTimeout(r, 1700));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r(null) : window.addEventListener("load", () => r(null), { once: true })));
    Promise.all([minTime, loaded]).then(finish);
    const failsafe = setTimeout(finish, 6000);

    return () => {
      clearTimeout(failsafe);
      climb.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden>
      <svg className="curtain" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
      </svg>
      <div className="preloader__inner">
        <div className="preloader__aperture">
          <svg viewBox="-50 -50 100 100">
            <defs>
              <clipPath id="ap-clip">
                <circle r="44" />
              </clipPath>
            </defs>
            <circle r="47" fill="none" stroke="#b3e151" strokeWidth="2" />
            <g clipPath="url(#ap-clip)">
              {Array.from({ length: BLADES }).map((_, i) => (
                <g key={i} transform={`rotate(${i * (360 / BLADES)})`}>
                  <path className="preloader__blade" d="M-4 0 L60 -40 L60 30 Z" fill={i % 2 ? "#1d1d1d" : "#262626"} stroke="#b3e151" strokeWidth="0.6" />
                </g>
              ))}
            </g>
          </svg>
        </div>
        <div className="load-text">
          {LETTERS.map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>
              {l}
            </span>
          ))}
        </div>
        <div className="preloader__brand">Creative Acharya</div>
      </div>
      <div className="preloader__count">0%</div>
      <div className="preloader__bar" />
    </div>
  );
}
