import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "realtime-chat-app",
    name: "Real-Time Chat App",
    period: "May 2026 — Jun 2026",
    repoUrl: "https://github.com/Marangozibrahim/chat-app",
    summary: {
      en: "Horizontally-scalable group chat with real-time presence, typing, and read receipts over WebSockets.",
      tr: "",
    },
    highlights: {
      en: [
        "Multi-worker WebSocket fan-out via Redis pub/sub — scales to N processes with zero inter-worker coordination",
        "O(1) presence with automatic stale eviction (Redis HSET + ZSET), WhatsApp-style double-tick read receipts",
        "Direct-to-S3 uploads via presigned URLs (images, video, PDFs up to 500 MB), cursor-paginated history",
        "Access + refresh JWTs with single-flight 401 refresh, Redis-backed rate limiting, GitHub Actions CI, EC2 deploy",
      ],
      tr: [],
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
      tr: "",
    },
    highlights: {
      en: [
        "Argon2 email/password auth, JWT access + refresh tokens with Redis blacklisting, OAuth2, RBAC",
        "SlowAPI rate limiting and Celery background tasks",
        "Clean architecture: repositories + services, dependency injection, unit tests",
        "Full Docker Compose deployment",
      ],
      tr: [],
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
      tr: "",
    },
    highlights: {
      en: [
        "CQRS via MediatR, Result Pattern, Specification Pattern, Onion Architecture",
        "JWT authentication, FluentValidation, Serilog structured logging",
        "Redis caching layer over MS SQL",
        "Comprehensive tests with xUnit, Moq, FluentAssertions; containerized with Docker",
      ],
      tr: [],
    },
    stack: ["ASP.NET Core", "EF Core", "MS SQL", "Redis", "MediatR", "Docker"],
  },
  {
    id: "geolocation-market-analysis",
    name: "Geolocation Market Analysis",
    period: "Feb 2025 — Apr 2025",
    repoUrl: "https://github.com/Marangozibrahim/GeolocationMarketAnalysis",
    role: { en: "Backend Developer · team project", tr: "" },
    summary: {
      en: "Backend for an AI-powered tool that scores retail locations by market profitability.",
      tr: "",
    },
    highlights: {
      en: [
        "Repository Pattern, JWT authentication, Onion Architecture",
        "Efficient pagination for optimized API performance",
        "Built with a 6-person team",
      ],
      tr: [],
    },
    stack: [".NET Core", "EF Core", "MS SQL"],
  },
];
