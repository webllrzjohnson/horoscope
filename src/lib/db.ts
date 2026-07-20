import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaSchemaStamp?: string;
};

/** Busts HMR-cached clients when generated model fields change. */
const SCHEMA_STAMP = [
  ...Object.keys(Prisma.MagicEightAnswerScalarFieldEnum),
  ...Object.keys(Prisma.TarotCardScalarFieldEnum),
]
  .sort()
  .join(",");

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;
  if (
    cached &&
    globalForPrisma.prismaSchemaStamp === SCHEMA_STAMP &&
    cached.crystalBallSaying &&
    cached.idealPartnerSaying &&
    cached.magicEightAnswer &&
    cached.tarotCard
  ) {
    return cached;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  globalForPrisma.prismaSchemaStamp = SCHEMA_STAMP;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
