"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { about, stats } from "@/lib/content";
import { LongArrow } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";
import Counter from "./Counter";

const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about__img img", { yPercent: -15 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".about__img", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".about__img", { clipPath: "inset(0 0 100% 0 round 14px)", duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: ".about__img", start: "top 85%" } });
      gsap.from(".brand", { y: 40, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".brands", start: "top 90%" } });
      gsap.from(".about .fade-up", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about py-140" id="about" ref={root}>
      <div className="container">
        <div className="about__top">
          <div className="about__shape">
            <Chrome3D variant="ball" />
          </div>
          <div>
            <CharTitle lines={about.title} />
            <p className="about__desc fade-up">{about.text}</p>
          </div>
          <div className="exp fade-up">
            <img src="/images/brand/chirag-cutout.webp" alt="" />
            <Counter value={stats.experience.value} suffix={stats.experience.suffix} />
            <span>
              {stats.experience.label[0]}
              <br />
              {stats.experience.label[1]}
            </span>
          </div>
        </div>

        <div className="about__mid">
          <div className="about__img">
            <img src="/images/brand/chirag-studio.webp" alt="Chirag Acharya at work" loading="lazy" />
          </div>
          <div>
            <LongArrow className="about__arrow" />
            <h3 className="about__lead fade-up">{about.lead}</h3>
            <div className="fade-up">
              <Btn href="#services">Explore More</Btn>
            </div>
          </div>
        </div>

        <div className="brands">
          {about.tools.map((t) => (
            <div className="brand" key={t}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
