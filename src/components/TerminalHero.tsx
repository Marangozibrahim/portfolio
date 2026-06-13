import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { projects } from "../data/projects";

const TYPE_MS = 52;
const OUT_DELAY_MS = 200;
const NEXT_DELAY_MS = 820;
const START_DELAY_MS = 1100; // wait for boot loader reveal

interface Entry {
  cmd: string;
  out: ReactNode;
}

// auto-typed intro script (inline hero only)
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

/* ----------------------------------------------------------------
   command engine — the set of commands the terminal accepts.
   Each returns a ReactNode (printed), or a control signal.
   ---------------------------------------------------------------- */

type Control = { clear: true } | { close: true };
type CmdResult = ReactNode | Control;

const isControl = (r: CmdResult): r is Control =>
  typeof r === "object" && r !== null && ("clear" in r || "close" in r);

interface Cmd {
  desc: string;
  run: (args: string[]) => CmdResult;
}

const COMMANDS: Record<string, Cmd> = {
  help: {
    desc: "list available commands",
    run: () => (
      <div className="term-grid">
        {Object.entries(COMMANDS).map(([name, c]) => (
          <p key={name}>
            <span className="k">{name.padEnd(11)}</span>
            <span className="term-faint">{c.desc}</span>
          </p>
        ))}
      </div>
    ),
  },
  whoami: {
    desc: "who is this",
    run: () => (
      <>
        <span className="k">{profile.name.toLowerCase()}</span> — {profile.role.toLowerCase()},{" "}
        {profile.location.toLowerCase()}
      </>
    ),
  },
  about: {
    desc: "short bio",
    run: () => <>{profile.tagline}</>,
  },
  skills: {
    desc: "tech i work with",
    run: () => (
      <div className="term-grid">
        {skills.map((g) => (
          <p key={g.label}>
            <span className="ok">{g.label.padEnd(13)}</span>
            {g.items.join(" · ")}
          </p>
        ))}
      </div>
    ),
  },
  stack: {
    desc: "core stack, short",
    run: () => <>python · fastapi · c#/.net · postgresql · redis · docker</>,
  },
  projects: {
    desc: "list projects",
    run: () => (
      <div className="term-grid">
        {projects.map((p) => (
          <p key={p.id}>
            <span className="k">{p.id.padEnd(28)}</span>
            <span className="term-faint">{p.period}</span>
          </p>
        ))}
        <p className="term-faint">→ open &lt;name&gt; for details</p>
      </div>
    ),
  },
  open: {
    desc: "open <project> details",
    run: (args) => {
      const id = args[0];
      if (!id) return <span className="term-err">usage: open &lt;project&gt;</span>;
      const p = projects.find((x) => x.id === id || x.id.startsWith(id));
      if (!p)
        return <span className="term-err">no project: {id}</span>;
      return (
        <div className="term-grid">
          <p>
            <span className="k">{p.name}</span>{" "}
            <span className="term-faint">— {p.period}</span>
          </p>
          <p>{p.summary}</p>
          {p.highlights.map((h, i) => (
            <p key={i} className="term-dim">
              · {h}
            </p>
          ))}
          <p className="ok">{p.stack.join(" · ")}</p>
        </div>
      );
    },
  },
  status: {
    desc: "availability",
    run: () => (
      <>
        <span className="ok">● available</span> — backend / full-stack roles,
        utc+3
      </>
    ),
  },
  contact: {
    desc: "how to reach me",
    run: () => (
      <div className="term-grid">
        <p>
          <span className="k">email </span>
          {profile.email}
        </p>
        <p>
          <span className="k">github</span> {profile.github}
        </p>
      </div>
    ),
  },
  email: {
    desc: "open mail client",
    run: () => {
      window.location.href = `mailto:${profile.email}`;
      return (
        <>
          opening mail → <span className="k">{profile.email}</span>
        </>
      );
    },
  },
  github: {
    desc: "open github profile",
    run: () => {
      window.open(profile.github, "_blank", "noreferrer");
      return (
        <>
          opening <span className="k">{profile.github}</span> ↗
        </>
      );
    },
  },
  education: {
    desc: "degree",
    run: () => (
      <>
        <span className="k">{profile.education.degree}</span> —{" "}
        {profile.education.school}, {profile.education.graduated}
      </>
    ),
  },
  ls: {
    desc: "list sections",
    run: () => <>about/ skills/ projects/ contact/ resume.pdf</>,
  },
  echo: {
    desc: "print text",
    run: (args) => <>{args.join(" ")}</>,
  },
  date: {
    desc: "current time",
    run: () => <>{new Date().toString()}</>,
  },
  sudo: {
    desc: "nice try",
    run: () => (
      <span className="term-err">
        marangoz is not in the sudoers file. this incident will be reported.
      </span>
    ),
  },
  clear: {
    desc: "clear the screen",
    run: () => ({ clear: true }),
  },
  exit: {
    desc: "close fullscreen",
    run: () => ({ close: true }),
  },
};

