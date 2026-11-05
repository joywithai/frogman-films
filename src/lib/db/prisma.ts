import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Creates the Prisma client defensively.
 *
 * The generated client (and its native query engine) is not always present,
 * e.g. in a fresh checkout or an offline sandbox where `prisma generate`
 * cannot download its engine. In that case we hand back a lazily throwing
 * placeholder instead of crashing at module import time, so every caller's
 * existing try/catch keeps falling back to the static archive data.
 */
function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log:
        process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  } catch {
    console.warn(
      "Prisma client is not initialized (run `npx prisma generate`). Using static archive data."
    );

    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error(
          "Prisma client is not initialized. Run `npx prisma generate` to enable database queries."
        );
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
