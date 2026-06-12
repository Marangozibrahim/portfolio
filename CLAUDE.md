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

**Content lives in `src/data/`, never in components.** `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `statement.ts` hold all CV content, typed by interfaces in `src/types.ts` (statement is self-typed). To update site text/projects/skills, edit data files only — components render whatever the data layer provides. Exception: the terminal hero's command script lives in the `entries` array in `TerminalHero.tsx`.

**Styling is a single plain-CSS file** (`src/index.css`) with design tokens as CSS variables under `:root` (colors, font, max-width). No Tailwind, no CSS modules, no styled-components. Dark industrial/terminal aesthetic: JetBrains Mono everywhere, dot-grid background, `--accent` blue. Keep new styles in this file using the existing token variables.

**Padding convention:** `.container` owns horizontal padding only (`padding-left`/`padding-right`, never the `padding` shorthand). Elements that combine `container` with another class (`.hero`, `.footer`) set vertical padding only, also via longhand. Using the `padding` shorthand on either side of this split silently zeroes the other axis — this caused real bugs.

**Animation system is dependency-free** and split across files that must stay in sync:
- `src/hooks/useReveal.ts` — IntersectionObserver hook; toggles `is-visible` as the element enters/leaves the viewport so animations replay on every pass (both scroll directions). Class is removed only when fully offscreen — keep that hysteresis (`threshold: [0, 0.15]`) or visible elements will flicker.
- `src/components/Reveal.tsx` — wrapper using the hook; accepts `delay` (ms) for stagger and `className` (used to attach `plus-corners` to card wrappers).
- `src/components/MotionText.tsx` — masked word-by-word text reveal (also driven by `useReveal`); takes `as`, `delay`, `stagger`. Children must be a plain string.
- `src/hooks/useScrollExit.ts` — hero fade/slide-out tied to scroll position; mutates style in rAF, no re-renders.
- `src/hooks/useSmoothScroll.ts` — Lenis inertia scrolling (the only runtime dependency besides React); anchors offset by the 56px nav. Not initialized under `prefers-reduced-motion`, where native scrolling + `scroll-margin-top` take over.
- `index.css` couples to it: `.reveal.is-visible` triggers not only the wrapper fade-up but also descendant animations (`.section-title::after` underline grow, `.skills-row` slide-in). Hero load animations use the `.fade-up` class with a `--d` CSS variable for stagger delay, set inline in `Hero.tsx`.
- `TerminalHero.tsx` — hero is a fake terminal that types its `entries` script sequentially (state machine: `stage` = current entry, `typed` = chars typed). Lint rule `react-hooks/set-state-in-effect` forbids synchronous setState in effect bodies — all state changes go through timeout/rAF callbacks. Checks `prefers-reduced-motion` via `matchMedia` and renders everything instantly when set.

**Page chrome components** (matveyan.com-inspired structure):
- `BootLoader.tsx` — fullscreen boot screen with progress %, then split-panel reveal; phase state machine (`loading → reveal → done`), unmounts at `done`, locks body scroll while visible, skipped entirely under reduced motion.
- `HudFrame.tsx` — fixed viewport HUD (corner `+` marks, left scroll-progress rail, bottom-right cursor/scroll/time debug readout); pure listeners, `display: none` under 720px.
- `.plus-corners` CSS class / `.btn::after` — the `+` corner-mark motif, drawn via the `--plus-icon` data-URI variable in `:root`; apply `.plus-corners` to any new framed element (must NOT have `overflow: hidden` — apply to a wrapper instead, e.g. `Reveal`'s `className` prop, since `.term` and `.project-card` clip).
- `.wordmark` — giant outlined "MARANGOZ" before the footer, stroke-only via `-webkit-text-stroke`.

**Every animation must be covered by the `prefers-reduced-motion` block** at the bottom of `index.css`. When adding an animation, add its reset there too.

`Section.tsx` is the shared section shell (id + `/title` heading + Reveal); all page sections (`Projects`, `Experience`, `Skills`, `Contact`) compose it. Page assembly order is in `App.tsx`.
