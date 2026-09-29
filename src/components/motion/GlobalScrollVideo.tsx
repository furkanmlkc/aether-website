import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "../../motion/useMotion";
import {
  useMediaQuery,
  usePrefersReducedMotion,
} from "../../hooks/useMediaQuery";

export type Contrast = {
  veil: number;
  left: number;
  right: number;
  bottom: number;
  tint: number;
};
export type VideoOverlay = {
  base: Contrast;
  scenes?: { selector: string; contrast: Contrast }[];
};
export type GlobalScrollVideoProps = {
  src: string;
  poster?: string;
  scrub?: number;
  startTime?: number;
  endTime?: number;
  objectPosition?: string;
  overlay?: VideoOverlay;
  className?: string;
  disabledOnMobile?: boolean;
  fallbackMode?: "poster" | "first-frame";
  labels?: { loading: string; error: string };
};

const defaultContrast: Contrast = {
  veil: 0.06,
  left: 0.5,
  right: 0,
  bottom: 0.5,
  tint: 0,
};
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const fields = ["veil", "left", "right", "bottom", "tint"] as const;

/** One paused decoder, one page-wide playhead, no scroll-driven React state. */
export function GlobalScrollVideo({
  src,
  poster,
  scrub = 0.5,
  startTime = 0,
  endTime,
  objectPosition = "center",
  overlay,
  className = "",
  disabledOnMobile = false,
  fallbackMode = "poster",
  labels,
}: GlobalScrollVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 600px)");
  const disabled = reduced || (disabledOnMobile && mobile);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current!;
    const video = videoRef.current!;
    const playhead = { progress: 0 };
    let alive = true;
    let frame = 0;
    let refreshFrame = 0;
    let lastSeek = 0;
    let stops: { position: number; contrast: Contrast }[] = [];
    const base = overlay?.base ?? defaultContrast;
    const measure = () => {
      const distance = Math.max(1, ScrollTrigger.maxScroll(window));
      stops = [{ position: 0, contrast: base }];
      for (const scene of overlay?.scenes ?? []) {
        const element = document.querySelector(scene.selector);
        if (!element) continue;
        stops.push({
          position: clamp(
            (element.getBoundingClientRect().top +
              window.scrollY -
              window.innerHeight * 0.3) /
              distance,
          ),
          contrast: scene.contrast,
        });
      }
      stops.sort((a, b) => a.position - b.position);
    };
    const paintContrast = () => {
      let from = stops[0];
      let to = from;
      for (const stop of stops) {
        if (stop.position <= playhead.progress) from = stop;
        else {
          to = stop;
          break;
        }
        to = from;
      }
      if (!from) return;
      // Contrast changes in a short band around each incoming scene.
      const span = Math.min(
        0.045,
        Math.max(0.001, to.position - from.position),
      );
      const mix =
        from === to
          ? 0
          : clamp((playhead.progress - (to.position - span)) / span);
      const eased = mix * mix * (3 - 2 * mix);
      for (const field of fields)
        root.style.setProperty(
          `--film-${field}`,
          String(
            from.contrast[field] +
              (to.contrast[field] - from.contrast[field]) * eased,
          ),
        );
      root.style.setProperty("--film-progress", String(playhead.progress));
    };
    const bounds = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const end = Math.max(0, Math.min(endTime ?? duration, duration - 1 / 24));
      return { start: Math.max(0, Math.min(startTime, end)), end };
    };
    const render = (now: number) => {
      frame = 0;
      if (!alive) return;
      paintContrast();
      if (
        document.hidden ||
        video.readyState < 2 ||
        !Number.isFinite(video.duration)
      )
        return;
      if (disabled && fallbackMode === "poster" && poster && !posterFailed)
        return;
      const { start, end } = bounds();
      const target = disabled
        ? start
        : start + playhead.progress * (end - start);
      const threshold =
        playhead.progress === 0 || playhead.progress === 1 ? 0.001 : 0.008;
      if (Math.abs(video.currentTime - target) <= threshold || video.seeking)
        return;
      // Mobile gets at most 30 seek requests/sec. A seeked event always catches
      // up to the newest playhead; stale requests are never queued.
      if (mobile && now - lastSeek < 1000 / 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastSeek = now;
      video.currentTime = target;
    };
    const schedule = () => {
      if (alive && !frame) frame = requestAnimationFrame(render);
    };
    const pause = () => video.pause();
    const loaded = () => {
      setReady(true);
      setFailed(false);
      pause();
      schedule();
    };
    const error = () => setFailed(true);
    video.pause();
    video.addEventListener("play", pause);
    video.addEventListener("loadeddata", loaded);
    video.addEventListener("seeked", schedule);
    video.addEventListener("error", error);
    document.addEventListener("visibilitychange", schedule);
    if (video.readyState >= 2) loaded();
    const context = gsap.context(() => {
      measure();
      const trigger = {
        id: "global-scroll-video",
        start: 0,
        end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
          schedule();
        },
      };
      if (disabled) {
        ScrollTrigger.create({
          ...trigger,
          onUpdate: (self) => {
            playhead.progress = self.progress;
            schedule();
          },
        });
      } else {
        gsap.to(playhead, {
          progress: 1,
          ease: "none",
          onUpdate: schedule,
          scrollTrigger: { ...trigger, scrub: Math.max(0, scrub) },
        });
      }
    }, root);
    // Layout changes (service rows, fonts, orientation) change total page travel.
    let previousSize = "";
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const size = `${rect.width}:${rect.height}`;
      if (size === previousSize) return;
      previousSize = size;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.getElementById("root") ?? document.body);
    void document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    schedule();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(refreshFrame);
      observer.disconnect();
      context.revert();
      video.removeEventListener("play", pause);
      video.removeEventListener("loadeddata", loaded);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("error", error);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [
    src,
    scrub,
    startTime,
    endTime,
    overlay,
    disabled,
    mobile,
    fallbackMode,
    poster,
    posterFailed,
  ]);

  const showPoster =
    disabled && fallbackMode === "poster" && poster && !posterFailed;
  return (
    <div
      ref={rootRef}
      className={`global-film ${className}`}
      style={{ "--film-object-position": objectPosition } as CSSProperties}
    >
      {poster && !posterFailed && (
        <img
          className="global-film-poster"
          src={poster}
          alt=""
          fetchPriority="high"
          onError={() => setPosterFailed(true)}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={posterFailed ? undefined : poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className={`global-film-video ${ready && !failed && !showPoster ? "is-ready" : ""}`}
      />
      <div className="film-contrast" aria-hidden="true">
        <div className="film-veil" />
        <div className="film-left" />
        <div className="film-right" />
        <div className="film-bottom" />
        <div className="film-tint" />
      </div>
      {labels && (!ready || failed) && (
        <span className="film-status micro" role="status">
          {failed ? labels.error : labels.loading}
        </span>
      )}
    </div>
  );
}
