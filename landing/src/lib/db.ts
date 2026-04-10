import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { WebSocket } from 'ws';

// Required for Neon serverless in Node.js environments
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = WebSocket;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  console.log("CREATING_PRISMA_CLIENT: START");
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("CREATING_PRISMA_CLIENT: DATABASE_URL is undefined");
    throw new Error("DATABASE_URL is required");
  }
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaNeon(pool);
  console.log("CREATING_PRISMA_CLIENT: SUCCESS");
  return new PrismaClient({ adapter });
};

export const db =
  typeof window !== "undefined"
    ? ({} as PrismaClient)
    : globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  globalForPrisma.prisma = db;
}
