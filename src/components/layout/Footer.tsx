import { siteConfig as site } from "../../content/site.config";
import { Arrow } from "../ui/Primitives";

export function Footer() {
  return (
    <footer className="footer page-pad">
      <div className="footer-top">
        <a href="#top" className="brand">
          {site.brand.name}
        </a>
        <span className="micro muted">{site.brand.tagline}</span>
        <a href="#top" className="back-top micro">
          {site.ui.backTop}
          <Arrow direction="up" />
        </a>
      </div>
      <div className="footer-bottom">
        <span className="micro muted">{site.brand.copyright}</span>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="social-links" aria-label={site.ui.socialNote}>
          {site.socials.map((social) =>
            social.href === "#" ? (
              <span
                key={social.label}
                aria-disabled="true"
                title={site.ui.socialNote}
              >
                {social.label}
                <span aria-hidden="true">↗</span>
              </span>
            ) : (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label} ↗
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
