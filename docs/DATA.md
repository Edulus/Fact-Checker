# Data — Fact-Checker

## Overview

The database serves two purposes: storing individual claim verdicts for retrieval via shareable URLs, and powering the public commons — the growing, queryable record of every claim ever checked on the platform.

The database is Vercel Postgres (PostgreSQL).

---

## Schema

### Table: checks

The primary table. One row per claim submission.

```sql
CREATE TABLE checks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_raw       TEXT NOT NULL,
  claim_normalized TEXT NOT NULL,
  verdict         VARCHAR(20) NOT NULL CHECK (verdict IN ('true','partially_true','false')),
  color           VARCHAR(10) NOT NULL CHECK (color IN ('green','yellow','red')),
  confidence      SMALLINT NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  provenance      TEXT,
  amplifiers      JSONB,
  fallacies       TEXT[],
  sources_for     TEXT[],
  sources_against TEXT[],
  tags            TEXT[],
  checked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: tags

Materialized tag counts for the commons tag cloud. Updated on each new check.

```sql
CREATE TABLE tags (
  tag             VARCHAR(100) PRIMARY KEY,
  count           INTEGER NOT NULL DEFAULT 0,
  last_seen_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Data model notes

### claim_raw vs claim_normalized
`claim_raw` is exactly what the user typed. `claim_normalized` is the cleaned, reformulated version produced by the pipeline before analysis. Both are stored — the raw version for transparency, the normalized version for deduplication and search.

### amplifiers (JSONB)
Stored as a JSON array of objects:
```json
[
  {
    "name": "Sen. Ron Johnson",
    "role": "US Senator",
    "affiliation": "Republican Party",
    "lean": "right",
    "platform": "Twitter / TV appearances"
  }
]
```

### fallacies (TEXT[])
Array of fallacy names identified in the claim or its propagation. Examples:
- `post_hoc_ergo_propter_hoc`
- `false_equivalence`
- `appeal_to_emotion`
- `strawman`
- `appeal_to_authority`
- `false_pattern`
- `cherry_picking`

### tags (TEXT[])
Array of lowercase topic tags extracted by the AI from the claim content. Used to power the commons tag cloud and feed filtering. Examples: `vaccines`, `immigration`, `climate`, `economy`, `conspiracy`, `politics`, `health`.

---

## Indexes

```sql
CREATE INDEX idx_checks_checked_at ON checks (checked_at DESC);
CREATE INDEX idx_checks_verdict ON checks (verdict);
CREATE INDEX idx_checks_tags ON checks USING GIN (tags);
CREATE INDEX idx_checks_color ON checks (color);
```

---

## Commons queries

### Recent checks feed
```sql
SELECT id, claim_normalized, verdict, color, tags, checked_at
FROM checks
ORDER BY checked_at DESC
LIMIT 20;
```

### Tag cloud
```sql
SELECT tag, count
FROM tags
ORDER BY count DESC
LIMIT 30;
```

### Stats block
```sql
SELECT
  COUNT(*) AS total_checks,
  ROUND(100.0 * COUNT(*) FILTER (WHERE verdict = 'false') / COUNT(*)) AS false_pct,
  COUNT(DISTINCT unnest(tags)) AS distinct_topics
FROM checks;
```

---

## Tagging system

Tags are extracted by Claude during verdict generation. The prompt instructs the model to produce 2–5 lowercase, single-word or hyphenated tags that categorize the claim domain.

### Reserved / canonical tags
To maintain consistency, the prompt instructs Claude to prefer tags from a canonical list when applicable:

`vaccines` · `immigration` · `climate` · `economy` · `politics` · `health` · `crime` · `conspiracy` · `energy` · `finance` · `geopolitics` · `science` · `nutrition` · `elections` · `military` · `technology` · `religion` · `education` · `media` · `extremism`

Free-form tags are permitted when no canonical tag fits.

---

## Privacy model

- No user data is collected. There are no accounts.
- IP addresses are not stored.
- The only data stored is the claim text, the verdict, and the timestamp.
- All stored data is public and queryable.
- Users are informed of this before submitting a claim.
- The `claim_raw` field stores exactly what was typed — users should be aware their exact phrasing is recorded.

---

## Future: claim deduplication

When a new claim is submitted, a future version of the pipeline will check for semantically similar prior claims in the database. If a match above a similarity threshold is found, the prior verdict is surfaced immediately (with a note that it may be outdated) rather than running a full new analysis. This reduces cost and latency at scale.

This is not implemented in the MVP.
