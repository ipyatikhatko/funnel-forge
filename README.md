# FunnelForge

FunnelForge is a funnel builder and publishing product: admin UI for building pages from blocks, versioned publishing to a public URL, and analytics (views and conversions) with a dashboard. The MVP targets a small, **AWS-native**, cost-conscious deployment model.

## Stack

| Layer          | Technology                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Application    | [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript (strict)                                                                                       |
| UI             | [Tailwind CSS](https://tailwindcss.com) 4, [shadcn/ui](https://ui.shadcn.com), [Framer Motion](https://www.framer.com/motion/), [Lucide](https://lucide.dev) icons |
| Client state   | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                                           |
| Charts         | [Recharts](https://recharts.org)                                                                                                                                   |
| Authentication | [Better Auth](https://www.better-auth.com/)                                                                                                                        |
| Data access    | [Drizzle ORM](https://orm.drizzle.team), PostgreSQL (`postgres` driver)                                                                                            |
| Validation     | [Zod](https://zod.dev) 4                                                                                                                                           |
| CI             | GitHub Actions (`lint`, `typecheck`, `build`)                                                                                                                      |

The product specification in [`plan.md`](plan.md) originally described DynamoDB for core persistence. **This repository uses PostgreSQL and Drizzle** for application and auth data instead. Published funnel artifacts and static delivery remain aligned with the plan (**S3** and **CloudFront**).

## Architecture

- **Single Next.js fullstack repository** (no monorepo): UI, Route Handlers / API routes, and server logic live together at the repo root.
- **Server-first rendering** where possible; client boundaries for the builder, motion, and charts.
- **Better Auth** with Drizzle-backed storage (see environment variables in [`.env.example`](.env.example)).
- **Target deployment**: **AWS Amplify Hosting** for the Next.js app (build and deploy from Git); separate **S3 + CloudFront** for the published funnel CDN path described in the plan. Infrastructure-as-code (e.g. CDK) can live alongside the app when added.

Modular boundaries, data layout, auth, and CI/CD details are documented under [`docs/architecture/`](docs/architecture/).

## Development

Requirements: Node.js 20+ and [pnpm](https://pnpm.io).

```bash
cp .env.example .env        # set DATABASE_URL and Better Auth variables
pnpm install
pnpm dev
```

### Local PostgreSQL (Docker, dev only)

The `db` service in [`docker-compose.yml`](docker-compose.yml) is for **local development** only. Production databases should use a managed provider (Neon, Railway, etc.); point `DATABASE_URL` there and do not rely on Compose for Postgres in production.

Compose substitutes `${POSTGRES_*}` and `${POSTGRES_PORT}` from a **`.env` file in the project root** (not `.env.local` by default). If you keep secrets only in `.env.local`, run `docker compose --env-file .env.local up -d db` instead.

```bash
cp .env.example .env   # defines POSTGRES_* for Compose + DATABASE_URL for the host
docker compose up -d db
pnpm db:migrate   # when migrations exist
pnpm dev
```

Optional: run the **production image** against that local database (useful for smoke-testing the container). Create a `.env` from [`.env.example`](.env.example) first so `BETTER_AUTH_*` (and anything else the app needs) is loaded via Compose `env_file`; Compose then overrides `DATABASE_URL` to use the `db` hostname inside the network.

```bash
docker compose --profile app up -d --build
```

Stop and remove the dev database volume when you want a clean Postgres data directory:

```bash
docker compose down -v
```

### Container image (PaaS / your orchestrator)

Build a production image (no database inside):

```bash
docker build -t funnel-forge .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="postgresql://…" \
  -e BETTER_AUTH_SECRET="…" \
  -e BETTER_AUTH_URL="https://your-public-app-url" \
  funnel-forge
```

Useful scripts: `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:studio` for Drizzle.
