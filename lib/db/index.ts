import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let db: DrizzleDb | null = null;

/**
 * Postgres + Drizzle singleton for server-side usage only (API routes, Server Actions).
 * Requires DATABASE_URL. Do not call from client components.
 */
export function getDb(): DrizzleDb {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!db) {
    const client = postgres(url, { max: 1 });
    db = drizzle(client, { schema });
  }
  return db;
}

export { schema };
