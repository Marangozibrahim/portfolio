import type { Experience } from "../types";

export const experience: Experience[] = [
  {
    title: { en: "Software Development Intern", tr: "Yazılım Geliştirme Stajyeri" },
    company: "Izmir Bakircay University",
    period: "Feb 2025 — May 2025",
    bullets: {
      en: [
        "Designed and implemented backend infrastructure for two AI-driven applications as part of a 6-person team",
        "Led development of key backend components using .NET Core, EF Core, and MS SQL",
        "Applied JWT authentication and Onion Architecture across services",
      ],
      tr: [
        "6 kişilik bir ekibin parçası olarak iki yapay zeka destekli uygulamanın backend altyapısını tasarladım ve hayata geçirdim",
        ".NET Core, EF Core ve MS SQL kullanarak temel backend bileşenlerinin geliştirilmesine liderlik ettim",
        "Servisler genelinde JWT kimlik doğrulama ve Onion Architecture uyguladım",
      ],
    },
  },
];
