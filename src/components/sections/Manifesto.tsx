import { useRef } from "react";
import { siteConfig as site } from "../../content/site.config";
import { gsap, useMotion } from "../../motion/useMotion";
import { SectionLabel } from "../ui/Primitives";

function manifestoMotion(root: HTMLElement) {
  gsap.from(root.querySelectorAll(".manifesto-line"), {
    y: 70,
    opacity: 0.12,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: root,
      start: "top 65%",
      end: "70% 70%",
      scrub: 0.6,
    },
  });
}
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, manifestoMotion);
  return (
    <section
      ref={ref}
      className="manifesto page-pad"
      aria-labelledby="manifesto-title"
    >
      <SectionLabel index={site.manifesto.index}>
        {site.manifesto.label}
      </SectionLabel>
      <h2 id="manifesto-title">
        {site.manifesto.lines.map((line) => (
          <span className="manifesto-line" key={line}>
            {line}
          </span>
        ))}
        <span className="manifesto-closing">
          {site.manifesto.closing.map((line) => (
            <span className="manifesto-line" key={line}>
              {line}
            </span>
          ))}
        </span>
      </h2>
      <p className="micro manifesto-note">{site.manifesto.note}</p>
    </section>
  );
}
