import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Override any existing env vars so .env always wins (avoids stale shell values)
config({ override: true });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});