# Product — Fact-Checker

## Vision

Fact-Checker is a public truth infrastructure. Its purpose is to give anyone — regardless of technical sophistication or political affiliation — an immediate, trustworthy verdict on any claim they encounter.

The product is designed to become a cultural reflex. The goal is that people say "I checked it on Fact-Checker" the way they say "I looked it up on Wikipedia." This requires the product to be fast, authoritative, visually neutral, and easy to share.

The platform is free, anonymous, and public. There are no accounts, no tracking, and no ads. Sustainability comes from donations by people who believe in fighting disinformation — the Wikipedia funding model.

---

## The problem

Existing fact-checking resources are trusted by some and dismissed by others:

- **Wikipedia** — dismissed as editable by anyone, politically manipulated
- **Snopes** — perceived as politically left-leaning by right-leaning users
- **Google** — perceived as manipulated, algorithmically biased

Fact-Checker addresses this not by claiming to be unbiased, but by making its methodology transparent and mechanical. The verdict is a composite of multiple independent sources. The reasoning is shown, not just the conclusion.

---

## User journey

1. A person hears or reads a claim — in conversation, on social media, in a news article
2. They think "let me check that"
3. They go to Fact-Checker because they trust it
4. The interface helps them articulate the claim clearly
5. They submit the claim
6. Within seconds they receive a structured verdict card:
   - A red / yellow / green verdict with confidence level
   - Provenance — where the claim likely originated and how it spread
   - Amplifiers — who spread it, their political affiliations
   - Fallacies detected — what rhetorical tricks were used
   - Source credibility — who supports and who contradicts the claim
7. They copy the shareable link and send it: "I checked your claim on Fact-Checker, here is the result"

The shareable link is the core viral mechanic. Every verdict must be linkable, screenshot-able, and self-contained.

---

## Design principles

### Neutral by appearance
The visual design must signal independence and objectivity before the user reads a word. It should feel closer to the New York Times or Wikipedia than to a political blog or a tech startup. Clean, typographic, unhurried.

### The verdict color is the only color
Red, yellow, and green are used exclusively for verdicts. The rest of the interface is black, white, and gray. This ensures the verdict has maximum visual weight and is never confused with decoration.

### Show the reasoning, not just the conclusion
A verdict without explanation is just another opinion. Every verdict card exposes the four pillars — provenance, amplifiers, fallacies, sources — so the user understands how the conclusion was reached. This is the primary defense against accusations of bias.

### Shareable by default
Every result has a permanent URL. The share link is prominent on every verdict card. The product succeeds when result links circulate in conversations and social media.

### Anonymous and public
No accounts are required. No user data is collected. Every claim check is recorded publicly in the commons. Users understand this before submitting — the product is transparent that nothing is private.

### Fast
A verdict should arrive within 5–10 seconds. Speed is trust. A slow response signals uncertainty or complexity. The pipeline must be optimized for latency.

---

## The commons

Every claim check is added to a public database — the commons. This database:

- Grows continuously as users submit claims
- Is publicly readable without an account
- Is tagged by topic, enabling trend analysis
- Displays a live feed of recent checks on the homepage
- Shows aggregate stats: total checks, false/misleading rate, topic distribution
- Becomes a research resource over time — journalists, academics, and researchers can query it

The commons is the product's long-term value. The AI verdict is the immediate value. Both matter.

---

## Verdict scale

| Color | Label options | Meaning |
|---|---|---|
| Green | True / Mostly true | Claim is supported by evidence |
| Yellow | Partially true / Misleading / Outdated / Unverifiable | Claim contains truth but lacks context, is out of date, or cannot be confirmed |
| Red | False / Debunked / Fabricated | Claim is contradicted by evidence |

Confidence percentage (0–100%) accompanies every verdict, reflecting the strength of available evidence.

---

## Verdict design

The verdict must be immediately legible, shareable, and impossible to misread — as a screenshot, a link preview, or in a text message.

We use a three-color system (red / yellow / green) with a text label and a confidence percentage.

| Color | Label examples | Meaning |
|---|---|---|
| Green | True / Mostly true | Supported by evidence |
| Yellow | Partially true / Misleading / Outdated / Unverifiable | Mixed, incomplete, or unconfirmable |
| Red | False / Debunked / Fabricated | Contradicted by evidence |

The color is displayed as a filled circle — prominent, unambiguous. The text label varies within each color depending on the nature of the claim. The confidence percentage (0–100%) signals evidential strength without requiring a numeric scale.

Red / yellow / green maps to universal stoplight cognition. It is cross-cultural, pre-linguistic, and immediately understood. Numeric scores invite false precision and are hard to share verbally. Multi-axis scores are intellectually rigorous but cognitively expensive for someone who just wants to paste a result into a conversation.

**Implementation rules:**
- Edge cases default to yellow rather than forcing a binary verdict
- Confidence below ~60% produces yellow regardless of directional lean
- The text label is AI-generated within a constrained vocabulary to prevent inconsistent phrasing

---

## Visual design

The design references the New York Times and Wikipedia — institutions with broad cross-partisan recognition as serious, neutral reference sources. The goal is that the product signals independence and objectivity before the user reads a word.

**Typography-first.** The product is about text. A serif font is used for the logo, claims, and verdict text. Sans-serif for UI elements and metadata.

**The verdict color is the only color.** The rest of the interface is black, white, and gray. This gives the verdict maximum visual weight and prevents it from being confused with decoration. Blue and red are specifically avoided — they carry strong US political connotations.

**No gradients, no drop shadows, no decorative effects.** The UI should feel like a document, not a product. Clean borders, generous whitespace, flat surfaces.

**The logo is typographic.** "Fact-Checker" in a serif font. No icon, no symbol, no logomark at launch. Institutional seriousness over startup personality.

**What we are explicitly avoiding:**
- Purple gradients or any AI-product aesthetic
- Bright accent colors
- Rounded, friendly, consumer-app styling
- Anything that reads as partisan
- Startup-style hero sections or marketing copy

The design should be legible and trustworthy to a 65-year-old newspaper reader and a 25-year-old digital native alike. When in doubt: does this look like it belongs in a broadsheet newspaper?

---

## What Fact-Checker is not

- It is not a news aggregator
- It is not a media bias rater
- It is not a political commentary platform
- It does not target specific politicians or public figures as a primary use case
- It does not take editorial positions

It evaluates claims. That is the entire scope.

---

## Funding model

Free to use. Sustained by donations from individuals who support truth-seeking and the fight against disinformation. Inspired by the Wikipedia donation model. Institutional grants from journalism and democracy-focused foundations (Knight Foundation, Mozilla Foundation, etc.) are appropriate bridge funding while donation volume scales.

No advertising. No sponsored content. No pay-to-check model.
