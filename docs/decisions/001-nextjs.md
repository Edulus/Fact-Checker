# ADR 001 — Next.js as the application framework

**Date:** 2026-03-13
**Status:** Accepted

## Context

Fact-Checker requires a web application with both a public-facing UI and server-side API logic. The server-side logic handles sensitive API keys (Anthropic, NewsAPI), database writes, and the claim analysis pipeline. These cannot run in the browser.

We considered three options:
- React + Node.js (separate frontend and backend repos)
- Next.js fullstack (single repo, built-in API routes)
- Python backend + React frontend

The team is building with AI coding tools and wants to move fast on an MVP. Managing two separate repos and deployment targets adds friction without adding value at this stage.

## Decision

We chose Next.js with the App Router. A single repository handles both the UI and the API. API routes in `/app/api/` handle all server-side logic including the claim pipeline, database writes, and external API calls.

## Consequences

- One codebase, one deployment, one set of environment variables
- Vercel deployment is zero-config for Next.js — push to main, it deploys
- API routes keep all secret keys server-side
- TypeScript throughout for type safety on pipeline data structures
- If the backend ever needs to scale independently, extraction to a separate service is possible but not needed at MVP scale
