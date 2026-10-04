"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { site, stats, team } from "@/lib/content";
import { useFlair } from "./Btn";
import CharTitle from "./CharTitle";
import Counter from "./Counter";

const SilkScene = dynamic(() => import("./SilkScene"), { ssr: false });
const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });

export default function CounterTeam() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const flair = useFlair<HTMLAnchorElement>();

  useEffect(() => {
    // only run the shader while the section is near the viewport
    const st = ScrollTrigger.create({ trigger: root.current, start: "top bottom+=200", end: "bottom top-=200", onToggle: (s) => setVisible(s.isActive) });
    const ctx = gsap.context(() => {
      gsap.from(".team-member", { y: 120, opacity: 0, stagger: 0.12, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".team__grid", start: "top 85%" } });
    }, root);
    return () => {
      st.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div className="silk-area" ref={root}>
      <div className="silk-area__canvas">{visible && <SilkScene />}</div>
      <div className="container">
        <div className="counter-grid">
          {stats.counters.map((c) => (
            <div className="counter-item" key={c.label.join()}>
              <Counter value={c.value} suffix={c.suffix} />
              <span>
                {c.label[0]}
                <br />
                {c.label[1]}
              </span>
            </div>
          ))}
        </div>

        <div className="team">
          <div className="team__head">
            <div className="team__shape">
              <Chrome3D variant="twist" />
            </div>
            <CharTitle lines={team.title} />
            <a className="view-circle" href={site.instagram} target="_blank" rel="noreferrer" onPointerEnter={flair.onPointerEnter} onPointerLeave={flair.onPointerLeave}>
              <span className="flair" />
              Follow on
              <br />
              Instagram
            </a>
          </div>
          <div className="team__grid">
            {team.members.map((m) => (
              <div className="team-member" key={m.role}>
                <div className={`team-member__arch ${m.cutout ? "is-cutout" : ""}`}>
                  <img src={m.image} alt={`${m.name} — ${m.role}`} loading="lazy" />
                </div>
                <div className="team-member__info">
                  <strong>{m.name}</strong>
                  <small>{m.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
