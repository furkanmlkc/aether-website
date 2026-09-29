import { useRef } from "react";
import { siteConfig as site } from "../../content/site.config";
import { gsap, useMotion } from "../../motion/useMotion";
import { Arrow } from "../ui/Primitives";

function heroMotion(root: HTMLElement) {
  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .from(
      root.querySelectorAll(".hero-enter"),
      { y: 24, opacity: 0, stagger: 0.1, duration: 1.1 },
      0.18,
    )
    .from(
      root.querySelectorAll(".headline-line > span"),
      { yPercent: 110, stagger: 0.12, duration: 1.25 },
      0.35,
    );
  gsap.to(root.querySelector(".hero-copy"), {
    y: -65,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "70% top",
      scrub: 0.7,
    },
  });
  gsap.to(root.querySelectorAll(".hero-bottom, .hero-aside"), {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "40% top",
      scrub: true,
    },
  });
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, heroMotion);
  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-topline hero-enter micro">
        <span className="live-dot" />
        {site.brand.tagline}
        <span className="hero-edition">{site.brand.edition}</span>
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow micro hero-enter">{site.hero.eyebrow}</p>
        <h1 id="hero-title">
          {site.hero.title.map((line, index) => (
            <span
              className={`headline-line headline-line--${index}`}
              key={line}
            >
              <span>{line}</span>
            </span>
          ))}
        </h1>
      </div>
      <div className="hero-aside hero-enter">
        <span className="crosshair" aria-hidden="true">
          +
        </span>
        {site.hero.aside.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="hero-bottom hero-enter micro">
        <a href="#about">
          {site.hero.scroll}
          <Arrow direction="down" />
        </a>
        <span>{site.hero.metadata}</span>
        <span>{site.hero.index}</span>
      </div>
    </section>
  );
}
