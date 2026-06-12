import { profile } from "../data/profile";
import { statement } from "../data/statement";
import { MotionText } from "./MotionText";
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
      <MotionText as="h2" className="statement" delay={100} stagger={40}>
        {statement.heading}
      </MotionText>
      <MotionText className="statement-bio" delay={150} stagger={14}>
        {statement.bio}
      </MotionText>
      <Reveal delay={300}>
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
