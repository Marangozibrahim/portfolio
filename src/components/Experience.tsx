import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { ui } from "../data/ui";
import { useT } from "../i18n/useLang";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  const t = useT();
  return (
    <Section id="experience" num="03" title="experience">
      <div className="xp-list">
        {experience.map((xp) => {
          const bullets = t(xp.bullets);
          return (
            <Reveal key={xp.company + xp.period}>
              <article className="xp-item">
                <div className="xp-head">
                  <h3>{t(xp.title)}</h3>
                  <span className="xp-period">{xp.period}</span>
                </div>
                <p className="xp-org">{xp.company}</p>
                {bullets.length > 0 && (
                  <ul className="xp-bullets">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}

        <Reveal>
          <article className="xp-item">
            <div className="xp-head">
              <h3>{t(profile.education.degree)}</h3>
              <span className="xp-period">
                {t(ui.experience.graduated)} {t(profile.education.graduated)}
              </span>
            </div>
            <p className="xp-org">{profile.education.school}</p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
