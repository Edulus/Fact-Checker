import Anthropic from "@anthropic-ai/sdk";
import { Verdict } from "./types";
import { VERDICT_SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { fetchWikipediaContext } from "./wikipedia";
import { fetchNewsContext } from "./newsapi";

function verdictToColor(verdict: string): "green" | "yellow" | "red" {
  switch (verdict) {
    case "true":
      return "green";
    case "false":
      return "red";
    default:
      return "yellow";
  }
}

export async function checkClaim(rawClaim: string): Promise<Verdict> {
  // Step 1 — Normalize (light cleanup for MVP)
  const claim = rawClaim.trim().replace(/\s+/g, " ");

  // Step 2 — Wikipedia context fetch
  const wikipediaContext = await fetchWikipediaContext(claim);

  // Step 3 — News coverage fetch
  const newsContext = await fetchNewsContext(claim);

  // Step 4 — Anthropic verdict generation
  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    temperature: 0,
    system: VERDICT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(claim, wikipediaContext, newsContext),
      },
    ],
  });

  // Extract text from response
  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Anthropic");
  }

  // Parse JSON verdict
  let parsed;
  try {
    // Strip any accidental markdown fencing
    const clean = textBlock.text.replace(/```json\s?|```/g, "").trim();
    parsed = JSON.parse(clean);
  } catch {
    console.error("Failed to parse verdict JSON:", textBlock.text);
    throw new Error("Failed to parse AI verdict");
  }

  // Step 5 — Persist to Postgres (TODO: wire when DB is connected)
  const id = crypto.randomUUID();

  // Step 6 — Return verdict
  const verdict: Verdict = {
    id,
    claim,
    verdict: parsed.verdict || "partially_true",
    color: verdictToColor(parsed.verdict),
    confidence: Math.min(100, Math.max(0, parsed.confidence || 50)),
    provenance: parsed.provenance || "Unable to determine provenance.",
    amplifiers: Array.isArray(parsed.amplifiers) ? parsed.amplifiers : [],
    fallacies: Array.isArray(parsed.fallacies) ? parsed.fallacies : [],
    sources: {
      against: Array.isArray(parsed.sources?.against)
        ? parsed.sources.against
        : [],
      for: Array.isArray(parsed.sources?.for) ? parsed.sources.for : [],
    },
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    checkedAt: new Date().toISOString(),
  };

  return verdict;
}
