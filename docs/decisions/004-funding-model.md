# ADR 004 — Donation-based funding model

**Date:** 2026-03-13
**Status:** Accepted

## Context

Fact-Checker's credibility depends on its independence. The funding model is therefore a product decision, not just a business decision. Any funding model that creates real or perceived conflicts of interest undermines the core product.

Options considered:
1. Advertising
2. Subscription / freemium
3. Institutional grants only
4. Donations (Wikipedia model)
5. API licensing to journalists and institutions

## Decision

The primary funding model is public donations from individuals who support truth-seeking and the fight against disinformation, supplemented by institutional grants during early growth.

Advertising is permanently excluded. Sponsored content is permanently excluded. There is no pay-to-check tier.

## Reasoning

**Advertising** creates direct conflict of interest — advertisers may be the subject of claims, and ad-supported models incentivize engagement over accuracy.

**Subscriptions** limit reach. A fact-checker behind a paywall cannot become a cultural reflex. The product only succeeds if anyone can use it at any moment without friction.

**Grants** alone create dependency on grant-making institutions and their priorities. Acceptable as a bridge, not as a foundation.

**Donations** follow trust. Trust follows consistent, accurate verdicts. The sequence is correct. Wikipedia has demonstrated this model is viable at scale. The donor base for epistemic tools — people who care about truth and disinformation — is real and motivated.

**API licensing** is a valid future revenue stream (journalists, researchers, academic institutions) that does not compromise the public product.

## Consequences

- Product launches free with no monetization at MVP
- Donation infrastructure needed before significant traffic (Stripe or similar)
- Grant applications to Knight Foundation, Mozilla Foundation, and journalism-focused nonprofits are appropriate early funding
- API licensing roadmap should be designed so it never restricts public access to the free product
- The "no ads, no sponsors" commitment should be stated explicitly in the product UI and documentation as a trust signal