interface HistLine {
  id: number;
  cmd: string;
  out: ReactNode;
}

let lineId = 0;

const banner = (
  <div className="term-grid">
    <p>
      <span className="k">marangoz</span> interactive shell — type{" "}
      <span className="ok">help</span> for commands.
    </p>
  </div>
);

export function TerminalHero() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- inline intro typing animation ----
  const [started, setStarted] = useState(reduced);
  const [entry, setEntry] = useState(reduced ? entries.length : 0);
  const [chars, setChars] = useState(0);
  const [showOut, setShowOut] = useState(false);

  // ---- interactive state ----
  const [fullscreen, setFullscreen] = useState(false);
  const [history, setHistory] = useState<HistLine[]>([{ id: -1, cmd: "", out: banner }]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]); // command history for ↑/↓
  const [pastIdx, setPastIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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

  // ---- fullscreen side effects: lock scroll, focus, esc ----
  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focus = setTimeout(() => inputRef.current?.focus(), 360);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  // keep scrolled to bottom on new output
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, fullscreen]);

  const exec = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setHistory((h) => [...h, { id: lineId++, cmd: "", out: null }]);
      return;
    }
    setPast((p) => [...p, trimmed]);
    setPastIdx(-1);

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = COMMANDS[name.toLowerCase()];

    if (!cmd) {
      setHistory((h) => [
        ...h,
        {
          id: lineId++,
          cmd: trimmed,
          out: (
            <span className="term-err">
              command not found: {name}. type <span className="ok">help</span>.
            </span>
          ),
        },
      ]);
      return;
    }

    const result = cmd.run(args);
    if (isControl(result)) {
      if ("clear" in result) setHistory([]);
      if ("close" in result) setFullscreen(false);
      return;
    }
    setHistory((h) => [...h, { id: lineId++, cmd: trimmed, out: result }]);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!past.length) return;
      const next = pastIdx < 0 ? past.length - 1 : Math.max(0, pastIdx - 1);
      setPastIdx(next);
      setInput(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pastIdx < 0) return;
      const next = pastIdx + 1;
      if (next >= past.length) {
        setPastIdx(-1);
        setInput("");
      } else {
        setPastIdx(next);
        setInput(past[next]);
      }
    } else if (e.key === "Escape") {
      setFullscreen(false);
    }
  };

  // ---- inline (hero) terminal: click to expand ----
  const inline = (
    <div
      className="term term-clickable"
      role="button"
      tabIndex={0}
      aria-label="Open interactive terminal"
      onClick={() => setFullscreen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFullscreen(true);
        }
      }}
    >
      <div className="term-bar" aria-hidden="true">
        <span className="term-dot"></span>
        <span className="term-dot"></span>
        <span className="term-dot"></span>
        <span className="term-title">~/marangoz — bash</span>
        <span className="term-expand">click to expand ⤢</span>
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
          <p className="term-cmd term-hint">
            <span className="term-prompt">$ </span>
            <span className="term-faint">click anywhere to run commands</span>
            <span className="caret" aria-hidden="true"></span>
          </p>
        )}
      </div>
    </div>
  );

  // ---- fullscreen interactive terminal ----
  const full = fullscreen
    ? createPortal(
        <div
          className={`term-full${reduced ? "" : " term-full-anim"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          onMouseDown={() => inputRef.current?.focus()}
        >
          <div className="term-full-scan" aria-hidden="true" />
          <div className="term-full-inner">
            <div className="term-bar term-full-bar">
              <span className="term-dot"></span>
              <span className="term-dot"></span>
              <span className="term-dot"></span>
              <span className="term-title">marangoz@portfolio: ~ — zsh</span>
              <button
                className="term-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreen(false);
                }}
                aria-label="Close terminal (Esc)"
              >
                esc ✕
              </button>
            </div>
            <div className="term-body term-full-body" ref={bodyRef}>
              {history.map((l) => (
                <div className="term-entry" key={l.id}>
                  {l.cmd !== "" && (
                    <p className="term-cmd">
                      <span className="term-prompt">$ </span>
                      <span className="cmd-text">{l.cmd}</span>
                    </p>
                  )}
                  {l.out && <div className="term-output">{l.out}</div>}
                </div>
              ))}
              <p className="term-cmd term-inputline">
                <span className="term-prompt">$ </span>
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                />
              </p>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {inline}
      {full}
    </>
  );
}
