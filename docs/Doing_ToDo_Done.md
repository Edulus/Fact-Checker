# Doing / To Do / Done — Fact-Checker

> Living tracker of all project work. Update this document as tasks are completed, started, or discovered.
> Any developer or Claude instance picking up work should read this first to know where things stand.

---

## Doing

| # | Task | Done condition | Started | Notes |
|---|---|---|---|---|
| — | — | — | — | Nothing in progress |

---

## To Do

### Phase 1 — Repo and scaffold

| # | Task | Done condition | Blocked by | Notes |
|---|---|---|---|---|
| 1.1 | Create GitHub repo | Repo exists, all eight docs pushed to `main`, repo is the single source of truth | — | Repo name TBD. Docs go in `/docs/` per README structure |
| 1.2 | Scaffold Next.js project | `create-next-app` with TypeScript + Tailwind, folder structure matches README (`/app`, `/components`, `/lib`, `/docs`, `/public`), runs on `localhost:3000` | 1.1 | Use App Router, not Pages Router |
| 1.3 | Set up Vercel | GitHub repo connected, env vars configured (`ANTHROPIC_API_KEY`, `NEWS_API_KEY`, `POSTGRES_URL`, `NEXT_PUBLIC_SITE_URL`), Vercel Postgres provisioned, deploy-on-push working | 1.1 | Free tier is sufficient for MVP |

### Phase 2 — UI

| # | Task | Done condition | Blocked by | Notes |
|---|---|---|---|---|
| 2.1 | Build homepage — claim input | Text input for claim submission, submit button, "all checks are public and anonymous" notice, renders at `/` | 1.2 | Follow PRODUCT.md visual design: serif logo, no color except verdicts, newspaper aesthetic |
| 2.2 | Build homepage — commons feed | Recent checks displayed below input, tag cloud, stats block (total checks, false %, distinct topics) | 1.2, 3.3 | Needs `/api/commons` to be wired, but can stub with mock data first |
| 2.3 | Build verdict card component | Displays all verdict fields: color dot, label, confidence %, provenance, amplifiers, fallacies, sources for/against, tags, timestamp, share link | 1.2 | This is the most important UI component — must be screenshot-ready and self-contained |
| 2.4 | Build result page `/result/[id]` | Fetches verdict from DB by UUID, renders verdict card, shareable URL works, good link preview metadata | 1.2, 3.3 | Primary sharing mechanic — needs OG tags for social previews |

### Phase 3 — Pipeline and data

| # | Task | Done condition | Blocked by | Notes |
|---|---|---|---|---|
| 3.1 | Create database tables | `checks` and `tags` tables created in Vercel Postgres matching DATA.md schema, indexes applied | 1.3 | Run migration SQL from DATA.md |
| 3.2 | Write claim pipeline (`/lib/pipeline.ts`) | Function takes raw claim → normalizes → fetches Wikipedia context → fetches NewsAPI coverage → calls Anthropic → returns structured verdict JSON | 1.2 | This is the core engineering. See TECH.md steps 1–4 |
| 3.3 | Write Anthropic prompt (`/lib/prompts.ts`) | System prompt produces consistent JSON with all verdict fields, handles edge cases with yellow/low confidence, politically neutral | — | Can be written and tested independently. Most critical piece per TECH.md |
| 3.4 | Wire `/api/check` route | POST route accepts `{ claim }`, runs pipeline, persists to Postgres, returns full verdict JSON with UUID | 3.1, 3.2, 3.3 | End-to-end integration |
| 3.5 | Wire `/api/commons` route | GET route returns recent checks, tag counts, and stats block | 3.1 | Powers the homepage commons feed |

---

## Discovered work

> Tasks that surface during implementation. Move them into the appropriate phase above once scoped.

| Task | Discovered during | Notes |
|---|---|---|
| — | — | — |

---

## Open questions

| Question | Context | Resolved? |
|---|---|---|
| Repo name? | `fact-checker`? `factchecker`? Something else? | No |
| Domain name? | TECH.md references `fact-checker.com` — is this secured? | No |
| NewsAPI free tier limit | 100 req/day on free tier — sufficient for MVP launch? | No |
| Approved homepage mockup | Step 4 references "the approved mockup as the exact spec" — does this exist yet? | No |

---

## Done

| # | Task | Done condition | Date | Notes |
|---|---|---|---|---|
| 0.1 | Write PRODUCT.md | Vision, user journey, design principles, verdict scale documented | 2026-03-13 | — |
| 0.2 | Write TECH.md | Stack, pipeline architecture, API routes, cost model documented | 2026-03-13 | — |
| 0.3 | Write DATA.md | Schema, indexes, tagging system, privacy model documented | 2026-03-13 | — |
| 0.4 | Write ADR 001 — Next.js | Framework decision recorded with reasoning | 2026-03-13 | — |
| 0.5 | Write ADR 002 — Anthropic API | AI provider decision recorded with migration path | 2026-03-13 | — |
| 0.6 | Write ADR 003 — Public anonymous commons | Data visibility model decision recorded | 2026-03-13 | — |
| 0.7 | Write ADR 004 — Donation funding model | Funding decision recorded, ad exclusion permanent | 2026-03-13 | — |
| 0.8 | Write README.md | Repo structure, quick start, env vars, doc index | 2026-03-13 | — |

---

## How to use this document

- **Starting work?** Check "Doing" for conflicts, check "Blocked by" on your task.
- **Finished a task?** Move it from Doing → Done with the date. Update any tasks it was blocking.
- **Found new work?** Add it to "Discovered work" first. Scope it, then move it into a phase.
- **Hit a decision point?** If it conflicts with an ADR, flag it in "Open questions" before proceeding.
