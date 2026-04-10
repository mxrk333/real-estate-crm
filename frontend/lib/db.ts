// Use require to ensure this runs BEFORE any hoisted imports
const path = require('path');
const envPath = path.resolve(process.cwd(), '.env');
require('dotenv').config({ path: envPath });

import { PrismaClient } from '../prisma-client';
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
  const url = process.env.DATABASE_URL;
  console.log("DB_INIT: URL Check - length:", url?.length || 0);

  if (!url) {
    console.error("DB_INIT: ERROR - DATABASE_URL is missing!");
    return new PrismaClient(); 
  }
  
  // Create the adapter using the connection string directly for Prisma 7
  const adapter = new PrismaNeon({ connectionString: url });
  
  console.log("DB_INIT: Prisma Client created with Direct Adapter");
  return new PrismaClient({ adapter });
};

export const db =
  typeof window !== "undefined"
    ? ({} as PrismaClient)
    : globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  globalForPrisma.prisma = db;
}
