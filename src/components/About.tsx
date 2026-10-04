"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { about } from "@/lib/content";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // scrubbed word-by-word highlight of the intro
      gsap.to(".about__lead .word", {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ".about__lead", start: "top 85%", end: "bottom 45%", scrub: true },
      });
      // image parallax + clip reveal
      gsap.fromTo(
        ".about__media",
        { clipPath: "inset(20% 20% 20% 20% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "power2.out", scrollTrigger: { trigger: ".about__media", start: "top 90%", end: "top 30%", scrub: true } }
      );
      gsap.fromTo(".about__media > img", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".about__media", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".about__splash", { rotation: -10, scale: 0.8 }, { rotation: 6, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".about__visual", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".about .reveal").forEach((el) =>
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
      );
      gsap.from(".about .chip", { opacity: 0, y: 20, scale: 0.8, stagger: 0.06, duration: 0.6, ease: "back.out(2)", clearProps: "transform", scrollTrigger: { trigger: ".about .chips", start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <div className="container about__grid">
        <div className="about__visual">
          <div className="about__media" data-cursor-label="Hello">
            <img src="/images/brand/chirag-studio.webp" alt="Portrait of Chirag Acharya in the studio" loading="lazy" />
            <div className="about__sig">
              <img src="/images/brand/logo-mark.webp" alt="" />
            </div>
          </div>
          <img className="about__splash" src="/images/brand/splash.webp" alt="" loading="lazy" />
        </div>

        <div className="about__text">
          <span className="eyebrow reveal">{about.heading}</span>
          <h2 className="h2 reveal">
            Turning ideas into <span className="gradient-text">visual magic</span>
          </h2>
          <p className="about__lead">
            {about.intro.split(" ").map((w, i) => (
              <span className="word" key={i}>
                {w}{" "}
              </span>
            ))}
          </p>
          {about.paragraphs.map((p) => (
            <p className="reveal" key={p.slice(0, 20)}>
              {p}
            </p>
          ))}
          <p className="about__mission reveal">{about.mission}</p>
          <div className="chips">
            {about.skills.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
