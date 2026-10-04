"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects, site } from "@/lib/content";
import { Chevrons } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      // each card shrinks and dims as the next one slides over it
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel", root.current);
      panels.forEach((p, i) => {
        const next = panels[i + 1];
        if (!next) return;
        gsap.to(p, {
          scale: 0.86,
          filter: "brightness(0.35)", // not opacity: cards must stay solid so the stack doesn't ghost
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 110px", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="portfolio pt-140" id="portfolio" ref={root}>
      <div className="container">
        <div className="portfolio__title">
          <CharTitle lines={["Portfolio", "Projects"]} />
          <Chevrons className="portfolio__arrow" />
        </div>

        {projects.map((p, i) => (
          <article className="portfolio-panel" key={p.title}>
            <div>
              <div className="portfolio-panel__no">#{i + 1}</div>
              <div className="portfolio-panel__tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <h3>{p.title}</h3>
              <Btn href={site.instagram} target="_blank" variant="outline" size="sm">
                View Project
              </Btn>
            </div>
            <div className="portfolio-panel__img">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
