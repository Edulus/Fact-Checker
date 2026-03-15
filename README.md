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

| Document                        | Purpose                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| [PRODUCT.md](./docs/PRODUCT.md) | Vision, user journey, UX principles, verdict design, visual design          |
| [TECH.md](./docs/TECH.md)       | Stack, pipeline architecture, API integrations                              |
| [DATA.md](./docs/DATA.md)       | Database schema, data model, tagging system                                 |
| [decisions/](./docs/decisions/) | Architecture Decision Records — framework, AI provider, data model, funding |

---

## For Claude instances working on this project

Read `PRODUCT.md` first to understand what we are building and why. Then read `TECH.md` to understand the system. Read the relevant ADR before modifying any architectural decision. The ADRs exist so that reasoning is never lost — if you are about to make a decision that conflicts with an ADR, flag it explicitly rather than silently overriding it.

## Triage principle — bugs and ideas noticed during testing

When a bug, tweak, or improvement surfaces during testing, apply this filter before acting on it:

**Fix immediately if it is foundational:**

- Touches the data model (missing field, wrong type, schema decision that compounds over time)
- Affects the AI prompt output or JSON schema the pipeline depends on
- Breaks a core user flow — the app is unusable or wrong in a meaningful way
- Reveals a wrong architectural assumption

**Log it in Doing_ToDo_Done.md and keep moving if it is cosmetic or additive:**

- Visual tweaks — font size, spacing, wording, colour
- Nice-to-have features or ideas
- Bugs that do not block the critical path
- Improvements that occurred during testing but are unrelated to the current task

The tracker exists so that nothing is lost. The discipline is staying on the critical path until the app is genuinely functional end-to-end. Cosmetic work done before the database exists is work done on a foundation that isn't finished yet.
