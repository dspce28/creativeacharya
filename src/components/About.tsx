"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { about, stats } from "@/lib/content";
import { LongArrow } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";
import Odometer from "./Odometer";
import Spiro from "./Spiro";

const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about__img img", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".about__img", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about py-120" id="about" ref={root}>
      <Spiro className="about__spiro" />
      <div className="container">
        <div className="about__row1">
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <CharTitle lines={[about.title.join(" ")]} />
            <p>{about.text}</p>
          </div>
          <div className="exp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <img src="/images/brand/chirag-cutout.webp" alt="" />
            <Odometer value={stats.experience.value} suffix={stats.experience.suffix} />
            <span>
              {stats.experience.label[0]}
              <br />
              {stats.experience.label[1]}
            </span>
          </div>
        </div>

        <div className="about__row2">
          <div className="about__img" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <img src="/images/brand/chirag-studio.webp" alt="Chirag Acharya at work" loading="lazy" />
          </div>
          <div className="about__content" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <div className="about__ball">
              <Chrome3D variant="ball" />
            </div>
            <LongArrow className="about__arrow" />
            <h3 className="about__lead">{about.lead}</h3>
            <Btn href="#services">Explore More</Btn>
          </div>
        </div>

        <div className="brands" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
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
