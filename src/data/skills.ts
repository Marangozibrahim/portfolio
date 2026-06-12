import type { SkillGroup } from "../types";

export const skills: SkillGroup[] = [
  {
    label: "languages",
    items: ["Python", "C#", "SQL", "JavaScript"],
  },
  {
    label: "frameworks",
    items: [
      "FastAPI",
      ".NET",
      "EF Core",
      "MediatR",
      "SQLAlchemy",
      "Celery",
      "React",
      "Tailwind",
    ],
  },
  {
    label: "databases",
    items: ["PostgreSQL", "MS SQL", "MongoDB", "Redis"],
  },
  {
    label: "cloud_devops",
    items: ["AWS (EC2, VPC, IAM, S3)", "Docker", "Git"],
  },
];
