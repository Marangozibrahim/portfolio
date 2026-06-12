import { projects } from "../data/projects";
import type { Project } from "../types";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <ul className="tag-row tag-row-sm">
        {project.stack.slice(0, 3).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="project-head">
        <h3>{project.name}</h3>
        <span className="project-period">{project.period}</span>
      </div>
      {project.role && <p className="project-role">{project.role}</p>}
      <p className="project-summary">{project.summary}</p>
      <ul className="project-highlights">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="stack-tags">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {project.repoUrl && (
        <div className="project-links">
          <a
            className="btn"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            view source
          </a>
        </div>
      )}
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="/projects">
      <div className="project-list">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 130} className="plus-corners">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
