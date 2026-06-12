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

**Content lives in `src/data/`, never in components.** `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts` hold all CV content, typed by interfaces in `src/types.ts`. To update site text/projects/skills, edit data files only — components render whatever the data layer provides.

**Styling is a single plain-CSS file** (`src/index.css`) with design tokens as CSS variables under `:root` (colors, font, max-width). No Tailwind, no CSS modules, no styled-components. Dark industrial/terminal aesthetic: JetBrains Mono everywhere, dot-grid background, `--accent` blue. Keep new styles in this file using the existing token variables.

**Padding convention:** `.container` owns horizontal padding only (`padding-left`/`padding-right`, never the `padding` shorthand). Elements that combine `container` with another class (`.hero`, `.footer`) set vertical padding only, also via longhand. Using the `padding` shorthand on either side of this split silently zeroes the other axis — this caused real bugs.

**Animation system is dependency-free** and split across files that must stay in sync:
- `src/hooks/useReveal.ts` — IntersectionObserver hook; adds `is-visible` class on scroll into view.
- `src/components/Reveal.tsx` — wrapper using the hook; accepts `delay` (ms) for stagger.
- `index.css` couples to it: `.reveal.is-visible` triggers not only the wrapper fade-up but also descendant animations (`.section-title::after` underline grow, `.skills-row` slide-in). Hero load animations use the `.fade-up` class with a `--d` CSS variable for stagger delay, set inline in `Hero.tsx`.
- `Typewriter.tsx` — self-contained typing loop driven by setTimeout in an effect; lint rule `react-hooks/set-state-in-effect` forbids synchronous setState in the effect body, so all state changes go through timeout callbacks.

**Every animation must be covered by the `prefers-reduced-motion` block** at the bottom of `index.css`. When adding an animation, add its reset there too.

`Section.tsx` is the shared section shell (id + `/title` heading + Reveal); all page sections (`Projects`, `Experience`, `Skills`, `Contact`) compose it. Page assembly order is in `App.tsx`.
