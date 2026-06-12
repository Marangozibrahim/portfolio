import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">
            <span className="path">{title}</span>
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
