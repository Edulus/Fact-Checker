// Wikipedia API client
// Fetches background context for claim subjects

interface WikiSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikiSummary {
  title: string;
  extract: string;
}

export async function fetchWikipediaContext(claim: string): Promise<string> {
  try {
    // Step 1: Search for relevant articles
    const searchUrl = new URL("https://en.wikipedia.org/w/api.php");
    searchUrl.searchParams.set("action", "query");
    searchUrl.searchParams.set("list", "search");
    searchUrl.searchParams.set("srsearch", claim);
    searchUrl.searchParams.set("srlimit", "3");
    searchUrl.searchParams.set("format", "json");
    searchUrl.searchParams.set("origin", "*");

    const searchRes = await fetch(searchUrl.toString());
    if (!searchRes.ok) return "Wikipedia search failed.";

    const searchData = await searchRes.json();
    const results: WikiSearchResult[] = searchData?.query?.search || [];

    if (results.length === 0) return "No relevant Wikipedia articles found.";

    // Step 2: Get summaries for top results
    const summaries: string[] = [];

    for (const result of results.slice(0, 2)) {
      try {
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`;
        const summaryRes = await fetch(summaryUrl);
        if (summaryRes.ok) {
          const data: WikiSummary = await summaryRes.json();
          if (data.extract) {
            summaries.push(`[${data.title}]: ${data.extract}`);
          }
        }
      } catch {
        // Skip individual article failures
      }
    }

    return summaries.length > 0
      ? summaries.join("\n\n")
      : "No relevant Wikipedia summaries retrieved.";
  } catch (error) {
    console.error("Wikipedia fetch error:", error);
    return "Wikipedia context unavailable.";
  }
}
