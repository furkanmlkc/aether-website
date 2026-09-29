import { useRef } from "react";
import { siteConfig as site } from "../../content/site.config";
import { revealChildren, useMotion } from "../../motion/useMotion";
import { MagneticButton, SectionLabel } from "../ui/Primitives";

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, revealChildren);
  return (
    <section
      ref={ref}
      id="contact"
      className="contact page-pad"
      aria-labelledby="contact-title"
    >
      <div className="section-heading">
        <SectionLabel index={site.contact.index}>
          {site.contact.label}
        </SectionLabel>
        <span className="micro">{site.contact.note}</span>
      </div>
      <h2 id="contact-title" data-reveal>
        {site.contact.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <div className="contact-bottom" data-reveal>
        <p>{site.contact.body}</p>
        <MagneticButton href={site.contact.href}>
          {site.ui.projectCTA}
        </MagneticButton>
        <a href={site.contact.href} className="contact-email micro">
          {site.contact.email}
        </a>
      </div>
    </section>
  );
}
