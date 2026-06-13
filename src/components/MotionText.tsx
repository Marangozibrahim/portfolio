import { createElement, type CSSProperties, type ElementType } from "react";
import { useReveal } from "../hooks/useReveal";

interface MotionTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each word's entrance */
  stagger?: number;
}

/** Word-by-word masked rise animation, triggered on reveal. */
export function MotionText({
  text,
  as = "p",
  className = "",
  stagger = 30,
}: MotionTextProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const words = text.trim().split(/\s+/);

  return createElement(
    as,
    {
      ref,
      className: `motion-text${visible ? " is-visible" : ""}${className ? " " + className : ""}`,
    },
    words.map((w, i) => (
      <span className="mt-mask" key={i}>
        <span
          className="mt-word"
          style={{ "--d": `${i * stagger}ms` } as CSSProperties}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </span>
      </span>
    ))
  );
}
