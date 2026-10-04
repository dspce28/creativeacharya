"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { services, site } from "@/lib/content";
import { ArrowUpRight } from "@/lib/icons";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".contact__big .line", { type: "words,chars" });
      gsap.from(split.chars, {
        yPercent: 120,
        rotation: 10,
        opacity: 0,
        stagger: 0.03,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact__big", start: "top 80%" },
      });
      gsap.from(".ccard, .contact__form, .contact__lead", { opacity: 0, y: 60, stagger: 0.1, duration: 1, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: ".contact__cards", start: "top 85%" } });
      return () => split.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  // No backend: compose the enquiry into the visitor's mail app.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Hi Chirag,\n\n${f.get("message")}\n\nService: ${f.get("service")}\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${f.get("service")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const magnet = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.6, ease: "power3" });
  };
  const unmagnet = (e: React.PointerEvent<HTMLAnchorElement>) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.35)" });

  return (
    <section className="section contact" id="contact" ref={root}>
      <div className="container">
        <h2 className="display contact__big">
          <a href={`mailto:${site.email}`} onPointerMove={magnet} onPointerLeave={unmagnet} data-cursor-label="Say hi">
            <span className="line split-line">Let&apos;s create</span>
            <span className="line split-line gradient-text-wrap">
              <span className="outline-text">together</span>
            </span>
          </a>
        </h2>
        <p className="contact__lead">
          Have a project in mind, or just want to say hi? I’m always excited to collaborate on photography, design, or social media projects that bring ideas to life.
        </p>

        <div className="contact__cards">
          <a className="ccard" href={site.phoneHref}>
            <ArrowUpRight />
            <small>Phone number</small>
            <strong>{site.phone}</strong>
          </a>
          <a className="ccard" href={`mailto:${site.email}`}>
            <ArrowUpRight />
            <small>E-mail</small>
            <strong>{site.email}</strong>
          </a>
          <a className="ccard" href={site.instagram} target="_blank" rel="noreferrer">
            <ArrowUpRight />
            <small>Social media</small>
            <strong>{site.handle}</strong>
          </a>
        </div>

        <form className="contact__form" onSubmit={submit}>
          <h3>
            Start a <span className="gradient-text">project</span>
          </h3>
          <div className="field">
            <input id="name" name="name" placeholder=" " required autoComplete="name" />
            <label htmlFor="name">Your name</label>
          </div>
          <div className="field">
            <input id="email" name="email" type="email" placeholder=" " required autoComplete="email" />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="field field--full">
            <select id="service" name="service" defaultValue={services[0].title}>
              {services.map((s) => (
                <option key={s.no}>{s.title}</option>
              ))}
            </select>
            <label htmlFor="service">I&apos;m interested in</label>
          </div>
          <div className="field field--full">
            <textarea id="message" name="message" rows={4} placeholder=" " required />
            <label htmlFor="message">Tell me about your project</label>
          </div>
          <button type="submit" className="btn btn--solid">
            {sent ? "Opening your mail app…" : "Send enquiry"} <ArrowUpRight />
          </button>
        </form>
      </div>
    </section>
  );
}
