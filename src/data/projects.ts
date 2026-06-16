import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "realtime-chat-app",
    name: "Real-Time Chat App",
    period: "May 2026 — Jun 2026",
    repoUrl: "https://github.com/Marangozibrahim/chat-app",
    summary: {
      en: "Horizontally-scalable group chat with real-time presence, typing, and read receipts over WebSockets.",
      tr: "WebSocket üzerinden gerçek zamanlı çevrimiçi durumu, yazıyor göstergesi ve okundu bilgisi sunan yatay ölçeklenebilir grup sohbeti.",
    },
    highlights: {
      en: [
        "Multi-worker WebSocket fan-out via Redis pub/sub — scales to N processes with zero inter-worker coordination",
        "O(1) presence with automatic stale eviction (Redis HSET + ZSET), WhatsApp-style double-tick read receipts",
        "Direct-to-S3 uploads via presigned URLs (images, video, PDFs up to 500 MB), cursor-paginated history",
        "Access + refresh JWTs with single-flight 401 refresh, Redis-backed rate limiting, GitHub Actions CI, EC2 deploy",
      ],
      tr: [
        "Redis pub/sub ile çok-worker'lı WebSocket dağıtımı — worker'lar arası koordinasyon gerektirmeden N sürece ölçeklenir",
        "Otomatik bayat kayıt temizliğiyle O(1) çevrimiçi durumu (Redis HSET + ZSET), WhatsApp tarzı çift tik okundu bilgisi",
        "Presigned URL ile doğrudan S3'e yükleme (500 MB'a kadar görsel, video, PDF), cursor tabanlı sayfalama geçmişi",
        "Tek seferlik 401 yenilemeli access + refresh JWT, Redis tabanlı hız sınırlama, GitHub Actions CI, EC2 dağıtımı",
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
      en: "Secure, scalable authentication backend with async I/O end to end.",
      tr: "Baştan sona asenkron I/O kullanan güvenli, ölçeklenebilir kimlik doğrulama backend'i.",
    },
    highlights: {
      en: [
        "Argon2 email/password auth, JWT access + refresh tokens with Redis blacklisting, OAuth2, RBAC",
        "SlowAPI rate limiting and Celery background tasks",
        "Clean architecture: repositories + services, dependency injection, unit tests",
        "Full Docker Compose deployment",
      ],
      tr: [
        "Argon2 e-posta/parola doğrulaması, Redis kara listeli JWT access + refresh token'ları, OAuth2, RBAC",
        "SlowAPI ile hız sınırlama ve Celery arka plan görevleri",
        "Temiz mimari: repository + servis katmanları, bağımlılık enjeksiyonu, birim testleri",
        "Tam Docker Compose dağıtımı",
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
      en: "RESTful CRUD API built on CQRS and Onion Architecture with full test coverage.",
      tr: "CQRS ve Onion Architecture üzerine kurulu, tam test kapsamına sahip RESTful CRUD API.",
    },
    highlights: {
      en: [
        "CQRS via MediatR, Result Pattern, Specification Pattern, Onion Architecture",
        "JWT authentication, FluentValidation, Serilog structured logging",
        "Redis caching layer over MS SQL",
        "Comprehensive tests with xUnit, Moq, FluentAssertions; containerized with Docker",
      ],
      tr: [
        "MediatR ile CQRS, Result Pattern, Specification Pattern, Onion Architecture",
        "JWT kimlik doğrulama, FluentValidation, Serilog yapısal loglama",
        "MS SQL üzerinde Redis önbellek katmanı",
        "xUnit, Moq, FluentAssertions ile kapsamlı testler; Docker ile container'lama",
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
      en: "Backend for an AI-powered tool that scores retail locations by market profitability.",
      tr: "Perakende lokasyonlarını pazar kârlılığına göre puanlayan yapay zeka destekli bir aracın backend'i.",
    },
    highlights: {
      en: [
        "Repository Pattern, JWT authentication, Onion Architecture",
        "Efficient pagination for optimized API performance",
        "Built with a 6-person team",
      ],
      tr: [
        "Repository Pattern, JWT kimlik doğrulama, Onion Architecture",
        "Optimize API performansı için verimli sayfalama",
        "6 kişilik bir ekiple geliştirildi",
      ],
    },
    stack: [".NET Core", "EF Core", "MS SQL"],
  },
];
