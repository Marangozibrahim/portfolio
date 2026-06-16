import type { L } from "../types";

export const statement: {
  tags: L<string[]>;
  heading: L<string>;
  bio: L<string>;
} = {
  // tech tags are proper nouns — same both langs, but kept localizable for ordering
  tags: {
    en: ["REST APIs", "Auth systems", "PostgreSQL", "Redis", "Docker"],
    tr: [],
  },
  heading: {
    en: "I specialize in secure authentication, scalable APIs, and architecture that stays clean as systems grow.",
    tr: "",
  },
  bio: {
    en: "Equally at home in Python/FastAPI and C#/.NET. I care about the unglamorous parts — tests, structured logging, migrations — because that's what keeps a system maintainable after I'm gone.",
    tr: "",
  },
};
