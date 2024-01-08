import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;
declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ['query', 'info']
  });
  prisma.$connect();
  console.log("Database is under Production 🤓");
} else {
  if (!global.__db) {
    console.log("Database is under Development 🥸");
    global.__db = new PrismaClient({
      log: ['query', 'info']
    });
    global.__db.$connect();
  }
  prisma = global.__db;
}

export * from "@prisma/client";
export { prisma };
