import type { L } from "../types";

export const statement: {
  tags: L<string[]>;
  heading: L<string>;
  bio: L<string>;
} = {
  // tech tags are proper nouns — same both langs, but kept localizable for ordering
  tags: {
    en: ["REST APIs", "Auth systems", "PostgreSQL", "Redis", "Docker"],
    tr: ["REST API'ler", "Kimlik doğrulama", "PostgreSQL", "Redis", "Docker"],
  },
  heading: {
    en: "I work on authentication, APIs, and the architecture that holds them together.",
    tr: "Kimlik doğrulama, API'ler ve bunları bir arada tutan mimari üzerine çalışıyorum.",
  },
  bio: {
    en: "I work in Python/FastAPI and C#/.NET. Most of my time goes to the parts that don't show up in a demo: tests, logging, migrations. That's what a codebase lives or dies on.",
    tr: "Python/FastAPI ve C#/.NET ile çalışıyorum. Zamanımın çoğu bir demoda görünmeyen kısımlara gidiyor: testler, loglama, migration'lar. Bir kod tabanı asıl bunlarla ayakta kalır.",
  },
};
