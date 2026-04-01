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

Useful scripts: `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:studio` for Drizzle.
