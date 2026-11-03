import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// .env.local (base de développement) passe avant .env, comme dans Next.js
config({ path: ".env.local", quiet: true });
config({ quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
