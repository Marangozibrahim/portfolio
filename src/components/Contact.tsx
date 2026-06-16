import { profile } from "../data/profile";
import { ui } from "../data/ui";
import { useT } from "../i18n/useLang";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  const t = useT();
  return (
    <Section id="contact" num="05" title="contact">
      <Reveal>
        <p className="contact-text">{t(ui.contact.text)}</p>
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
