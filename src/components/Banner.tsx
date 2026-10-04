"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { banner, site, stats } from "@/lib/content";
import { Asterisk, Chevrons } from "@/lib/icons";
import Btn from "./Btn";

export default function Banner() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const split = new SplitText(".banner__title .line", { type: "chars", charsClass: "char" });
      gsap.set(split.chars, { yPercent: 100, opacity: 0 });
      gsap.set(".banner__thumb", { clipPath: "inset(0 100% 0 0 round 12px)" });
      gsap.set(".b-fade", { y: 40, opacity: 0 });

      const off = onReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(split.chars, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.04 })
          .to(".banner__thumb", { clipPath: "inset(0 0% 0 0 round 12px)", duration: 1.4, ease: "power4.inOut" }, 0.1)
          .to(".b-fade", { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, 0.5);
      });

      // scroll parallax
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".banner__title .l1", { xPercent: -8, ease: "none", scrollTrigger: st });
      gsap.to(".banner__title .l2", { xPercent: 6, ease: "none", scrollTrigger: st });
      gsap.to(".banner__thumb img", { yPercent: -10, ease: "none", scrollTrigger: st });

      return () => {
        off();
        split.revert();
      };
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="banner" id="top" ref={root}>
      <div className="container-fluid banner__wrap">
        <div className="banner__left">
          <h1 className="banner__title" aria-label={`${banner.words[0]} ${banner.words[1]}`}>
            <span className="line l1">{banner.words[0]}</span>
            <span className="line l2">{banner.words[1]}</span>
          </h1>

          <div className="banner__thumb">
            <img src="/images/brand/chirag-studio.webp" alt="Chirag Acharya — Creative Acharya" />
          </div>

          <div className="banner__sticker b-fade">
            <img src="/images/brand/chirag-cutout.webp" alt="" style={{ objectFit: "cover", aspectRatio: "1", objectPosition: "50% 8%" }} />
          </div>

          <div className="review-card b-fade">
            <div className="review-card__num">
              <strong>
                {stats.projects.value}
                {stats.projects.suffix}
              </strong>
              <span>
                {stats.projects.label[0]}
                <br />
                {stats.projects.label[1]}
              </span>
            </div>
            <div className="avatars">
              {["w1027", "w64", "w399"].map((a) => (
                <span key={a}>
                  <img src={`/images/work/${a}.webp`} alt="" />
                </span>
              ))}
              <span className="more">{stats.happyClients}+</span>
            </div>
          </div>
        </div>

        <div className="banner__right">
          <div className="about-badge b-fade">
            <a href="#about" className="circle-text" aria-label="About me">
              <svg className="ring" viewBox="0 0 144 144" aria-hidden>
                <defs>
                  <path id="aboutCircle" d="M72,72 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
                </defs>
                <text>
                  <textPath href="#aboutCircle">About me • About me • About me •</textPath>
                </text>
              </svg>
              <Asterisk className="star" />
            </a>
            <Chevrons className="chevrons" />
          </div>
          <div className="b-fade">
            <p className="banner__text">{banner.text}</p>
            <Btn href="#about">Explore More</Btn>
          </div>
        </div>

        <div className="banner__siteber b-fade">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email.toUpperCase()}</a>
        </div>
      </div>
    </section>
  );
}
