# AETHER — Scroll film

A minimal Next.js / React landing page with GSAP ScrollTrigger. Uses the supplied real film at `public/sequence.mp4` (10.005 seconds, 1280 × 720).

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`. Run `npm run typecheck` for TypeScript validation.

## Experience

- The 400svh section pins a viewport-height stage for 300svh of travel. ScrollTrigger maps this travel to the entire video duration.
- Playback is always paused. There is no autoplay, loop, or native controls. A time-based animation loop interpolates the scroll position and seeks the video, allowing only one outstanding seek. It sleeps when the frame catches up.
- The server-rendered video requests metadata, then requests frame data on mount. Loading and retry states handle unavailable media.
- Reduced-motion preference keeps the first video frame static, disables animated navigation, and preserves scroll access to the closing content.
- The closing CTA intentionally returns to the beginning only when clicked.
- Video is rendered with `object-fit: cover`; narrower viewports crop the edges while preserving the aspect ratio.

## Customize

Copy and markup: `src/components/scroll-experience.tsx`. Colors, typography, and responsive styles: `src/app/globals.css`. Metadata: `src/app/layout.tsx`.

The original supplied MP4 is preserved without transcoding. For longer or higher-resolution future films, use a fast-start MP4 with frequent keyframes to reduce random-seek decoding costs. The hosting server should support byte-range requests. Google Fonts provides optional Manrope and DM Sans with local system fallbacks.
