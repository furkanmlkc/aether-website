import { useRef, useState, type AnchorHTMLAttributes } from "react";

export function Arrow({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "down" | "up";
}) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{index}</span>
      <span className="label-rule" />
      <span>{children}</span>
    </p>
  );
}

export function ArrowLink({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className={`arrow-link ${className}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function MagneticButton({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      {...props}
      ref={ref}
      className={`magnetic-button ${className}`}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        ref.current!.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.08}px ${(event.clientY - rect.top - rect.height / 2) * 0.1}px`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.translate = "0px 0px";
      }}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function Media({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media ${className}`}>
      {failed ? (
        <div className="media-fallback" role="img" aria-label={alt}>
          <span aria-hidden="true">F°</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
