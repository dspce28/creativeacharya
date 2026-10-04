"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { site, stats, team } from "@/lib/content";
import CharTitle from "./CharTitle";
import Magnet from "./Magnet";
import Odometer from "./Odometer";

const SilkScene = dynamic(() => import("./SilkScene"), { ssr: false });
const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });

export default function CounterTeam() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // run the shader only while the section is near the viewport
    const st = ScrollTrigger.create({ trigger: root.current, start: "top bottom+=200", end: "bottom top-=200", onToggle: (s) => setVisible(s.isActive) });
    return () => st.kill();
  }, []);

  return (
    <div className="silk-area" ref={root}>
      <div className="silk-area__canvas">{visible && <SilkScene />}</div>
      <div className="container">
        <div className="counter-grid">
          {stats.counters.map((c, i) => (
            <div className="counter-item" key={c.label.join()} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={200 + i * 100}>
              <Odometer value={c.value} suffix={c.suffix} />
              <p>
                {c.label[0]}
                <br />
                {c.label[1]}
              </p>
            </div>
          ))}
        </div>

        <div className="team__head">
          <div className="team__shape">
            <Chrome3D variant="twist" />
          </div>
          <CharTitle lines={[team.title[0] + " " + team.title[1], team.title[2]]} className="tight" />
          <Magnet href={site.instagram} target="_blank">
            Follow on Instagram
          </Magnet>
        </div>
        <div className="team__grid">
          {team.members.map((m, i) => (
            <div className={`team-member ${m.cutout ? "is-cutout" : ""}`} key={m.role} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={200 + i * 100}>
              <img src={m.image} alt={`${m.name} — ${m.role}`} loading="lazy" />
              <div className="team-member__info">
                <strong>{m.name}</strong>
                <small>{m.role}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
