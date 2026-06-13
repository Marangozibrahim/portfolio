import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" num="03" title="experience">
      <div className="xp-list">
        {experience.map((xp) => (
          <Reveal key={xp.title + xp.period}>
            <article className="xp-item">
              <div className="xp-head">
                <h3>{xp.title}</h3>
                <span className="xp-period">{xp.period}</span>
              </div>
              <p className="xp-org">{xp.company}</p>
              {xp.bullets.length > 0 && (
                <ul className="xp-bullets">
                  {xp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}

        <Reveal>
          <article className="xp-item">
            <div className="xp-head">
              <h3>{profile.education.degree}</h3>
              <span className="xp-period">
                graduated {profile.education.graduated}
              </span>
            </div>
            <p className="xp-org">{profile.education.school}</p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
