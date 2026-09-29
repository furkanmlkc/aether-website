# FRAME° — Project 001

A cinematic creative-studio website and the first foundation of a reusable creative website system. Built with React, TypeScript, Vite, GSAP and ScrollTrigger.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3001. The port is strict, so an occupied port produces a clear error instead of silently selecting another one.

```sh
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build at port 3001. Stop the development server before starting it. Deploy the `dist` directory to a static host.

## Editing

- Copy, navigation, project data and demo contact: `src/content/site.config.ts`
- Tokens: `src/styles/tokens.css`
- Page composition: `src/App.tsx`
- Shared behavior and primitives: `src/motion`, `src/hooks`, `src/components/ui`
- Architecture guide: `MASTER-WEBSITE-SYSTEM.md`

The unchanged source is `public/media/hero.mp4`. The page uses the optimized `public/media/hero-scroll.mp4` through one persistent `GlobalScrollVideo` at the app root. Total document scroll maps to 0 through duration minus one frame, with GSAP scrub 0.5. The video always stays paused: no autoplay, looping or section-specific players. Transparent sections and changing directional contrast reveal one continuous film. Reduced motion displays the poster; mobile caps seek requests at 30 per second.

The three work images are original local SVG placeholders for clearly labeled independent concept studies. The contact address is a demo placeholder. Social profiles are inactive until configured. No backend or form submission service is claimed.

Inter Tight is self-hosted with its OFL license. No external font or stock-media requests occur at runtime.
