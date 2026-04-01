# CI/CD

## GitHub Actions

[`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) runs on **push** and **pull_request** to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm build`

**No database** is required for CI in this phase. Migration checks can be added later (e.g. Postgres service container) if you want `db:migrate` verified on every PR.

## Application hosting (AWS Amplify)

Per the product plan, **AWS Amplify Hosting** can build and deploy the Next.js app from GitHub.

Typical Amplify settings:

- **Package manager:** pnpm
- **Install:** `pnpm install`
- **Build:** `pnpm build`

Set environment variables in the Amplify console:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (production public URL)

## Infrastructure (CDK)

Deploying **S3, CloudFront, DynamoDB** (if any remains), DNS, etc. via **CDK** is **out of scope** for the initial slice. When `infra/` exists, add a GitHub Actions workflow and **GitHub Secrets** for AWS role or keys, following your team’s security standards.

## Secrets overview

| Secret / env | Where |
|--------------|--------|
| `DATABASE_URL` | Amplify, local `.env` |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | Amplify, local `.env` |
| AWS credentials for CDK | GitHub Secrets (future infra workflow) |
