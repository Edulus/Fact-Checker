# Fact-Checker

**Independent · Nonpartisan · Evidence-based**

Fact-Checker is a public claim verification platform. Any person can submit a claim they encountered — in conversation, on social media, in the news — and receive a structured, evidence-based verdict within seconds. Every check is recorded anonymously in a public commons that grows into a permanent, searchable database of verified and debunked claims.

The product ambition is cultural: to become the reflex reference that people cite the way they cite Wikipedia or Snopes. "I checked it on Fact-Checker" should become a natural sentence.

---

## Quick start

```bash
git clone https://github.com/your-org/fact-checker
cd fact-checker
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

```
ANTHROPIC_API_KEY=
NEWS_API_KEY=
POSTGRES_URL=
NEXT_PUBLIC_SITE_URL=
```

---

## Repository structure

```
/
├── app/                    # Next.js app router pages and API routes
│   ├── page.tsx            # Homepage — search input + commons feed
│   ├── result/[id]/        # Shareable verdict page
│   └── api/
│       ├── check/          # POST — runs the claim pipeline
│       └── commons/        # GET — returns recent checks and tag stats
├── components/             # React UI components
├── lib/                    # Pipeline logic, API clients, DB queries
├── docs/                   # All project documentation (you are here)
│   ├── PRODUCT.md
│   ├── TECH.md
│   ├── DATA.md
│   └── decisions/          # Architecture Decision Records (ADRs)
└── public/
```

---

## Documentation index

| Document | Purpose |
|---|---|
| [PRODUCT.md](./docs/PRODUCT.md) | Vision, user journey, UX principles, verdict design, visual design |
| [TECH.md](./docs/TECH.md) | Stack, pipeline architecture, API integrations |
| [DATA.md](./docs/DATA.md) | Database schema, data model, tagging system |
| [decisions/](./docs/decisions/) | Architecture Decision Records — framework, AI provider, data model, funding |

---

## For Claude instances working on this project

Read `PRODUCT.md` first to understand what we are building and why. Then read `TECH.md` to understand the system. Read the relevant ADR before modifying any architectural decision. The ADRs exist so that reasoning is never lost — if you are about to make a decision that conflicts with an ADR, flag it explicitly rather than silently overriding it.
