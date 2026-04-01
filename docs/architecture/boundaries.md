# Layer boundaries

## UI

- Prefer **React Server Components** for pages and data-heavy views.
- Use **`use client`** only where needed: animations, drag-and-drop, Zustand, charts, form widgets that require browser APIs.
- Keep **Framer Motion** and **Recharts** on **admin / builder / dashboard** routes. Public published funnel pages should stay lightweight (per performance goals in the product plan).

## Server-only

- **Drizzle** and **`getDb()`** — only import from Route Handlers, Server Actions, and other server-only modules. Never from client components.
- **Secrets and environment** — `DATABASE_URL`, `BETTER_AUTH_*`, AWS credentials: server only.
- **AWS SDK** (when added) — server only.

## Domain types

- **Pure TypeScript** types and validators (e.g. funnel schema shapes) may be imported from both server and client when they carry **no server-only imports**.

## Anti-patterns

- Importing `postgres`, `drizzle-orm` drivers, or `getDb` from components marked `use client`.
- Pulling dashboard-only libraries into public funnel entry points.
- Leaking internal IDs or secrets in client-visible responses.
