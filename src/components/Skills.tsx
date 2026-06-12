import { skills } from "../data/skills";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="/skills">
      <Reveal>
        <div className="skills-block" role="img" aria-label="Skills overview">
          <div className="brace">{"{"}</div>
          {skills.map((group, i) => (
            <div
              key={group.label}
              className="skills-row"
              style={{ transitionDelay: `${200 + i * 140}ms` }}
            >
              <span className="skills-key">"{group.label}"</span>
              <span className="skills-punct">: [</span>
              <span className="skills-val">
                {group.items.map((item, j) => (
                  <span key={item}>
                    "{item}"
                    {j < group.items.length - 1 && (
                      <span className="skills-punct">, </span>
                    )}
                  </span>
                ))}
              </span>
              <span className="skills-punct">
                ]{i < skills.length - 1 ? "," : ""}
              </span>
            </div>
          ))}
          <div className="brace">{"}"}</div>
        </div>
      </Reveal>
    </Section>
  );
}
