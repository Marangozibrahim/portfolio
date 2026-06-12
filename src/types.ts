export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  github: string;
  location: string;
  education: {
    school: string;
    degree: string;
    graduated: string;
  };
  languages: { name: string; level: string }[];
}

export interface Project {
  id: string;
  name: string;
  period: string;
  repoUrl?: string;
  role?: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}
