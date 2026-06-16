import { statement } from "../data/statement";
import { useT } from "../i18n/useLang";
import { MotionText } from "./MotionText";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Statement() {
  const t = useT();
  return (
    <Section id="about" num="01" title="about">
      <Reveal>
        <ul className="tag-row">
          {t(statement.tags).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </Reveal>
      <MotionText as="h3" className="statement" stagger={36} text={t(statement.heading)} />
      <MotionText as="p" className="statement-bio" stagger={10} text={t(statement.bio)} />
    </Section>
  );
}
