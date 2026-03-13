// Claim analysis pipeline
// See docs/TECH.md for the full pipeline specification

export interface Verdict {
  id: string;
  claim: string;
  verdict: "true" | "partially_true" | "false";
  color: "green" | "yellow" | "red";
  confidence: number;
  provenance: string;
  amplifiers: Amplifier[];
  fallacies: string[];
  sources: {
    against: string[];
    for: string[];
  };
  tags: string[];
  checkedAt: string;
}

export interface Amplifier {
  name: string;
  role?: string;
  affiliation?: string;
  lean?: string;
  platform?: string;
}

export async function checkClaim(rawClaim: string): Promise<Verdict> {
  // TODO: Implement pipeline steps 1–6 per TECH.md
  throw new Error("Pipeline not yet implemented");
}
