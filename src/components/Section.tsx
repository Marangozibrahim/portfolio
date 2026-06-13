import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, num, title, children }: SectionProps) {
  return (
    <section className="section container" id={id}>
      <Reveal>
        <header className="sec-head">
          <span className="sec-num">{num}</span>
          <h2 className="sec-title">
            <span className="path">/{title}</span>
          </h2>
          <span className="sec-rule" aria-hidden="true"></span>
        </header>
      </Reveal>
      {children}
    </section>
  );
}
