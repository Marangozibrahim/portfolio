import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "realtime-chat-app",
    name: "Real-Time Chat App",
    period: "May 2026 — Jun 2026",
    repoUrl: "https://github.com/Marangozibrahim/chat-app",
    summary: {
      en: "Built a horizontally-scalable group chat that fans real-time messages out across N worker processes with zero inter-worker coordination using FastAPI, React, Redis pub/sub, and WebSockets.",
      tr: "Worker'lar arası koordinasyon gerektirmeden gerçek zamanlı mesajları N worker sürecine dağıtan yatay ölçeklenebilir grup sohbeti — FastAPI, React, Redis pub/sub ve WebSocket ile geliştirildi.",
    },
    highlights: {
      en: [
        "Built multi-worker WebSocket fan-out over Redis pub/sub that scales to N processes with zero inter-worker coordination",
        "Built O(1) presence with automatic stale eviction and WhatsApp-style read receipts using Redis HSET + ZSET",
        "Built direct-to-S3 uploads that bypass the API for files up to 500 MB using presigned URLs and cursor-paginated history",
        "Built access + refresh JWT auth that transparently recovers from 401s using single-flight refresh, Redis rate limiting, and GitHub Actions CI deployed to EC2",
      ],
      tr: [
        "Worker'lar arası koordinasyon gerektirmeden N sürece ölçeklenen, Redis pub/sub üzerinde çok-worker'lı WebSocket dağıtımı geliştirildi",
        "Redis HSET + ZSET ile otomatik bayat kayıt temizliği ve WhatsApp tarzı okundu bilgisi sunan O(1) çevrimiçi durumu geliştirildi",
        "Presigned URL ve cursor tabanlı geçmiş ile 500 MB'a kadar dosyaları API'yi atlayarak doğrudan S3'e yükleme geliştirildi",
        "Single-flight yenileme, Redis hız sınırlama ve EC2'ye dağıtılan GitHub Actions CI ile 401'lerden şeffaf şekilde toparlanan access + refresh JWT doğrulaması geliştirildi",
      ],
    },
    stack: [
      "FastAPI",
      "React",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "AWS S3",
      "Docker",
    ],
  },
  {
    id: "user-auth-api",
    name: "User Auth API",
    period: "Nov 2025 — Mar 2026",
    repoUrl: "https://github.com/Marangozibrahim/user-auth-api",
    summary: {
      en: "Built a secure authentication backend that handles email/password, OAuth2, and role-based access with end-to-end async I/O using FastAPI, PostgreSQL, Redis, and Celery.",
      tr: "Baştan sona asenkron I/O ile e-posta/parola, OAuth2 ve rol tabanlı erişimi yöneten güvenli bir kimlik doğrulama backend'i — FastAPI, PostgreSQL, Redis ve Celery ile geliştirildi.",
    },
    highlights: {
      en: [
        "Built email/password auth that resists brute-force using Argon2 hashing, JWT access + refresh tokens, and Redis token blacklisting",
        "Built Google OAuth2 sign-in and role-based access control for fine-grained authorization",
        "Built abuse protection and non-blocking email delivery using SlowAPI rate limiting and Celery background tasks",
        "Built on clean architecture (repositories + services, dependency injection) with unit tests and full Docker Compose deployment",
      ],
      tr: [
        "Argon2 hash, JWT access + refresh token'ları ve Redis token kara listesi ile kaba kuvvete dayanıklı e-posta/parola doğrulaması geliştirildi",
        "İnce taneli yetkilendirme için Google OAuth2 girişi ve rol tabanlı erişim kontrolü geliştirildi",
        "SlowAPI hız sınırlama ve Celery arka plan görevleri ile kötüye kullanım koruması ve bloklamayan e-posta gönderimi geliştirildi",
        "Temiz mimari (repository + servisler, bağımlılık enjeksiyonu) üzerine, birim testleri ve tam Docker Compose dağıtımı ile geliştirildi",
      ],
    },
    stack: [
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy (async)",
      "Redis",
      "Celery",
      "Docker",
    ],
  },
  {
    id: "library-management-api",
    name: "Library Management API",
    period: "May 2025 — Sep 2025",
    repoUrl: "https://github.com/Marangozibrahim/LibraryManagementAPI",
    summary: {
      en: "Built a RESTful library management API that isolates reads from writes and serves cached responses using ASP.NET Core, EF Core, MS SQL, Redis, and MediatR on Onion Architecture.",
      tr: "Okumaları yazmalardan ayıran ve önbellekli yanıtlar sunan RESTful kütüphane yönetimi API'si — Onion Architecture üzerinde ASP.NET Core, EF Core, MS SQL, Redis ve MediatR ile geliştirildi.",
    },
    highlights: {
      en: [
        "Built CQRS command/query separation with composable queries using MediatR, the Specification Pattern, and a Result Pattern that replaces exceptions with type-safe errors",
        "Built a Redis cache-aside layer over MS SQL that cuts repeat-read latency",
        "Built request validation and structured logging using FluentValidation and Serilog",
        "Built full CRUD for books, authors, categories, and borrows with comprehensive tests (xUnit, Moq, FluentAssertions), containerized with Docker",
      ],
      tr: [
        "MediatR, Specification Pattern ve istisnaları tip güvenli hatalarla değiştiren Result Pattern ile birleştirilebilir sorgular ve CQRS komut/sorgu ayrımı geliştirildi",
        "MS SQL üzerinde tekrar okuma gecikmesini azaltan Redis cache-aside katmanı geliştirildi",
        "FluentValidation ve Serilog ile istek doğrulama ve yapısal loglama geliştirildi",
        "Kitaplar, yazarlar, kategoriler ve ödünç işlemleri için tam CRUD, kapsamlı testler (xUnit, Moq, FluentAssertions) ve Docker ile container'lama geliştirildi",
      ],
    },
    stack: ["ASP.NET Core", "EF Core", "MS SQL", "Redis", "MediatR", "Docker"],
  },
  {
    id: "geolocation-market-analysis",
    name: "Geolocation Market Analysis",
    period: "Feb 2025 — Apr 2025",
    repoUrl: "https://github.com/Marangozibrahim/GeolocationMarketAnalysis",
    role: { en: "Backend Developer · team project", tr: "Backend Geliştirici · ekip projesi" },
    summary: {
      en: "Built the backend for an AI-powered tool that identifies optimal retail store locations by scoring market profitability using .NET Core, EF Core, and MS SQL.",
      tr: "Pazar kârlılığını puanlayarak en uygun perakende mağaza lokasyonlarını belirleyen yapay zeka destekli bir aracın backend'i — .NET Core, EF Core ve MS SQL ile geliştirildi.",
    },
    highlights: {
      en: [
        "Built a maintainable API using the Repository Pattern, JWT authentication, and Onion Architecture",
        "Built efficient pagination that optimized API performance over large result sets",
        "Delivered as a 6-person team project in a backend developer role",
      ],
      tr: [
        "Repository Pattern, JWT kimlik doğrulama ve Onion Architecture ile bakımı kolay bir API geliştirildi",
        "Büyük sonuç kümelerinde API performansını optimize eden verimli sayfalama geliştirildi",
        "Backend geliştirici rolüyle 6 kişilik bir ekip projesi olarak teslim edildi",
      ],
    },
    stack: [".NET Core", "EF Core", "MS SQL"],
  },
];
