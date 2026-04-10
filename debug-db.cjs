const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('./frontend/prisma-client');
const ws = require('ws');

// Explicitly load .env
require('dotenv').config({ path: './frontend/.env' });

async function test() {
  const url = process.env.DATABASE_URL;
  console.log("Testing URL:", url ? url.substring(0, 20) + "..." : "MISSING");
  
  if (!url) return;

  neonConfig.webSocketConstructor = ws;
  const adapter = new PrismaNeon({ connectionString: url });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Attempting findMany...");
    const data = await prisma.property.findMany({ take: 1 });
    console.log("SUCCESS! Data found:", data.length);
  } catch (err) {
    console.error("FAILURE:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
