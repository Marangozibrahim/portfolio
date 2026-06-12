import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { profile } from "../data/profile";

interface TermEntry {
  cmd: string;
  output: ReactNode;
}

const entries: TermEntry[] = [
  {
    cmd: "whoami",
    output: (
      <>
        <p className="term-name">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="accent">{profile.name.split(" ").at(-1)}</span>
        </p>
        <p className="term-sub">
          {profile.role.toLowerCase()} · {profile.location.toLowerCase()}
        </p>
      </>
    ),
  },
  {
    cmd: "cat role.txt",
    output: <p className="term-out-text">{profile.tagline}</p>,
  },
  {
    cmd: "status --check",
    output: (
      <p className="term-status">
        <span className="dot" aria-hidden="true" />
        open to work
      </p>
    ),
  },
];

const TYPE_MS = 55;
const OUTPUT_PAUSE_MS = 450;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TerminalHero() {
  // stage n = typing entry n's command; output shows once fully typed
  const [stage, setStage] = useState(() =>
    prefersReducedMotion() ? entries.length : 0,
  );
  const [typed, setTyped] = useState(() =>
    prefersReducedMotion() ? Infinity : 0,
  );

  useEffect(() => {
    if (stage >= entries.length) return;
    const cmd = entries[stage].cmd;

    if (typed < cmd.length) {
      const t = setTimeout(() => setTyped((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setStage((s) => s + 1);
      setTyped(0);
    }, OUTPUT_PAUSE_MS);
    return () => clearTimeout(t);
  }, [stage, typed]);

  const finished = stage >= entries.length;

  return (
    <div className="term" role="group" aria-label="Introduction terminal">
      <div className="term-bar" aria-hidden="true">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">~/marangoz — bash</span>
      </div>
      <div className="term-body">
        {entries.map((entry, i) => {
          if (i > stage) return null;
          const isTyping = i === stage;
          const cmdText = isTyping ? entry.cmd.slice(0, typed) : entry.cmd;
          const cmdDone = !isTyping || typed >= entry.cmd.length;
          return (
            <div key={entry.cmd} className="term-entry">
              <p className="term-cmd">
                <span className="term-prompt">$ </span>
                {cmdText}
                {isTyping && !cmdDone && (
                  <span className="caret" aria-hidden="true" />
                )}
              </p>
              {cmdDone && <div className="term-output">{entry.output}</div>}
            </div>
          );
        })}
        {finished && (
          <p className="term-cmd">
            <span className="term-prompt">$ </span>
            <span className="caret" aria-hidden="true" />
          </p>
        )}
      </div>
    </div>
  );
}
