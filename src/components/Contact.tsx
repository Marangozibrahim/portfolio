import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="/contact">
      <Reveal delay={100}>
        <p className="contact-text">
          Open to backend and full-stack roles. If you're building something
          interesting, let's talk.
        </p>
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a
            className="btn"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
