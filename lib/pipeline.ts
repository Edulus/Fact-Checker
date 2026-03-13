// Claim analysis pipeline
// See docs/TECH.md for the full pipeline specification

import { Verdict } from "./types";

export async function checkClaim(rawClaim: string): Promise<Verdict> {
  // TODO: Implement pipeline steps 1–6 per TECH.md
  // Step 1 — Normalize the claim
  // Step 2 — Wikipedia context fetch
  // Step 3 — News coverage fetch
  // Step 4 — Anthropic verdict generation
  // Step 5 — Persist to Postgres
  // Step 6 — Return verdict
  throw new Error("Pipeline not yet implemented");
}
