import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="/experience">
      {experience.map((xp, i) => (
        <Reveal key={`${xp.company}-${xp.period}`} delay={i * 130}>
          <article className="xp-item">
            <div className="xp-head">
              <h3>{xp.title}</h3>
              <p className="xp-meta">
                {xp.company} · {xp.period}
              </p>
            </div>
            <ul className="xp-bullets">
              {xp.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
      <Reveal delay={experience.length * 130}>
        <article className="xp-item" style={{ marginTop: 40 }}>
          <div className="xp-head">
            <h3>{profile.education.degree}</h3>
            <p className="xp-meta">
              {profile.education.school} · graduated{" "}
              {profile.education.graduated}
            </p>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
