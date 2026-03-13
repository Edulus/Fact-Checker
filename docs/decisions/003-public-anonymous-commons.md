# ADR 003 — Public anonymous commons model

**Date:** 2026-03-13
**Status:** Accepted

## Context

Every claim submitted to Fact-Checker produces a verdict that has value beyond the individual user. Aggregated, these verdicts form a growing database of verified and debunked claims — a public resource for journalists, researchers, educators, and anyone trying to understand what misinformation is circulating.

We considered three data visibility models:
1. Private — user checks are not shared, results only visible to the submitter
2. Opt-in public — users choose whether to add their check to the commons
3. Public by default, anonymous — all checks are recorded publicly, no account required, no personal data collected

## Decision

We chose public by default, anonymous. All claim checks are recorded in the public commons immediately. No user accounts exist. No personal data — including IP addresses — is stored. The only data retained is the claim text, verdict, tags, and timestamp.

Users are informed of this model before submitting. The phrasing is: "All checks are public and anonymous. Do not submit personally identifying information."

## Reasoning

The opt-in model produces a sparse, biased dataset — only users who actively choose to contribute will do so, and those users may not be representative. The public-by-default model creates a complete record.

The anonymity model eliminates privacy concerns that would otherwise require accounts, consent flows, GDPR compliance infrastructure, and ongoing data management. It also removes any incentive for gaming — there is no reputation, score, or identity attached to submissions.

The commons is the long-term value of the product. A sparse commons is significantly less useful as a research resource than a complete one.

## Consequences

- No accounts, no authentication infrastructure needed at MVP
- No GDPR / personal data compliance burden for the check record itself
- The `claim_raw` field stores the user's exact wording — users must be warned not to include personal information in claims
- The commons is immediately public and queryable — no moderation layer at MVP
- Future: a moderation or flagging system may be needed if users submit harmful or personal content disguised as claims
