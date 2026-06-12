import { profile } from "../data/profile";
import { MotionText } from "./MotionText";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="/contact">
      <MotionText className="contact-text" stagger={18}>
        Open to backend and full-stack roles. If you're building something
        interesting, let's talk.
      </MotionText>
      <Reveal delay={150}>
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
