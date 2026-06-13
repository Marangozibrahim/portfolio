import { useEffect, useState, type ReactNode } from "react";

const TYPE_MS = 52;
const OUT_DELAY_MS = 200;
const NEXT_DELAY_MS = 820;
const START_DELAY_MS = 1100; // wait for boot loader reveal

interface Entry {
  cmd: string;
  out: ReactNode;
}

const entries: Entry[] = [
  {
    cmd: "whoami",
    out: (
      <>
        <span className="k">halil ibrahim marangoz</span> — backend engineer
      </>
    ),
  },
  {
    cmd: "cat stack.txt",
    out: <>python · fastapi · c#/.net · postgresql · redis · docker</>,
  },
  {
    cmd: "status --check",
    out: (
      <>
        <span className="ok">● available</span> — backend / full-stack roles,
        utc+3
      </>
    ),
  },
];

export function TerminalHero() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [started, setStarted] = useState(reduced);
  const [entry, setEntry] = useState(reduced ? entries.length : 0);
  const [chars, setChars] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), START_DELAY_MS);
    return () => clearTimeout(t);
  }, [started]);

  useEffect(() => {
    if (!started || entry >= entries.length) return;
    const full = entries[entry].cmd;

    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setShowOut(true), OUT_DELAY_MS);
    const t2 = setTimeout(() => {
      setEntry((e) => e + 1);
      setChars(0);
      setShowOut(false);
    }, NEXT_DELAY_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [started, entry, chars]);

  const allDone = entry >= entries.length;

  return (
    <div className="term" role="group" aria-label="Introduction terminal">
      <div className="term-bar" aria-hidden="true">
        <span className="term-dot"></span>
        <span className="term-dot"></span>
        <span className="term-dot"></span>
        <span className="term-title">~/marangoz — bash</span>
      </div>
      <div className="term-body">
        {entries.map((e, i) => {
          if (i > entry) return null;
          const isCurrent = i === entry;
          const typed = isCurrent ? e.cmd.slice(0, chars) : e.cmd;
          const outVisible = !isCurrent || showOut;
          return (
            <div className="term-entry" key={e.cmd}>
              <p className="term-cmd">
                <span className="term-prompt">$ </span>
                <span className="cmd-text">{typed}</span>
                {isCurrent && chars < e.cmd.length && (
                  <span className="caret" aria-hidden="true"></span>
                )}
              </p>
              {outVisible && <div className="term-output">{e.out}</div>}
            </div>
          );
        })}
        {allDone && (
          <p className="term-cmd">
            <span className="term-prompt">$ </span>
            <span className="caret" aria-hidden="true"></span>
          </p>
        )}
      </div>
    </div>
  );
}
