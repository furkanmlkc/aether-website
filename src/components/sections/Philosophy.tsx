import { useRef } from "react";
import { siteConfig as site } from "../../content/site.config";
import { gsap, useMotion } from "../../motion/useMotion";
import { SectionLabel } from "../ui/Primitives";

function statementMotion(root: HTMLElement) {
  root
    .querySelectorAll(".statement-line")
    .forEach((line) =>
      gsap.fromTo(
        line,
        { opacity: 0.18, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 88%",
            end: "top 52%",
            scrub: 0.5,
          },
        },
      ),
    );
}
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, statementMotion);
  return (
    <section
      ref={ref}
      id="about"
      className="philosophy page-pad"
      aria-labelledby="philosophy-title"
    >
      <div className="section-heading">
        <SectionLabel index={site.philosophy.index}>
          {site.philosophy.label}
        </SectionLabel>
        <span className="micro muted">{site.philosophy.kicker}</span>
      </div>
      <div className="philosophy-body">
        <h2 id="philosophy-title" className="statement">
          {site.philosophy.lines.map((line, index) => (
            <span
              className={`statement-line ${index > 1 ? "accent-text" : ""}`}
              key={line}
            >
              {line}
            </span>
          ))}
        </h2>
        <div className="philosophy-caption">
          <span className="asterisk" aria-hidden="true">
            ✳
          </span>
          <p>{site.philosophy.body}</p>
          <span className="micro muted">{site.philosophy.note}</span>
        </div>
      </div>
    </section>
  );
}
