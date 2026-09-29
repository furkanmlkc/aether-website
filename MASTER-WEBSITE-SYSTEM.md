# MASTER WEBSITE SYSTEM

Project 001 is FRAME°, an editorial creative-studio site. The foundation is a collection of small capabilities, **not a configurable universal page template**.

**Do not reuse visual composition blindly. Reuse systems, not finished page layouts.**

## Architecture and ownership

| Location                     | Responsibility                                            | Reuse policy                                                |
| ---------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `src/App.tsx`                | Explicit composition of Project 001                       | Replace for a different brief                               |
| `src/content/site.config.ts` | Copy, navigation, projects, services, contact and socials | Reuse the configuration pattern, not its section schema     |
| `src/styles/tokens.css`      | Color, typography, spacing, motion easing                 | Keep token roles; choose new values per visual direction    |
| `src/styles/globals.css`     | Base styles and this project's composition                | Share reset/accessibility rules; redesign project selectors |
| `src/components/ui/`         | Dialog, media, arrows, section label and magnetic link    | Recombine as needed                                         |
| `src/hooks/`                 | Media queries and reduced-motion preference               | Shared behavior                                             |
| `src/motion/`                | Scoped GSAP lifecycle and reveal helper                   | Shared infrastructure                                       |
| `src/components/hero/`       | Project-owned hero typography and art direction           | Separate media behavior from layout                         |
| `src/components/layout/`     | Current transparent navbar, fullscreen menu, footer       | Current variants; no prescribed default                     |
| `src/components/sections/`   | Studio-specific editorial sections                        | Examples, never mandatory slots                             |

## Content and assets

All editable on-page copy belongs in `site.config.ts`. The `Project` type describes only this studio's project data. A villa or network portfolio should define its own content types and composition. Document metadata is in `index.html`.

The supplied 10-second MP4 is `public/media/hero.mp4`; its locally extracted poster is `hero-poster.webp`. Project images are small, original local SVG concept placeholders, explicitly presented as independent studies, not claimed client work. Swap the media paths for WebP/AVIF assets when available. The media primitive lazily loads and offers an accessible fallback.

Inter Tight is self-hosted under `public/fonts/`, with its OFL license. Demo contact is `hello@frame.studio`. Social `#` entries intentionally render as non-interactive labels until valid profile URLs are supplied.

## Adding motion

### Persistent scroll-film primitive

`src/components/motion/GlobalScrollVideo.tsx` is independent of FRAME. Mount it once beside the content layer, before the navbar. It supports `src`, `poster`, `scrub` (default 0.5 seconds), `startTime`, `endTime`, `objectPosition`, `overlay`, `className`, `disabledOnMobile`, `fallbackMode` (`poster` or `first-frame`) and optional status labels. Use stable configuration objects so ordinary parent renders do not rebuild the controller.

There is exactly one `global-scroll-video` ScrollTrigger. Its range is the entire scrollable document, not a hero or wheel delta. GSAP smooths a plain-object virtual progress value; a coalesced animation-frame callback seeks only when the decoder is free. `seeked` catches up to the newest value, never a queue of old targets. A small seek threshold prevents noise; endpoints settle exactly. Video remains paused and never loops. The final target is capped one 24fps frame before media duration.

The controller cleans up its GSAP context, animation frames, events and ResizeObserver. Changes to page height, viewport size, font loading and expanded service rows refresh the range. Mobile caps seek requests at 30Hz. Reduced motion uses a static poster; a first-frame fallback is available. There is deliberately no autoplay fallback.

`site.config.ts → scrollFilm` owns this project's crop, smoothing and contrast cues. `overlay.base` and optional `overlay.scenes` describe veil/left/right/bottom/tint opacity values from 0 to 1. Scene selectors are resolved against actual section positions; opacity transitions are interpolated near their boundaries. The component has no FRAME selectors or copy. A different site's composition can supply entirely different cues.

`src/styles/cinematic.css` is Project 001's transparent composition: 120/120/200/140/120/120svh minimum section lengths with content-driven expansion, selective project panels and a final dark footer. The global film is fixed at z-index 0, its contrast layers at 1 within that context, content at 2, and navigation above it. Timeline proportions follow actual layout; they are not hardcoded section percentages.

### Seeking asset

The original `public/media/hero.mp4` is preserved. `hero-scroll.mp4` is a 1280×720, 10-second H.264/yuv420p file, 24fps, with an I-frame every 0.5 seconds, no audio and faststart metadata. It is approximately 3.3MB. Verified I-frame timestamps begin 0, 0.5, 1.0, 1.5 seconds. FFmpeg is a temporary authoring tool, not an application dependency.

Recreate with:

```sh
ffmpeg -i public/media/hero.mp4 -an -c:v libx264 -pix_fmt yuv420p -r 24 -g 12 -keyint_min 12 -sc_threshold 0 -crf 19 -preset medium -movflags +faststart public/media/hero-scroll.mp4
```

Serve MP4s with byte-range support. Real-device iOS/Android decoding still depends on device hardware; use `disabledOnMobile` plus the poster when a target device cannot seek smoothly.

Use `useMotion(ref, stableSetupFunction)`, with setup declared outside the component or memoized. All GSAP selectors must remain scoped to the owning root. The helper creates/reverts a `gsap.context()` on mount, preference change and unmount. Add named utilities in `src/motion/` only after a second real use case appears.

Use transforms and opacity. Do not animate React state per frame. Refresh ScrollTrigger after content height changes. Media preference changes revert the active scene and leave content immediately visible. New scenes must provide the same cleanup and reduced-motion behavior. Avoid hiding readable content in base CSS while waiting for JavaScript animation.

## Adding variants

- **Navigation:** add a distinct `components/layout/navigation/CenteredNav.tsx` (or appropriate name). Keep focus handling and scroll locking in the shared dialog behavior. Do not add many boolean style switches to the current navbar.
- **Hero:** add a separate composition such as `components/hero/SplitHero.tsx`. Reuse `GlobalScrollVideo` at the app root for a continuous film; never mount another video in each section. Do not force every hero to accept this project's headline layout.
- **Sections:** add only sections needed by the new brief, then compose them directly in `App.tsx`. A gallery, horizontal scene or property specification table need not conform to studio-section props.
- **Styles:** when another project or multiple variants actually exist, extract their rules into dedicated files or CSS modules. Do not create unused variants or a package framework in advance.

## Quality contract

1. Art-direct desktop and mobile independently; inspect the human subject's crop.
2. Verify 1920, 1440, 1366, 1024, 768, 430 and 390px widths, with no horizontal overflow.
3. Provide semantic headings, visible focus, keyboard access, Escape-to-close and focus restoration for dialogs; lock background scrolling.
4. Keep the global scroll video paused at all times. Stop seeks in hidden tabs, honor reduced motion, preserve poster fallback and avoid a loading gate for the page.
5. Keep assets local, lazy-load below-fold media, avoid unnecessary dependencies, and run `npm run build` before delivery.
6. Keep social/contact placeholders honest. Never invent metrics, testimonials, client relationships or social profiles.

The reusable output is the quality contract, responsive practices, motion lifecycle, tokens and primitives. Hero placement, navigation composition, typography hierarchy, section order and visual identity remain creative decisions for each project.
