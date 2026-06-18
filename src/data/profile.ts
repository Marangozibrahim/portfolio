import type { Profile } from "../types";

export const profile: Profile = {
  name: "Halil Ibrahim Marangoz",
  role: { en: "Backend Engineer", tr: "Backend Mühendisi" },
  tagline: {
    en: "Backend engineer. I build auth systems, REST APIs, and the data layer behind them, in Python/FastAPI and C#/.NET.",
    tr: "Backend mühendisi. Python/FastAPI ve C#/.NET ile auth sistemleri, REST API'ler ve arkalarındaki veri katmanını kurarım.",
  },
  email: "marangozibrahim49@gmail.com",
  github: "https://github.com/Marangozibrahim",
  linkedin: "https://www.linkedin.com/in/halil-ibrahim-marangoz-566bb4193",
  location: { en: "Izmir, Turkey", tr: "İzmir, Türkiye" },
  education: {
    school: "Izmir Bakircay University",
    degree: { en: "B.Sc. Computer Engineering", tr: "Bilgisayar Mühendisliği Lisans" },
    graduated: { en: "May 2025", tr: "Mayıs 2025" },
  },
};
