import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { buildSections } from "../data/sections";
import { pick, useLang } from "../i18n/useLang";
import type { Lang } from "../types";

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

/**
 * Builds the command registry for the active language. Content is pulled live
 * from the localized data layer via `pick(..., lang)`. Command names and the
 * shell verbs (help/ls/cat) stay English — they're a fixed UNIX-style API.
 */
function buildCommands(lang: Lang): Record<string, Cmd> {
  const sections = buildSections(lang);
  const FILES = Object.keys(sections) as (keyof typeof sections)[];

  const commands: Record<string, Cmd> = {
    help: {
      desc: "list available commands",
      run: () => (
        <div className="term-grid">
          {Object.entries(commands).map(([name, c]) => (
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
          <span className="k">{profile.name.toLowerCase()}</span> —{" "}
          {pick(profile.role, lang).toLowerCase()},{" "}
          {pick(profile.location, lang).toLowerCase()}
        </>
      ),
    },
    about: {
      desc: "short bio",
      run: () => <>{pick(profile.tagline, lang)}</>,
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
        </div>
      ),
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
            <span className="k">email   </span>
            {profile.email}
          </p>
          <p>
            <span className="k">github  </span> {profile.github}
          </p>
          <p>
            <span className="k">linkedin</span> {profile.linkedin}
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
    linkedin: {
      desc: "open linkedin profile",
      run: () => {
        window.open(profile.linkedin, "_blank", "noreferrer");
        return (
          <>
            opening <span className="k">{profile.linkedin}</span> ↗
          </>
        );
      },
    },
    education: {
      desc: "degree",
      run: () => (
        <>
          <span className="k">{pick(profile.education.degree, lang)}</span> —{" "}
          {profile.education.school}, {pick(profile.education.graduated, lang)}
        </>
      ),
    },
    ls: {
      desc: "list files",
      run: () => <>{FILES.join("  ")}</>,
    },
    cat: {
      desc: "print <file> contents",
      run: (args) => {
        const arg = args[0];
        if (!arg)
          return (
            <span className="term-err">
              usage: cat &lt;file&gt; — {FILES.join(" · ")}
            </span>
          );
        const key = arg as keyof typeof sections;
        if (!FILES.includes(key))
          return (
            <span className="term-err">
              cat: {arg}: no such file. try {FILES.join(" · ")}
            </span>
          );
        return (
          <pre className="term-json">
            {JSON.stringify(sections[key], null, 2)}
          </pre>
        );
      },
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

  return commands;
}

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
  const { lang } = useLang();
  const commands = useMemo(() => buildCommands(lang), [lang]);
  const files = useMemo(() => Object.keys(buildSections(lang)), [lang]);

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
    const cmd = commands[name.toLowerCase()];

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
  }, [commands]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const [name, ...rest] = input.split(/\s+/);
      // completing the command token, or `cat`/`ls`'s file argument
      const pool =
        rest.length === 0
          ? Object.keys(commands)
          : name === "cat" || name === "ls"
            ? [...files]
            : [];
      const frag = rest.length === 0 ? name : rest[rest.length - 1];
      const hits = pool.filter((c) => c.startsWith(frag));

      if (hits.length === 1) {
        setInput(rest.length === 0 ? `${hits[0]} ` : `${name} ${hits[0]} `);
      } else if (hits.length > 1) {
        // extend to the longest common prefix, then echo the options
        const lcp = hits.reduce((a, b) => {
          let i = 0;
          while (i < a.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        setInput(rest.length === 0 ? lcp : `${name} ${lcp}`);
        setHistory((h) => [
          ...h,
          { id: lineId++, cmd: input, out: <>{hits.join("  ")}</> },
        ]);
      }
      return;
    }

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
          data-lenis-prevent
          onMouseDown={(e) => {
            // click on the backdrop (outside the window) closes
            if (e.target === e.currentTarget) {
              setFullscreen(false);
              return;
            }
            // click anywhere inside jumps to the input. preventDefault keeps
            // the click from stealing focus away to the (non-focusable) target
            if (e.target !== inputRef.current) {
              e.preventDefault();
              inputRef.current?.focus();
            }
          }}
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
