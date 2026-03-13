// NewsAPI client
// Fetches recent news coverage for amplifier analysis

interface NewsArticle {
  source: { name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
}

export async function fetchNewsContext(claim: string): Promise<string> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return "NewsAPI key not configured.";

  try {
    // Extract key terms from claim (first 100 chars to avoid overly long queries)
    const query = claim.slice(0, 100);

    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query);
    url.searchParams.set("sortBy", "relevance");
    url.searchParams.set("pageSize", "5");
    url.searchParams.set("language", "en");
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error("NewsAPI error:", errData);
      return "News coverage search failed.";
    }

    const data = await res.json();
    const articles: NewsArticle[] = data?.articles || [];

    if (articles.length === 0) return "No recent news coverage found.";

    const summaries = articles.map((a) => {
      const author = a.author ? ` by ${a.author}` : "";
      const desc = a.description || "No description.";
      return `[${a.source.name}${author}, ${a.publishedAt.slice(0, 10)}]: ${a.title}. ${desc}`;
    });

    return summaries.join("\n\n");
  } catch (error) {
    console.error("NewsAPI fetch error:", error);
    return "News coverage unavailable.";
  }
}
