import { useEffect, useRef, useState } from "react";
import { siteConfig as site } from "../../content/site.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Dialog } from "../ui/Dialog";
import { Arrow, ArrowLink } from "../ui/Primitives";
import { gsap, useMotion } from "../../motion/useMotion";

function navigationMotion(root: HTMLElement) {
  gsap.from(root.children, {
    opacity: 0,
    y: -10,
    stagger: 0.075,
    duration: 0.85,
    delay: 0.15,
    ease: "power3.out",
  });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery("(min-width: 901px)");
  const header = useRef<HTMLElement>(null);
  useMotion(header, navigationMotion);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      header.current?.classList.toggle("is-scrolled", !entry.isIntersecting),
    );
    const sentinel = document.querySelector("#top-sentinel");
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (desktop) setOpen(false);
  }, [desktop]);
  return (
    <>
      <header ref={header} className="navbar">
        <a
          href="#top"
          className="brand"
          aria-label={`${site.brand.name} — home`}
        >
          {site.brand.name}
        </a>
        <span className="nav-tag">{site.brand.tagline}</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ArrowLink href={site.contact.href} className="nav-cta">
          {site.ui.projectCTA}
        </ArrowLink>
        <button
          className="menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <span>{site.ui.menu}</span>
          <span className="hamburger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="menu-title"
        className="mobile-menu"
      >
        <div className="menu-top">
          <span className="brand">{site.brand.name}</span>
          <button onClick={() => setOpen(false)} className="close-button">
            {site.ui.close}
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <h2 id="menu-title" className="sr-only">
          {site.ui.menuTitle}
        </h2>
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          {site.navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              style={{ "--order": index } as React.CSSProperties}
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
                requestAnimationFrame(() => {
                  document
                    .querySelector(item.href)
                    ?.scrollIntoView({ behavior: "instant" });
                  window.history.replaceState(null, "", item.href);
                });
              }}
            >
              <span>0{index + 1}</span>
              {item.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <ArrowLink className="menu-contact" href={site.contact.href}>
          {site.ui.projectCTA}
        </ArrowLink>
        <span className="micro muted">{site.contact.email}</span>
      </Dialog>
    </>
  );
}
