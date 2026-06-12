import { profile } from "../data/profile";
import { statement } from "../data/statement";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Statement() {
  return (
    <Section id="about" title="/about">
      <Reveal>
        <ul className="tag-row">
          {statement.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="statement">{statement.heading}</h2>
      </Reveal>
      <Reveal delay={240}>
        <p className="statement-bio">{statement.bio}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            write to me
          </a>
          <a
            className="btn"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            github ↗
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
