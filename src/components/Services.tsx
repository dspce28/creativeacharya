"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/lib/content";
import { ArrowUpRight } from "@/lib/icons";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = float.current!;
    const xTo = gsap.quickTo(f, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(f, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(f, "rotation", { duration: 0.8, ease: "power3" });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      xTo(e.clientX - 160);
      yTo(e.clientY - 120);
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    const rows = gsap.utils.toArray<HTMLElement>(".service", root.current);
    const imgs = f.querySelectorAll("img");
    const enter = (i: number) => () => {
      imgs.forEach((im, j) => im.classList.toggle("is-active", i === j));
      gsap.to(f, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
    };
    const leave = () => gsap.to(f, { opacity: 0, scale: 0.6, duration: 0.4 });
    const handlers = rows.map((r, i) => {
      const h = enter(i);
      r.addEventListener("pointerenter", h);
      r.addEventListener("pointerleave", leave);
      return h;
    });
    window.addEventListener("pointermove", move);

    const ctx = gsap.context(() => {
      gsap.from(".service", {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services__list", start: "top 80%" },
      });
      gsap.from(".services__head > *", { opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".services__head", start: "top 85%" } });
    }, root);

    return () => {
      rows.forEach((r, i) => {
        r.removeEventListener("pointerenter", handlers[i]);
        r.removeEventListener("pointerleave", leave);
      });
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return (
    <section className="section" id="services" ref={root}>
      <div className="container">
        <div className="services__head">
          <div>
            <span className="eyebrow">What I offer</span>
            <h2 className="h2" style={{ marginTop: 20 }}>
              Services <span className="outline-text">&amp;</span>
              <br />
              <span className="gradient-text">Expertise</span>
            </h2>
          </div>
          <p>I help brands and individuals tell their stories through visuals, design, and strategy. Here’s how I can bring your vision to life.</p>
        </div>

        <div className="services__list">
          {services.map((s) => (
            <a href="#contact" className="service" key={s.no} data-cursor-label="Book">
              <span className="service__no">({s.no})</span>
              <h3 className="service__title">{s.title}</h3>
              <div>
                <p className="service__text">{s.text}</p>
                <div className="service__tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <span className="service__arrow">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="service-float" ref={float} aria-hidden>
        {services.map((s) => (
          <img key={s.no} src={s.image} alt="" loading="lazy" />
        ))}
      </div>
    </section>
  );
}
