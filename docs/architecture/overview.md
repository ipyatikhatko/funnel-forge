# Architecture overview

FunnelForge is a **single Next.js fullstack** repository: App Router pages, Route Handlers / Server Actions, and UI live together at the repo root. There is **no monorepo** (`apps/web`, shared packages) in the current phase.

## What lives here

- **Admin / product UI** — React Server Components first; small `use client` islands for interactivity (builder, charts).
- **HTTP API** — Next.js Route Handlers under `app/api/**` (aligned with the product plan’s `/api/*` surface).
- **Data access** — **Drizzle ORM** against **PostgreSQL** for application and auth data (see [data.md](./data.md)).
- **Auth** — **Better Auth** with a Drizzle-backed database (see [auth.md](./auth.md)).

## Product plan note

The written MVP plan (`plan.md` in this repo if present in your checkout) described DynamoDB for core entities. **This codebase uses SQL + Drizzle instead** for users, funnels, versions, and analytics rollups. **S3 and CloudFront** remain the right fit for published funnel artifacts and CDN delivery.

## Future splits (optional)

If traffic, team boundaries, or runtimes require it, heavy or isolated workloads may move to **Go microservices** or **AWS Lambda**. Keep **clear module boundaries** inside Next (see [boundaries.md](./boundaries.md) and [imports-and-structure.md](./imports-and-structure.md)) so those extractions stay mechanical.
