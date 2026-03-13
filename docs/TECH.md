# Tech — Fact-Checker

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | Fullstack in one repo, built-in API routes, fast Vercel deployment |
| Deployment | Vercel | Zero-config for Next.js, free tier sufficient for MVP |
| Database | Vercel Postgres | Native integration, no separate infrastructure, free tier generous |
| AI — verdict | Anthropic Claude (claude-sonnet-4-6) | Best structured reasoning and JSON output quality for verdict generation |
| AI — cost optimization | DeepSeek V3 (future) | Migration target for high-volume processing once MVP is proven |
| News data | NewsAPI | Real-time news coverage for amplifier analysis |
| Background context | Wikipedia API | Free, stable, high-quality factual background on claim subjects |
| Styling | Tailwind CSS | Rapid, consistent, utility-first |
| Language | TypeScript | Type safety for the pipeline data structures |

---

## Architecture overview

```
User submits claim
       ↓
Next.js API route /api/check (POST)
       ↓
  ┌────┴────┐
  │         │
Wikipedia  NewsAPI
  API      coverage
  │         │
  └────┬────┘
       ↓
Anthropic API
(structured verdict prompt)
       ↓
JSON verdict object
       ↓
  ┌────┴────┐
  │         │
Save to   Return to
Postgres   client
  │
  ↓
Permanent result URL
/result/[id]
```

---

## The claim pipeline

Every claim check runs this sequence in `/lib/pipeline.ts`:

### Step 1 — Normalize the claim
The raw user input is cleaned and normalized. Vague or incomplete claims are reformulated into a clear, checkable proposition before processing.

### Step 2 — Wikipedia context fetch
Query the Wikipedia API for articles related to the claim subject. Returns background facts, sourcing, and related topics. This provides the factual foundation for the verdict.

```
GET https://en.wikipedia.org/api/rest_v1/page/summary/{topic}
GET https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={claim}
```

### Step 3 — News coverage fetch
Query NewsAPI for recent articles related to the claim. Used to identify who is amplifying the claim, from what outlets, and with what political lean.

```
GET https://newsapi.org/v2/everything?q={claim}&sortBy=relevance
```

### Step 4 — Anthropic verdict generation
Feed normalized claim + Wikipedia context + news coverage into Claude. The prompt requests a structured JSON response with five fields: verdict, confidence, provenance, amplifiers, fallacies, sources. See `/lib/prompts.ts` for the full system prompt.

### Step 5 — Persist to Postgres
Save the full result to the `checks` table with a generated UUID, timestamp, extracted tags, and verdict color.

### Step 6 — Return verdict
Return the JSON verdict to the client. The UI renders the verdict card.

---

## API routes

### POST /api/check
Runs the full claim pipeline.

Request body:
```json
{ "claim": "string" }
```

Response:
```json
{
  "id": "c8a92f1d",
  "claim": "string",
  "verdict": "false | partially_true | true",
  "color": "red | yellow | green",
  "confidence": 94,
  "provenance": "string",
  "amplifiers": [{ "name": "string", "affiliation": "string", "lean": "string" }],
  "fallacies": ["string"],
  "sources": {
    "against": ["string"],
    "for": ["string"]
  },
  "tags": ["string"],
  "checkedAt": "ISO timestamp"
}
```

### GET /api/commons
Returns recent checks and tag stats for the commons feed.

Response:
```json
{
  "recentChecks": [...],
  "tagCounts": [{ "tag": "string", "count": number }],
  "stats": {
    "totalChecks": number,
    "falsePct": number,
    "distinctTopics": number
  }
}
```

---

## AI prompt strategy

The Anthropic prompt is the most critical piece of engineering in this product. It must produce:

1. Consistent, parseable JSON every time
2. Defensible, evidence-grounded reasoning
3. Accurate fallacy identification
4. Political lean detection without itself being politically biased

The system prompt instructs Claude to act as a neutral forensic analyst, not an opinion writer. It emphasizes sourcing claims to specific evidence, flagging uncertainty with lower confidence scores rather than forcing a verdict, and never editorializing.

See `/lib/prompts.ts` for the full system prompt.

---

## Cost model

At MVP scale (low volume):
- Anthropic API: ~$0.003–0.008 per check (Claude Sonnet)
- NewsAPI: free tier covers 100 requests/day, $449/mo for 250k requests
- Wikipedia API: free
- Vercel Postgres: free tier covers ~60k rows

At scale, the expensive step is the Anthropic call. Migration path to DeepSeek V3 for the initial analysis pass (keeping Anthropic only for final verdict synthesis) can reduce per-check cost by ~80%.

---

## Shareable result URLs

Every result is stored with a UUID and accessible at `/result/[uuid]`. This page is statically renderable from the database — fast load, good SEO, fully self-contained. It is the primary sharing mechanic.

The URL format is: `fact-checker.com/result/c8a92f1d`

---

## What is not built yet

- Browser extension (future) — puts Fact-Checker one click from any webpage
- API access for journalists and researchers (future)
- Full-text search of the commons (future)
- Claim deduplication — detecting when a new submission matches a prior check (future)
