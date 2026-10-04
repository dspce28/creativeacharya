"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { contact, services, site } from "@/lib/content";
import { Mail, Phone, Whatsapp } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__info li, .contact__form > *", { y: 40, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".contact__grid", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  // No backend yet: hand the enquiry to the visitor's mail app.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Hi Chirag,\n\n${f.get("message")}\n\nService: ${f.get("service")}\nPhone: ${f.get("phone") || "-"}\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${f.get("service")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="contact py-140" id="contact" ref={root}>
      <div className="container">
        <div className="contact__head">
          <CharTitle lines={contact.title} dark />
          <div className="sticker-face">
            <img src="/images/brand/chirag-cutout.webp" alt="" />
          </div>
        </div>
        <div className="contact__grid">
          <div>
            <p className="contact__text">{contact.text}</p>
            <ul className="contact__info">
              <li>
                <span className="ico">
                  <Phone />
                </span>
                <div>
                  <small>Call Me</small>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Whatsapp />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <a href={site.whatsapp} target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Mail />
                </span>
                <div>
                  <small>Make a Quote</small>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
            </ul>
          </div>
          <form className="contact__form" onSubmit={submit}>
            <input name="name" placeholder="Name" required autoComplete="name" aria-label="Name" />
            <input name="email" type="email" placeholder="Email" required autoComplete="email" aria-label="Email" />
            <input name="phone" type="tel" placeholder="Phone" autoComplete="tel" aria-label="Phone" />
            <select name="service" defaultValue={services[0].title} aria-label="Service">
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
            <textarea name="message" placeholder="Tell me about your project" required aria-label="Message" />
            <Btn type="submit" variant="dark">
              {sent ? "Opening your mail app…" : "Send Your Message"}
            </Btn>
          </form>
        </div>
      </div>
    </section>
  );
}
