# ADR 002 — Anthropic API for verdict generation

**Date:** 2026-03-13
**Status:** Accepted

## Context

The core product mechanic is AI-generated claim verdicts. The AI layer must:

1. Produce consistent, parseable JSON output on every call
2. Perform structured multi-step reasoning (provenance, fallacy detection, source evaluation)
3. Remain politically neutral in its analysis
4. Be fast enough for a user-facing product (target: under 5 seconds)

We evaluated three options:
- Anthropic Claude (claude-sonnet-4-6)
- DeepSeek V3 / R1
- OpenAI GPT-4o

Cost is a concern. The product is free and donation-funded. Per-check AI cost directly affects sustainability.

The optics of the AI provider are also a concern. Fact-Checker is a truth authority. If the underlying AI is perceived as politically compromised — particularly if it runs on Chinese infrastructure — that becomes an attack surface for users who want to dismiss verdicts.

## Decision

We chose Anthropic Claude (claude-sonnet-4-6) for the verdict generation layer at MVP stage.

Reasoning:
- Claude produces the most consistent structured JSON output of the options evaluated
- Claude's reasoning quality on analytical tasks (fallacy detection, source evaluation) is best-in-class
- Anthropic's model is US-based infrastructure, removing the Chinese-AI attack vector
- The cost is higher than DeepSeek but acceptable at low MVP volume

## Migration path

Once the MVP is proven and volume justifies cost optimization, the pipeline will be split:
- DeepSeek V3 handles the preliminary data-parsing pass (Wikipedia context, news aggregation, normalization) — cheaper, high volume
- Anthropic handles only the final verdict synthesis — smaller input, fewer tokens, lower cost

This hybrid approach retains the credibility of the Anthropic verdict while reducing overall per-check cost by an estimated 70–80%.

## Consequences

- Per-check cost at MVP: approximately $0.003–0.008 (Claude Sonnet)
- Verdict quality is highest available
- Anthropic API key required — stored as `ANTHROPIC_API_KEY` environment variable, never client-side
- Future migration to hybrid model is planned but not yet implemented
