import { pgTable, text } from "drizzle-orm/pg-core";

/**
 * Minimal table so Drizzle Kit can emit migrations before app tables exist.
 * Replace or extend in Milestone 1 (funnels, auth, analytics mapped from plan.md).
 */
export const schemaMeta = pgTable("_schema_meta", {
  key: text("key").primaryKey(),
});
