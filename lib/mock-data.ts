import { Verdict, CommonsData } from "./types";

export const MOCK_VERDICT: Verdict = {
  id: "c8a92f1d-4e3b-4f7a-9c1e-2b5d8f6a3e7c",
  claim:
    "The Great Wall of China is visible from space with the naked eye.",
  verdict: "false",
  color: "red",
  confidence: 94,
  provenance:
    "This claim has circulated since the early 20th century, appearing in textbooks and popular culture. It was definitively debunked by multiple astronauts, including Chinese astronaut Yang Liwei in 2003, who confirmed the Wall is not visible from low Earth orbit without aid. NASA has also confirmed this finding.",
  amplifiers: [
    {
      name: "Various textbook publishers",
      affiliation: "Educational publishing",
      lean: "center",
      platform: "Textbooks",
    },
    {
      name: "Ripley's Believe It or Not",
      affiliation: "Entertainment media",
      lean: "center",
      platform: "Television / print",
    },
  ],
  fallacies: ["appeal_to_authority", "false_pattern"],
  sources: {
    against: [
      "NASA — Astronaut observations confirm the Wall is not visible from orbit",
      "Yang Liwei (2003) — First Chinese astronaut stated he could not see it",
      "NASA Earth Observatory — Satellite imagery analysis",
    ],
    for: [
      "Richard Halliburton, 'Second Book of Marvels' (1938) — Early popularization of the claim",
    ],
  },
  tags: ["science", "geography", "conspiracy"],
  checkedAt: "2026-03-13T14:30:00Z",
};

export const MOCK_VERDICT_YELLOW: Verdict = {
  id: "a1b2c3d4-5678-9012-ef34-567890abcdef",
  claim: "Drinking eight glasses of water a day is medically necessary.",
  verdict: "partially_true",
  color: "yellow",
  confidence: 62,
  provenance:
    "The '8 glasses a day' recommendation has unclear origins, often attributed to a 1945 US Food and Nutrition Board report. The original report noted that most water intake comes from food. The recommendation was simplified and decontextualized over decades of repetition.",
  amplifiers: [
    {
      name: "Bottled water industry",
      affiliation: "Commercial interests",
      lean: "center",
      platform: "Advertising",
    },
  ],
  fallacies: ["cherry_picking"],
  sources: {
    against: [
      "British Medical Journal (2007) — No evidence for the 8-glass recommendation",
      "Dr. Heinz Valtin, Dartmouth — 'No scientific evidence' for 8x8 rule",
    ],
    for: [
      "US National Academies (2004) — Adequate intake is ~3.7L/day for men, but includes food",
    ],
  },
  tags: ["health", "nutrition"],
  checkedAt: "2026-03-13T13:15:00Z",
};

export const MOCK_VERDICT_GREEN: Verdict = {
  id: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
  claim: "Honey never spoils if stored properly.",
  verdict: "true",
  color: "green",
  confidence: 91,
  provenance:
    "Archaeological discoveries of 3,000-year-old honey in Egyptian tombs found it still edible. Honey's low moisture content, acidity, and natural hydrogen peroxide production create an inhospitable environment for bacteria and microorganisms.",
  amplifiers: [],
  fallacies: [],
  sources: {
    against: [],
    for: [
      "Smithsonian Magazine — Archaeological honey finds in Egyptian tombs",
      "National Honey Board — Chemical properties of honey preservation",
      "Journal of Food Science — Antimicrobial properties of honey",
    ],
  },
  tags: ["science", "nutrition"],
  checkedAt: "2026-03-13T11:45:00Z",
};

export const MOCK_COMMONS: CommonsData = {
  recentChecks: [MOCK_VERDICT, MOCK_VERDICT_YELLOW, MOCK_VERDICT_GREEN],
  tagCounts: [
    { tag: "politics", count: 847 },
    { tag: "health", count: 623 },
    { tag: "climate", count: 412 },
    { tag: "vaccines", count: 389 },
    { tag: "economy", count: 301 },
    { tag: "science", count: 276 },
    { tag: "immigration", count: 198 },
    { tag: "conspiracy", count: 187 },
    { tag: "elections", count: 156 },
    { tag: "nutrition", count: 134 },
    { tag: "crime", count: 121 },
    { tag: "energy", count: 98 },
    { tag: "technology", count: 87 },
    { tag: "geopolitics", count: 76 },
    { tag: "media", count: 65 },
  ],
  stats: {
    totalChecks: 4219,
    falsePct: 38,
    distinctTopics: 47,
  },
};
