import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { experience } from "./experience";

const sections = {
  about: {
    name: profile.name,
    role: profile.role,
    location: profile.location,
    focus: ["secure auth flows", "clean architecture", "APIs under load"],
    open_to_work: true,
  },
  projects: projects.map((p) => ({
    name: p.name,
    period: p.period,
    description: p.summary,
    stack: p.stack,
  })),
  skills: Object.fromEntries(skills.map((g) => [g.label, g.items])),
  experience: {
    internship: experience[0]
      ? {
          title: experience[0].title,
          company: experience[0].company,
          period: experience[0].period,
          highlights: experience[0].bullets,
        }
      : null,
    education: {
      school: profile.education.school,
      degree: profile.education.degree,
      graduated: profile.education.graduated,
    },
  },
  contact: {
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
  },
};

export default sections;
