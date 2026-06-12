import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
}

/** Types out phrases one by one, deleting between them. */
export function Typewriter({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 30,
  holdMs = 2200,
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];

    if (!deleting && text === phrase) {
      const hold = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      const advance = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, typeSpeed);
      return () => clearTimeout(advance);
    }

    const tick = setTimeout(
      () => {
        setText(
          deleting
            ? phrase.slice(0, text.length - 1)
            : phrase.slice(0, text.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(tick);
  }, [text, deleting, phraseIndex, phrases, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className="typewriter">
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
