import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" num="05" title="contact">
      <Reveal>
        <p className="contact-text">
          Open to backend and full-stack roles. If you're building something
          interesting — or just want to talk systems — my inbox is open.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-links">
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
