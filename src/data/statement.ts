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
    en: "I build systems for maintainability, scalability, and reliability.",
    tr: "Sistemleri sürdürülebilirlik, ölçeklenebilirlik ve güvenilirlik için kurarım.",
  },
  bio: {
    en: "I work in Python/FastAPI and C#/.NET, focused on architecture that scales and code that's safe to change. I care about systems that hold up under load, not just ones that pass a demo.",
    tr: "Python/FastAPI ve C#/.NET ile çalışırım; ölçeklenebilen mimariye ve güvenle değiştirilebilen koda odaklanırım. Bir demoyu geçen değil, yük altında ayakta kalan sistemleri önemserim.",
  },
};
