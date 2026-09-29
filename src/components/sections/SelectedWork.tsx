import { useRef, useState } from "react";
import { siteConfig as site, type Project } from "../../content/site.config";
import { revealChildren, useMotion } from "../../motion/useMotion";
import { Arrow, Media, SectionLabel } from "../ui/Primitives";
import { Dialog } from "../ui/Dialog";

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  useMotion(ref, revealChildren);
  return (
    <section
      ref={ref}
      id="work"
      className="work page-pad"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <SectionLabel index={site.work.index}>{site.work.label}</SectionLabel>
        <span className="micro muted">{site.work.note}</span>
      </div>
      <div className="work-intro" data-reveal>
        <h2 id="work-title" className="section-title">
          {site.work.title}
        </h2>
        <p>{site.work.description}</p>
      </div>
      <div className="project-list">
        {site.projects.map((project) => (
          <article
            className={`project project--${project.layout}`}
            key={project.id}
            data-reveal
          >
            <button
              className="project-button"
              onClick={() => setSelected(project)}
              aria-label={`${site.ui.viewProject}: ${project.title}`}
            >
              <Media src={project.media} alt={project.alt} />
              <span className="project-tag micro">{project.category}</span>
              <span className="project-open">
                <Arrow />
              </span>
            </button>
            <div className="project-caption">
              <span className="micro muted">/{project.id}</span>
              <h3>
                <button onClick={() => setSelected(project)}>
                  {project.title}
                </button>
              </h3>
              <span className="micro muted">{project.year}</span>
            </div>
          </article>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        labelledBy="project-title"
        className="project-dialog"
      >
        {selected && (
          <div className="project-detail">
            <div className="detail-top micro">
              <span>{site.ui.projectType}</span>
              <button
                className="close-button"
                aria-label={site.ui.projectClose}
                onClick={() => setSelected(null)}
              >
                {site.ui.close}
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <Media src={selected.media} alt={selected.alt} />
            <div className="detail-copy">
              <SectionLabel index={selected.id}>
                {selected.category}
              </SectionLabel>
              <h2 id="project-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <ul>
                {selected.disciplines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
