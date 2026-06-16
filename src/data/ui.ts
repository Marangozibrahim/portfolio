import type { L } from "../types";

/**
 * UI chrome strings (not CV content — that lives in the other data files).
 * Fill the `tr` slots with Turkish. Leave EN as the source of truth.
 * Empty tr strings fall back to EN at read time via `t()`.
 */
export const ui = {
  hero: {
    openToWork: { en: "open to work", tr: "" },
    viewProjects: { en: "view projects", tr: "" },
  },
  contact: {
    text: {
      en: "Open to backend and full-stack roles. If you're building something interesting — or just want to talk systems — my inbox is open.",
      tr: "",
    },
  },
  projects: {
    viewSource: { en: "view source →", tr: "" },
  },
  experience: {
    graduated: { en: "graduated", tr: "" }, // prefix before date
  },
  nav: {
    openMenu: { en: "Open menu", tr: "" },
    closeMenu: { en: "Close menu", tr: "" },
    langLabel: { en: "Switch language", tr: "" },
  },
} satisfies Record<string, Record<string, L<string>>>;
