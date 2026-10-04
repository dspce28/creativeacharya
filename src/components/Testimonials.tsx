"use client";

import { useEffect, useState } from "react";
import { stats, testimonials } from "@/lib/content";
import { ArrowLeft, ArrowRight, Chevrons, Google, Quote } from "@/lib/icons";
import CharTitle from "./CharTitle";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.items.length;

  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % n), 5000);
    return () => clearTimeout(t);
  }, [i, n]);

  return (
    <section className="testimonial">
      <div className="container">
        <div className="testimonial__head">
          <div>
            <span className="pill-tag">Testimonials</span>
          </div>
          <div className="testimonial__emoji">
            <img src="/images/brand/chirag-cutout.webp" alt="" />
          </div>
          <CharTitle lines={["What my clients", "say about me"]} className="tight" />
          <Chevrons className="testimonial__arrow bounce-x" />
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
              <Google className="g-rating__g" />
              <div>
                <strong>{testimonials.rating}</strong>
                <small>{testimonials.ratingLabel}</small>
              </div>
            </div>
          </div>

          <div className="testimonial__thumb">
            <img src={testimonials.image} alt="" loading="lazy" />
            <Quote className="testimonial__quote" />
          </div>

          <div className="testimonial__slider">
            <div className="testimonial__track" style={{ transform: `translateX(-${i * 100}%)` }}>
              {testimonials.items.map((t, k) => (
                <div className="testimonial__slide" key={k} aria-hidden={k !== i}>
                  <blockquote>“{t.quote}”</blockquote>
                  <div className="t-author">
                    <div className="t-author__info">
                      <span className="t-author__avatar">{t.name[0]}</span>
                      <div>
                        <strong>{t.name}</strong>
                        <small>{t.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="t-nav" style={{ marginTop: 24 }}>
              <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)}>
                <ArrowLeft />
              </button>
              <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
