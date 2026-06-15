import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "realtime-chat-app",
    name: "Real-Time Chat App",
    period: "May 2026 — Jun 2026",
    repoUrl: "https://github.com/Marangozibrahim/chat-app",
    summary:
      "Horizontally-scalable group chat with real-time presence, typing, and read receipts over WebSockets.",
    highlights: [
      "Multi-worker WebSocket fan-out via Redis pub/sub — scales to N processes with zero inter-worker coordination",
      "O(1) presence with automatic stale eviction (Redis HSET + ZSET), WhatsApp-style double-tick read receipts",
      "Direct-to-S3 uploads via presigned URLs (images, video, PDFs up to 500 MB), cursor-paginated history",
      "Access + refresh JWTs with single-flight 401 refresh, Redis-backed rate limiting, GitHub Actions CI, EC2 deploy",
    ],
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
    summary:
      "Secure, scalable authentication backend with async I/O end to end.",
    highlights: [
      "Argon2 email/password auth, JWT access + refresh tokens with Redis blacklisting, OAuth2, RBAC",
      "SlowAPI rate limiting and Celery background tasks",
      "Clean architecture: repositories + services, dependency injection, unit tests",
      "Full Docker Compose deployment",
    ],
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
    summary:
      "RESTful CRUD API built on CQRS and Onion Architecture with full test coverage.",
    highlights: [
      "CQRS via MediatR, Result Pattern, Specification Pattern, Onion Architecture",
      "JWT authentication, FluentValidation, Serilog structured logging",
      "Redis caching layer over MS SQL",
      "Comprehensive tests with xUnit, Moq, FluentAssertions; containerized with Docker",
    ],
    stack: ["ASP.NET Core", "EF Core", "MS SQL", "Redis", "MediatR", "Docker"],
  },
  {
    id: "geolocation-market-analysis",
    name: "Geolocation Market Analysis",
    period: "Feb 2025 — Apr 2025",
    repoUrl: "https://github.com/Marangozibrahim/GeolocationMarketAnalysis",
    role: "Backend Developer · team project",
    summary:
      "Backend for an AI-powered tool that scores retail locations by market profitability.",
    highlights: [
      "Repository Pattern, JWT authentication, Onion Architecture",
      "Efficient pagination for optimized API performance",
      "Built with a 6-person team",
    ],
    stack: [".NET Core", "EF Core", "MS SQL"],
  },
];
