export interface Amplifier {
  name: string;
  role?: string;
  affiliation?: string;
  lean?: string;
  platform?: string;
}

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

export interface TagCount {
  tag: string;
  count: number;
}

export interface CommonsStats {
  totalChecks: number;
  falsePct: number;
  distinctTopics: number;
}

export interface CommonsData {
  recentChecks: Verdict[];
  tagCounts: TagCount[];
  stats: CommonsStats;
}
