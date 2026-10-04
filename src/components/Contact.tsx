"use client";

import { useState } from "react";
import { contact, services, site } from "@/lib/content";
import Btn from "./Btn";
import CharTitle from "./CharTitle";
import { ContactList } from "./Header";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // No backend yet: hand the enquiry to the visitor's mail app.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Hi Chirag,\n\n${f.get("message")}\n\nService: ${f.get("service")}\nPhone: ${f.get("phone") || "-"}\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${f.get("service")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__head">
          <CharTitle lines={[contact.title.join(" ")]} className="dark" />
          <img src="/images/brand/chirag-cutout.webp" alt="" />
        </div>
        <div className="contact__grid">
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <p className="contact__text">{contact.text}</p>
            <ContactList />
          </div>
          <form className="contact__form" onSubmit={submit} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <input name="name" placeholder="Name" required autoComplete="name" aria-label="Name" />
            <input name="email" type="email" placeholder="Email" required autoComplete="email" aria-label="Email" />
            <input name="phone" type="tel" placeholder="Phone" autoComplete="tel" aria-label="Phone" />
            <select name="service" defaultValue={services[0].title} aria-label="Service">
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
            <textarea name="message" placeholder="Enter Your Message here" required aria-label="Message" />
            <Btn type="submit" variant="dark">
              {sent ? "Opening your mail app…" : "Send Your Message"}
            </Btn>
          </form>
        </div>
      </div>
    </section>
  );
}
