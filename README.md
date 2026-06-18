# Portfolio — Halil Ibrahim Marangoz

Personal portfolio of **Halil Ibrahim Marangoz**, full-stack engineer.

Dark terminal-themed single-page site: animated boot loader, a hero that types out a fake shell session, HUD overlay with live scroll/cursor readouts, masked word-by-word text reveals, and inertia smooth scrolling.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 8**
- Plain CSS with design tokens — no UI framework
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling (only runtime dependency besides React)

## Highlights

- **Terminal hero** — data-driven command script (`whoami`, `cat role.txt`, `status --check`) typed out character by character with a state machine
- **Scroll animations** — IntersectionObserver-based reveals that replay in both scroll directions; word-level masked text reveals; hero fades out as you scroll past it
- **Accessibility** — every animation is disabled under `prefers-reduced-motion`, visually-hidden `h1` for screen readers, keyboard-visible focus states, ARIA-labelled mobile menu
- **Content/presentation split** — all CV content lives in typed data files (`src/data/`); components never hold copy
- **Performance** — ~70KB JS gzipped, no asset images, single CSS file

## Development

```sh
npm install
npm run dev       # dev server at localhost:5173
npm run build     # type-check + production build to dist/
npm run lint      # eslint
npm run preview   # serve the production build
```

## Structure

```
src/
├── data/          # all site content (profile, projects, experience, skills)
├── components/    # one component per section + page chrome
├── hooks/         # useReveal, useScrollExit, useSmoothScroll
├── types.ts       # shared interfaces for the data layer
└── index.css      # design tokens + all styling
```

To update site content, edit the files in `src/data/` — no component changes needed.

## License

Code is MIT. Content (text, CV details) is mine — please don't reuse it as your own.
