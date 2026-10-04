"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { stats, testimonials } from "@/lib/content";
import { ArrowLeft, ArrowRight, Chevrons, Quote } from "@/lib/icons";
import CharTitle from "./CharTitle";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const n = testimonials.items.length;

  // auto-advance; any manual click restarts the timer
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [i, n]);

  useEffect(() => {
    const slide = root.current!.querySelector(".testimonial__slide.is-active");
    if (slide) gsap.fromTo(slide.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" });
  }, [i]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial__thumb", { rotation: -8, scale: 0.85, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".testimonial__body", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonial pb-140 pt-140" ref={root}>
      <div className="container">
        <div className="testimonial__head">
          <div className="testimonial__head-left">
            <span className="pill-tag">Testimonials</span>
            <div className="sticker-face">
              <img src="/images/brand/chirag-cutout.webp" alt="" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30 }}>
            <CharTitle lines={["What My Clients", "Say About Me"]} />
            <Chevrons className="portfolio__arrow" />
          </div>
        </div>

        <div className="testimonial__body">
          <div className="testimonial__clients">
            <div className="avatars">
              {["w1027", "w64", "w399"].map((a) => (
                <span key={a}>
                  <img src={`/images/work/${a}.webp`} alt="" />
                </span>
              ))}
              <span className="more">{stats.happyClients}+</span>
            </div>
            <p>
              {testimonials.clientsLine[0]}
              <br />
              {testimonials.clientsLine[1]}
            </p>
            <div className="g-rating">
              <div>
                <span className="g-rating__stars">★★★★★</span>
                <strong>{testimonials.rating}</strong>
                <small>{testimonials.ratingLabel}</small>
              </div>
            </div>
          </div>

          <div className="testimonial__thumb">
            <img src={testimonials.image} alt="" loading="lazy" />
            <Quote className="testimonial__quote-icon" />
          </div>

          <div className="testimonial__slider">
            {testimonials.items.map((t, k) => (
              <div className={`testimonial__slide ${k === i ? "is-active" : ""}`} key={k} aria-hidden={k !== i}>
                <blockquote>“{t.quote}”</blockquote>
                <div className="t-author">
                  <div className="t-author__info">
                    <span className="t-author__avatar">{t.name[0]}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.role}</small>
                    </div>
                  </div>
                  <div className="t-nav">
                    <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)}>
                      <ArrowLeft />
                    </button>
                    <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)}>
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
