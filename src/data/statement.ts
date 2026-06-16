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
    en: "I specialize in secure authentication, scalable APIs, and architecture that stays clean as systems grow.",
    tr: "Güvenli kimlik doğrulama, ölçeklenebilir API'ler ve sistemler büyüdükçe temiz kalan mimari üzerine uzmanlaşıyorum.",
  },
  bio: {
    en: "Equally at home in Python/FastAPI and C#/.NET. I care about the unglamorous parts — tests, structured logging, migrations — because that's what keeps a system maintainable after I'm gone.",
    tr: "Python/FastAPI ve C#/.NET tarafında eşit derecede rahatım. Gösterişsiz kısımları önemserim — testler, yapısal loglama, migration'lar — çünkü bir sistemi ben gittikten sonra da bakımı yapılabilir tutan budur.",
  },
};
