import { projects } from "../data/projects";
import type { Project } from "../types";
import { useT } from "../i18n/useLang";
import { ui } from "../data/ui";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useT();
  const num = String(index + 1).padStart(2, "0");
  const meta = [
    ...project.stack.slice(0, 2),
    project.role ? t(project.role) : undefined,
  ].filter(Boolean);

  return (
    <Reveal>
      <article className="project-card">
        <span className="project-num" aria-hidden="true">
          {num}
        </span>
        <div className="project-meta">
          {meta.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
        <div className="project-head">
          <h3>
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          <span className="project-period">{project.period}</span>
        </div>
        <p className="project-summary">{t(project.summary)}</p>
        <ul className="project-highlights">
          {t(project.highlights).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="project-foot">
          <div className="stack-tags">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          {project.repoUrl && (
            <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">
              {t(ui.projects.viewSource)}
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" num="02" title="projects">
      <div className="project-list">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
