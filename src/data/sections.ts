import type { Lang } from "../types";
import { pick } from "../i18n/useLang";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { experience } from "./experience";

/** Builds the terminal virtual filesystem for the active language. */
export function buildSections(lang: Lang) {
  return {
    about: {
      name: profile.name,
      role: pick(profile.role, lang),
      location: pick(profile.location, lang),
      focus: ["secure auth flows", "clean architecture", "APIs under load"],
      open_to_work: true,
    },
    projects: projects.map((p) => ({
      name: p.name,
      period: p.period,
      description: pick(p.summary, lang),
      stack: p.stack,
    })),
    skills: Object.fromEntries(skills.map((g) => [g.label, g.items])),
    experience: {
      internship: experience[0]
        ? {
            title: pick(experience[0].title, lang),
            company: experience[0].company,
            period: experience[0].period,
            highlights: pick(experience[0].bullets, lang),
          }
        : null,
      education: {
        school: profile.education.school,
        degree: pick(profile.education.degree, lang),
        graduated: pick(profile.education.graduated, lang),
      },
    },
    contact: {
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
    },
  };
}

export type Sections = ReturnType<typeof buildSections>;
