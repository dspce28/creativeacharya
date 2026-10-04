"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { services, servicesIntro } from "@/lib/content";
import { Camera, Film, Pen, Share } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";

const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });
const ICONS = [Camera, Pen, Share, Film];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".services__grid", start: "top 85%" } });
      gsap.from(".services__head .fade-up", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".services__head", start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services pt-140" id="services" ref={root}>
      <div className="container">
        <div className="services__head">
          <div>
            <CharTitle lines={servicesIntro.title} />
            <p className="fade-up">{servicesIntro.text}</p>
            <div className="fade-up">
              <Btn href="#contact" variant="outline" size="sm">
                Explore More
              </Btn>
            </div>
          </div>
          <div className="services__shape">
            <Chrome3D variant="rings" />
          </div>
        </div>

        <div className="services__grid">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article className="service-card" key={s.title}>
                <Icon className="service-card__icon" />
                <h3>{s.title}</h3>
                <p className="service-card__text">{s.text}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
