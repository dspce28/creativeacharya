"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site, stories } from "@/lib/content";
import Btn from "./Btn";
import CharTitle from "./CharTitle";

export default function Stories() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", { y: 80, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".blog__grid", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="blog py-140" id="stories" ref={root}>
      <div className="container">
        <div className="blog__head">
          <CharTitle lines={["Latest Stories", "From the Lens"]} />
          <Btn href={site.instagram} target="_blank" variant="outline" size="sm">
            View Instagram
          </Btn>
        </div>
        <div className="blog__grid">
          {stories.map((s) => (
            <a className="blog-card" key={s.title} href={site.instagram} target="_blank" rel="noreferrer">
              <div className="blog-card__img">
                <img src={s.image} alt="" loading="lazy" />
              </div>
              <div className="blog-card__meta">
                {site.handle} — <span>{s.category}</span>
              </div>
              <h3>{s.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
