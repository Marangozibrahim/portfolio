import { skills } from "../data/skills";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" num="04" title="skills">
      <Reveal>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div
              className="skill-row"
              key={group.label}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              <span className="skill-key">{group.label}</span>
              <div className="skill-items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
