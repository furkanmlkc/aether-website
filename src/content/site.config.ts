import type { GlobalScrollVideoProps } from "../components/motion/GlobalScrollVideo";

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  media: string;
  alt: string;
  layout: "wide" | "offset" | "immersive";
  description: string;
  disciplines: string[];
};

export const siteConfig = {
  scrollFilm: {
    src: "/media/hero-scroll.mp4",
    poster: "/media/hero-poster.webp",
    scrub: 0.5,
    startTime: 0,
    objectPosition: "55% center",
    disabledOnMobile: false,
    fallbackMode: "poster",
    overlay: {
      base: { veil: 0.04, left: 0.5, right: 0, bottom: 0.55, tint: 0 },
      scenes: [
        {
          selector: "#about",
          contrast: {
            veil: 0.15,
            left: 0.7,
            right: 0.12,
            bottom: 0.5,
            tint: 0,
          },
        },
        {
          selector: "#work",
          contrast: {
            veil: 0.12,
            left: 0.6,
            right: 0.1,
            bottom: 0.55,
            tint: 0,
          },
        },
        {
          selector: "#expertise",
          contrast: {
            veil: 0.17,
            left: 0.78,
            right: 0.05,
            bottom: 0.5,
            tint: 0,
          },
        },
        {
          selector: ".manifesto",
          contrast: {
            veil: 0.32,
            left: 0.55,
            right: 0.1,
            bottom: 0.55,
            tint: 0,
          },
        },
        {
          selector: "#contact",
          contrast: {
            veil: 0.15,
            left: 0.7,
            right: 0.1,
            bottom: 0.65,
            tint: 0.12,
          },
        },
        {
          selector: ".footer",
          contrast: { veil: 0.35, left: 0.7, right: 0.2, bottom: 0.8, tint: 0 },
        },
      ],
    },
  } satisfies GlobalScrollVideoProps,
  brand: {
    name: "FRAME°",
    tagline: "Independent digital studio",
    copyright: "© 2026 FRAME°",
    edition: "PROJECT 001 — STUDIO EDITION",
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  ui: {
    projectCTA: "Start a project",
    close: "Close",
    menu: "Menu",
    backTop: "Back to top",
    viewProject: "Explore study",
    menuTitle: "Explore FRAME°",
    skip: "Skip to content",
    projectType: "Independent concept study",
    videoLoading: "Loading film",
    videoError: "Film unavailable — still image displayed",
    projectClose: "Close project",
    socialNote: "Social profiles coming soon",
  },
  hero: {
    eyebrow: "Independent minds. Unexpected outcomes.",
    title: ["WE CREATE", "DIGITAL EXPERIENCES", "THAT MOVE."],
    metadata: "Design · Motion · Technology",
    aside: ["A different perspective.", "A lasting impression."],
    scroll: "Scroll to explore",
    index: "01 / 06",
  },
  philosophy: {
    label: "Philosophy",
    index: "02",
    kicker: "BEYOND THE SCREEN.",
    lines: ["WE DON’T", "DESIGN PAGES.", "WE DESIGN", "EXPERIENCES."],
    body: "We bring ideas into focus. Blending considered design, expressive motion and creative technology to make the digital feel something more.",
    note: "A point of view. Not a formula.",
  },
  work: {
    label: "Selected work",
    index: "03",
    title: "A few different\nways to feel.",
    note: "EXPLORATIONS / 2026",
    description:
      "Three independent concept studies. An ongoing exploration of what comes next.",
  },
  projects: [
    {
      id: "01",
      title: "NEURAL",
      category: "AI EXPERIENCE",
      year: "2026",
      media: "/media/projects/project-01.svg",
      alt: "An abstract orange orbital form on a dark field",
      layout: "wide",
      description:
        "An exploration of synthetic perception. Light, space and generative thinking come together in an imagined digital world.",
      disciplines: ["Art direction", "AI exploration", "Digital experience"],
    },
    {
      id: "02",
      title: "SYNTHETIC",
      category: "DIGITAL IDENTITY",
      year: "2026",
      media: "/media/projects/project-02.svg",
      alt: "A sculptural folded metallic ribbon on a warm neutral ground",
      layout: "offset",
      description:
        "An identity without a fixed shape. A study in the tension between an engineered structure and a fluid, human expression.",
      disciplines: ["Visual identity", "3D direction", "Typography"],
    },
    {
      id: "03",
      title: "MOTION SYSTEM",
      category: "INTERACTIVE EXPERIENCE",
      year: "2026",
      media: "/media/projects/project-03.svg",
      alt: "Perspective lines forming a precise architectural tunnel",
      layout: "immersive",
      description:
        "A visual language built from rhythm. An interaction study that turns a simple grid into a feeling of depth, movement and possibility.",
      disciplines: [
        "Creative development",
        "Motion system",
        "Interaction design",
      ],
    },
  ] satisfies Project[],
  expertise: {
    label: "Expertise",
    index: "04",
    title: "Different disciplines.\nOne shared instinct.",
    description:
      "From the first spark to the final interaction. We connect the pieces that make an experience unmistakable.",
    services: [
      {
        title: "Creative Direction",
        description:
          "A clear point of view. Concepts, narratives and art direction that give every decision a reason.",
      },
      {
        title: "Web Design",
        description:
          "Expressive digital spaces with deliberate typography, intuitive journeys and responsive compositions.",
      },
      {
        title: "Creative Development",
        description:
          "Design brought to life through performant interfaces, purposeful interactions and thoughtful engineering.",
      },
      {
        title: "Motion Design",
        description:
          "Choreography for the screen. Transitions, rhythm and movement that communicate as much as the words.",
      },
      {
        title: "AI Visuals",
        description:
          "Art-directed experiments in synthetic imagery, guided by a human point of view.",
      },
      {
        title: "3D Experiences",
        description:
          "Dimensional worlds, sculptural objects and spatial ideas that move beyond the flat screen.",
      },
      {
        title: "Interactive Experiences",
        description:
          "Responsive stories that invite people to participate, explore and discover.",
      },
    ],
  },
  manifesto: {
    label: "Our approach",
    index: "05",
    lines: ["DESIGN.", "MOTION.", "TECHNOLOGY."],
    closing: ["ONE", "EXPERIENCE."],
    note: "NO SILOS. NO SEAMS. JUST FEELING.",
  },
  contact: {
    label: "Have a project?",
    index: "06",
    lines: ["LET’S CREATE", "SOMETHING", "UNFORGETTABLE."],
    body: "An idea, a question, a possibility.\nEvery good experience starts with a conversation.",
    email: "hello@frame.studio",
    href: "mailto:hello@frame.studio",
    note: "OPEN TO WHAT’S NEXT.",
  },
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};
