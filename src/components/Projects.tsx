import { projects } from "../data/projects";
import type { Project } from "../types";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
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
        <p className="project-links">
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            source →
          </a>
        </p>
      )}
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="/projects">
      <div className="project-list">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 130}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
