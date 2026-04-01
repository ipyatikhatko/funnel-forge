# Imports and folder structure

## Path alias

TypeScript resolves `@/*` to the repo root per [`tsconfig.json`](../../tsconfig.json).

Examples:

- `@/components/ui/button`
- `@/lib/db`
- `@/lib/utils`

## Suggested organization

As the app grows:

- **`app/`** — routes, layouts, route-specific components that are not reused.
- **`components/`** — shared UI; **`components/ui/`** for Shadcn-style primitives.
- **`lib/`** — server utilities, `db`, auth helpers, domain logic without JSX.

Use **lowercase with dashes** for directory names (e.g. `funnel-builder`).

Prefer **named exports** for components.

## Candidates for later extraction

Modules that are good future **Go services** or **Lambda** functions often look like:

- High-volume **event ingestion** (replacement for synchronous API writes).
- **Batch rollup** or aggregation jobs.
- **Heavy transformation** isolated from the web request path.

Keep **narrow interfaces** (input/output types, queue payloads) and **no imports** from `app/` inside those modules so extraction stays straightforward.
