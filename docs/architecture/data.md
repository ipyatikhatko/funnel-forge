# Data layer (Drizzle + PostgreSQL)

## Decision

**Drizzle ORM** is the only SQL ORM for application persistence. The database is **PostgreSQL** in production (managed Postgres, RDS, Neon, Supabase, etc.—choice is deployment-specific).

## Environment

- **`DATABASE_URL`** — Postgres connection string. See [`.env.example`](../../.env.example).

Local development can use **`docker compose up -d db`** ([`docker-compose.yml`](../../docker-compose.yml)). Compose reads **`POSTGRES_USER`**, **`POSTGRES_PASSWORD`**, **`POSTGRES_DB`**, and **`POSTGRES_PORT`** from the project `.env` (see [`.env.example`](../../.env.example)) for the database container and host port mapping. That stack is **dev-only**; staging and production should use a managed database via `DATABASE_URL`, not the Compose `db` container.

## Layout

| Path | Purpose |
|------|---------|
| [`lib/db/schema.ts`](../../lib/db/schema.ts) | Drizzle table definitions |
| [`lib/db/index.ts`](../../lib/db/index.ts) | `getDb()` — server-only Postgres client |
| [`drizzle/`](../../drizzle/) | Generated SQL migrations |
| [`drizzle.config.ts`](../../drizzle.config.ts) | Drizzle Kit config |

## Scripts

- `pnpm db:generate` — `drizzle-kit generate` after schema changes
- `pnpm db:migrate` — `drizzle-kit migrate` (run against a database that has `DATABASE_URL` set)
- `pnpm db:studio` — optional local Drizzle Studio

## Relation to the product plan

The MVP plan described DynamoDB-style entities (users, funnels, versions, events, rollups). **Map those concepts to relational tables** in Milestone 1: normal forms, indexes, and foreign keys from funnel/workspace rows to Better Auth user IDs.

**S3 + CloudFront** remain appropriate for **published artifact blobs** (JSON/HTML/assets), not as a substitute for transactional app data.

## Analytics at scale

High-volume raw events may eventually use **streams, SQS, Lambda, or a dedicated store**. Document that split when implemented; the initial goal is a coherent SQL schema for MVP analytics and rollups.
