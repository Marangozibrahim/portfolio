# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Halil Ibrahim Marangoz (backend engineer). React 19 + TypeScript + Vite, single page, no router, no backend. Deployed as static files.

## Commands

```sh
npm run dev       # dev server at localhost:5173 (HMR)
npm run build     # tsc -b && vite build → dist/
npm run lint      # eslint (zero-warning expectation; build must pass tsc strict)
npm run preview   # serve production build locally
```

No test suite exists.

## Architecture

**Content lives in `src/data/`, never in components.** `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `statement.ts` hold all CV content, typed by interfaces in `src/types.ts` (statement is self-typed). To update site text/projects/skills, edit data files only — components render whatever the data layer provides. Exception: the terminal hero owns its own scripts in `TerminalHero.tsx` — the auto-typed intro (`entries` array) and the interactive command set (`COMMANDS` map). `COMMANDS` pulls live content from `profile`/`skills`/`projects`, so adding a command or section there is the place to extend the terminal. `src/data/sections.json` (imported, needs `resolveJsonModule`) is a separate `name → content` map that backs the terminal's virtual filesystem — `ls` lists its keys, `cat <key>` prints the value as pretty JSON. Edit the JSON to change what those commands show.

**Styling is a single plain-CSS file** (`src/index.css`) with design tokens as CSS variables under `:root` (colors, font, max-width). No Tailwind, no CSS modules, no styled-components. Dark industrial/terminal aesthetic: JetBrains Mono everywhere, dot-grid background, `--accent` blue. Keep new styles in this file using the existing token variables.

**Padding convention:** `.container` owns horizontal padding only (`padding-left`/`padding-right`, never the `padding` shorthand). Elements that combine `container` with another class (`.hero`, `.footer`) set vertical padding only, also via longhand. Using the `padding` shorthand on either side of this split silently zeroes the other axis — this caused real bugs.

**Animation system is dependency-free** and split across files that must stay in sync:
- `src/hooks/useReveal.ts` — scroll-position check (getBoundingClientRect, not IntersectionObserver; more robust in scaled/iframed contexts). Sets `visible` true once the element top crosses 88% of the viewport, and resets to false once it scrolls fully offscreen (above or below) — so animations replay on every pass, both scroll directions. Scroll listener stays attached (no one-shot latch). Reduced motion pins it visible.
- `src/components/Reveal.tsx` — wrapper using the hook; accepts `delay` (ms) for stagger and `className` (used to attach `plus-corners` to card wrappers).
- `src/components/MotionText.tsx` — masked word-by-word text reveal (also driven by `useReveal`); takes `as`, `className`, `stagger` (ms between words). Children/`text` must be a plain string.
- `src/hooks/useScrollExit.ts` — hero fade/slide-out tied to scroll position; mutates style in rAF, no re-renders. **Orphaned after the v2 redesign** — no longer imported by anything; delete if reviving the file isn't planned.
- `src/hooks/useSmoothScroll.ts` — Lenis inertia scrolling (the only runtime dependency besides React); anchors offset by the 56px nav. Not initialized under `prefers-reduced-motion`, where native scrolling + `scroll-margin-top` take over. **Gotcha:** Lenis is transform-based and ignores `overflow: hidden`, so a body-scroll-lock alone does not stop the page scrolling behind a modal. Any fullscreen/scrollable overlay must carry the `data-lenis-prevent` attribute (Lenis then skips wheel/touch over it and the overlay scrolls natively) — see `TerminalHero`'s fullscreen root.
- `index.css` couples to it: `.reveal.is-visible` triggers not only the wrapper fade-up but also descendant animations (`.section-title::after` underline grow, `.skills-row` slide-in). Hero load animations use the `.fade-up` class with a `--d` CSS variable for stagger delay, set inline in `Hero.tsx`.
- `TerminalHero.tsx` — hero terminal is two things in one component. **Inline:** auto-types the `entries` script sequentially (state: `entry` = current index, `chars` = chars typed), then becomes clickable. **Fullscreen:** clicking (or Enter/Space) opens an interactive shell via `createPortal` to `document.body` — real text input, `COMMANDS` registry, `↑/↓` history recall, `Tab` autocomplete (command names, plus `cat`/`ls` file args from `sections.json`), `Esc`/close button, body-scroll lock, auto-focus, auto-scroll-to-bottom. Backdrop click closes; inner click focuses input; the overlay carries `data-lenis-prevent` so the page doesn't scroll behind it. Commands return a `ReactNode` to print or a control signal (`{clear}`/`{close}`). Lint rule `react-hooks/set-state-in-effect` forbids synchronous setState in effect bodies — all intro state changes go through timeout callbacks; fullscreen effects only touch refs/DOM. Checks `prefers-reduced-motion` via `matchMedia`: renders intro instantly and skips overlay/scanline animations when set.

**Page chrome components** (matveyan.com-inspired structure):
- `BootLoader.tsx` — fullscreen boot screen with progress %, then split-panel reveal; phase state machine (`loading → reveal → done`), unmounts at `done`, locks body scroll while visible, skipped entirely under reduced motion.
- `HudFrame.tsx` — fixed viewport HUD (corner `+` marks, left scroll-progress rail, bottom-right cursor/scroll/time debug readout); pure listeners, `display: none` under 720px.
- `.plus-corners` CSS class / `.btn::after` — the `+` corner-mark motif, drawn via the `--plus-icon` data-URI variable in `:root`; apply `.plus-corners` to any new framed element (must NOT have `overflow: hidden` — apply to a wrapper instead, e.g. `Reveal`'s `className` prop, since `.term` and `.project-card` clip).
- `.wordmark` — giant outlined "MARANGOZ" before the footer, stroke-only via `-webkit-text-stroke`.

**Every animation must be covered by the `prefers-reduced-motion` block** at the bottom of `index.css`. When adding an animation, add its reset there too.

`Section.tsx` is the shared section shell — takes `id`, `num` (e.g. `"02"`), and `title`, rendering a numbered header (`.sec-num` + `/title` + drawing `.sec-rule`) wrapped in `Reveal`. All page sections (`Projects`, `Experience`, `Skills`, `Contact`) compose it. Page assembly order is in `App.tsx`.
