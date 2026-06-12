import { createElement, type ElementType } from "react";
import { useReveal } from "../hooks/useReveal";

interface MotionTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** Base delay in ms before the first word. */
  delay?: number;
  /** Stagger per word in ms. */
  stagger?: number;
}

/**
 * Masked word-by-word reveal on scroll into view.
 * Each word slides up from behind an overflow mask, staggered left to right.
 */
export function MotionText({
  children,
  as = "p",
  className = "",
  delay = 0,
  stagger = 28,
}: MotionTextProps) {
  const ref = useReveal<HTMLElement>();
  const words = children.split(" ");

  return createElement(
    as,
    { ref, className: `motion-text ${className}`.trim() },
    words.map((word, i) => (
      <span className="mt-mask" key={`${word}-${i}`}>
        <span
          className="mt-word"
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      </span>
    )),
  );
}
