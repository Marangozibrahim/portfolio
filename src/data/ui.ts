import type { L } from "../types";

/**
 * UI chrome strings (not CV content — that lives in the other data files).
 * Fill the `tr` slots with Turkish. Leave EN as the source of truth.
 * Empty tr strings fall back to EN at read time via `t()`.
 */
export const ui = {
  hero: {
    openToWork: { en: "open to work", tr: "işe açık" },
    viewProjects: { en: "view projects", tr: "projeleri gör" },
  },
  contact: {
    text: {
      en: "Open to backend and full-stack roles. If you're building something interesting, or just want to talk systems, my inbox is open.",
      tr: "Backend ve full-stack rollere açığım. İlginç bir şey geliştiriyorsan ya da sadece sistemler üzerine konuşmak istiyorsan kutum açık.",
    },
    downloadCv: { en: "download CV", tr: "CV indir" },
  },
  projects: {
    viewSource: { en: "view source →", tr: "kaynağı gör →" },
    viewLive: { en: "view live →", tr: "canlı gör →" },
  },
  experience: {
    graduated: { en: "graduated", tr: "mezuniyet" }, // prefix before date
  },
  nav: {
    openMenu: { en: "Open menu", tr: "Menüyü aç" },
    closeMenu: { en: "Close menu", tr: "Menüyü kapat" },
    langLabel: { en: "Switch language", tr: "Dil değiştir" },
  },
} satisfies Record<string, Record<string, L<string>>>;
