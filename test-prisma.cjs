const { PrismaClient } = require('@prisma/client')
const { Pool } = require('@neondatabase/serverless')
const { PrismaNeon } = require('@prisma/adapter-neon')
const ws = require('ws')

const { neonConfig } = require('@neondatabase/serverless')
neonConfig.webSocketConstructor = ws

try {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(pool)
  const p = new PrismaClient({ adapter })
  console.log("SUCCESS")
} catch(e) {
  console.log("FAIL", e.message)
}
