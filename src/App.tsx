import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/hero/Hero";
import { Philosophy } from "./components/sections/Philosophy";
import { SelectedWork } from "./components/sections/SelectedWork";
import { Expertise } from "./components/sections/Expertise";
import { Manifesto } from "./components/sections/Manifesto";
import { ContactCTA } from "./components/sections/ContactCTA";
import { siteConfig } from "./content/site.config";
import { GlobalScrollVideo } from "./components/motion/GlobalScrollVideo";

// Composition is owned by this project, not by a universal page schema.
export default function App() {
  return (
    <>
      <GlobalScrollVideo
        {...siteConfig.scrollFilm}
        labels={{
          loading: siteConfig.ui.videoLoading,
          error: siteConfig.ui.videoError,
        }}
      />
      <a className="skip-link" href="#content">
        {siteConfig.ui.skip}
      </a>
      <div id="top-sentinel" />
      <Navbar />
      <main id="content" className="content-layer">
        <Hero />
        <Philosophy />
        <SelectedWork />
        <Expertise />
        <Manifesto />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
