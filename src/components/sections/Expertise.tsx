import { useRef } from "react";
import { siteConfig as site } from "../../content/site.config";
import {
  revealChildren,
  ScrollTrigger,
  useMotion,
} from "../../motion/useMotion";
import { Arrow, SectionLabel } from "../ui/Primitives";

export function Expertise() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, revealChildren);
  return (
    <section
      ref={ref}
      id="expertise"
      className="expertise page-pad"
      aria-labelledby="expertise-title"
    >
      <SectionLabel index={site.expertise.index}>
        {site.expertise.label}
      </SectionLabel>
      <div className="expertise-intro" data-reveal>
        <h2 id="expertise-title" className="section-title">
          {site.expertise.title}
        </h2>
        <p>{site.expertise.description}</p>
      </div>
      <div className="service-list">
        {site.expertise.services.map((service, index) => (
          <details
            className="service"
            key={service.title}
            data-reveal
            onToggle={() => ScrollTrigger.refresh()}
          >
            <summary>
              <span className="micro muted">0{index + 1}</span>
              <h3>{service.title}</h3>
              <Arrow />
            </summary>
            <p>{service.description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
