export type Lang = "en" | "tr";

/** Localized value: one variant per language. */
export type L<T> = Record<Lang, T>;

export interface Profile {
  name: string;
  role: L<string>;
  tagline: L<string>;
  email: string;
  github: string;
  linkedin: string;
  location: L<string>;
  education: {
    school: string;
    degree: L<string>;
    graduated: L<string>;
  };
  // languages stays UI-agnostic; rendered via ui dict where needed
}

export interface Project {
  id: string;
  name: string;
  period: string;
  repoUrl?: string;
  liveUrl?: string;
  role?: L<string>;
  summary: L<string>;
  highlights: L<string[]>;
  stack: string[];
}

export interface Experience {
  title: L<string>;
  company: string;
  period: string;
  bullets: L<string[]>;
}

export interface SkillGroup {
  label: string;
  items: string[];
}
