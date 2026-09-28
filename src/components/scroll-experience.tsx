"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export function ScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const video = videoRef.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let progress = 0;
    let displayed = 0;
    let frame = 0;
    let last = 0;
    let alive = true;

    const paint = (value: number) => {
      const introOpacity = 1 - ease(value / 0.2);
      const outroOpacity = ease((value - 0.76) / 0.2);
      introRef.current!.style.opacity = String(introOpacity);
      introRef.current!.style.transform = `translateY(${motion.matches ? 0 : -value * 90}px)`;
      outroRef.current!.style.opacity = String(outroOpacity);
      outroRef.current!.style.transform = `translateY(${motion.matches ? 0 : (1 - outroOpacity) * 28}px)`;
      outroRef.current!.inert = outroOpacity < 0.95;
      outroRef.current!.setAttribute("aria-hidden", String(outroOpacity < 0.95));
      introRef.current!.setAttribute("aria-hidden", String(introOpacity < 0.05));
      hintRef.current!.style.opacity = String(1 - ease(value / 0.12));
      progressRef.current!.style.transform = `scaleX(${value})`;
      numberRef.current!.textContent = String(Math.round(value * 100)).padStart(3, "0");
    };

    const tick = (time: number) => {
      frame = 0;
      const elapsed = last ? Math.min(time - last, 64) : 16;
      last = time;
      displayed += (progress - displayed) * (1 - Math.exp(-elapsed / 95));
      if (Math.abs(progress - displayed) < 0.00015) displayed = progress;
      paint(displayed);
      // One seek at a time: never build up a queue of decoder work.
      if (!motion.matches && video.readyState >= 2 && Number.isFinite(video.duration) && !video.seeking) {
        const target = displayed * video.duration;
        if (Math.abs(video.currentTime - target) > 0.012) video.currentTime = target;
      }
      if (Math.abs(progress - displayed) > 0.0001 || video.seeking ||
        (!motion.matches && video.readyState >= 2 && Math.abs(video.currentTime - progress * video.duration) > 0.015)) {
        frame = requestAnimationFrame(tick);
      }
    };
    const wake = () => { if (!frame && alive) { last = 0; frame = requestAnimationFrame(tick); } };
    const onReady = () => { setReady(true); setFailed(false); video.pause(); wake(); };
    const onError = () => { setFailed(true); };
    const onMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) { video.pause(); video.currentTime = 0; displayed = progress; }
      paint(displayed);
      wake();
    };
    onMotion();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", onError);
    video.addEventListener("seeked", wake);
    motion.addEventListener("change", onMotion);
    if (video.readyState >= 2) onReady();

    const context = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: section, start: "top top", end: "bottom bottom",
        pin: stage, pinSpacing: false, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { progress = self.progress; wake(); },
        onRefresh: (self) => { progress = self.progress; wake(); },
      });
    }, section);
    // Metadata preload keeps initial discovery light. Explicitly request frame
    // data because this is the sole, immediately visible visual on the page.
    video.preload = "auto";
    video.load();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      context.revert();
      triggerRef.current = null;
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
      video.removeEventListener("seeked", wake);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  function navigate(toEnd: boolean) {
    const trigger = triggerRef.current;
    if (trigger) window.scrollTo({ top: toEnd ? trigger.end : trigger.start, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <main>
      <section ref={sectionRef} className="sequence" aria-label="An immersive scroll-controlled film">
        <div ref={stageRef} className="stage">
          <video ref={videoRef} className={`film ${ready ? "is-ready" : ""}`} src="/sequence.mp4" muted playsInline preload="metadata" disablePictureInPicture aria-hidden="true" />
          <div className="film-shade" />
          <div className="fine-grain" />

          <header className="masthead">
            <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); navigate(false); }} aria-label="Aether, back to the beginning"><span className="brand-symbol">Λ</span>AETHER<span className="wordmark-dot">®</span></a>
            <span className="header-note">INDEPENDENT PERSPECTIVES.<br />EXTRAORDINARY POSSIBILITIES.</span>
            <button className="explore-link" onClick={() => navigate(true)}>Explore the film <span aria-hidden="true">↗</span></button>
          </header>

          <div ref={introRef} className="intro">
            <p className="eyebrow"><span className="small-line" /> A NEW PERSPECTIVE</p>
            <h1>Beyond<br />the <em>ordinary.</em></h1>
            <p className="subtitle">Some things aren’t meant to stand still.<br />Neither are you.</p>
          </div>

          <div ref={outroRef} className="outro" aria-hidden="true" inert>
            <p className="eyebrow">THE END IS ONLY A BEGINNING</p>
            <h2>A different<br />kind of <em>feeling.</em></h2>
            <p className="subtitle">A moment worth seeing from every angle.</p>
            <button className="cta" onClick={() => navigate(false)}>Experience it again <span aria-hidden="true">↗</span></button>
          </div>

          {!ready && <div className="loading" role="status" aria-live="polite">{failed ? <><span>The film couldn’t load.</span><button onClick={() => { setFailed(false); videoRef.current?.load(); }}>Try again ↗</button></> : <><span className="loading-line" />Preparing your perspective</>}</div>}

          <footer className="film-footer">
            <div className="edition"><span className="status-dot" /> AETHER — MOTION STUDY 001</div>
            <div ref={hintRef} className="scroll-hint"><span className="scroll-icon">↓</span><span>{reduced ? "SCROLL TO EXPLORE" : "SCROLL TO FEEL IT"}</span></div>
            <div className="counter"><span ref={numberRef}>000</span><span className="counter-divider">/</span>100</div>
          </footer>
          <div className="progress-track"><div ref={progressRef} className="progress-fill" /></div>
          <span className="sr-only">Scroll down to advance the film. Scroll up to reverse it. {reduced && "Reduced motion is enabled; the film remains on its first frame."}</span>
        </div>
      </section>
    </main>
  );
}
