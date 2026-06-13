import { statement } from "../data/statement";
import { MotionText } from "./MotionText";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Statement() {
  return (
    <Section id="about" num="01" title="about">
      <Reveal>
        <ul className="tag-row">
          {statement.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Reveal>
      <MotionText as="h3" className="statement" stagger={36} text={statement.heading} />
      <MotionText as="p" className="statement-bio" stagger={10} text={statement.bio} />
    </Section>
  );
}
