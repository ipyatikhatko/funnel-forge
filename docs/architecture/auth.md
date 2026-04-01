# Authentication (Better Auth + Drizzle)

## Decision

**[Better Auth](https://www.better-auth.com/)** is the only authentication mechanism. It replaces a custom bcrypt + JWT approach from the original product plan.

Persistence uses the **same PostgreSQL database** as the app via the **official Better Auth + Drizzle** integration (schema generation and migrations happen in Milestone 1).

## Environment

Typical variables (see [`.env.example`](../../.env.example)):

| Variable | Purpose |
|----------|---------|
| `BETTER_AUTH_SECRET` | Signing / encryption secret (long random string) |
| `BETTER_AUTH_URL` | Public base URL of the app (e.g. `https://app.example.com` or `http://localhost:3000`) |
| `DATABASE_URL` | Postgres URL shared with Drizzle |

## Integration surface (Milestone 1)

When wiring auth end-to-end:

1. Add Better Auth **Drizzle adapter** and generated auth tables (per current Better Auth docs).
2. Mount the **catch-all Route Handler** (e.g. `app/api/auth/[...all]/route.ts` — confirm exact path in Better Auth Next.js guide).
3. Use **server-side session helpers** for protected routes and Server Actions.

## Application data

App tables (workspaces, funnels) should reference Better Auth **user IDs** with foreign keys or stable text/uuid columns, documented in `lib/db/schema.ts` once Milestone 1 lands.

## Deployment

Set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `DATABASE_URL` in **AWS Amplify** (or your host) environment settings for production.
