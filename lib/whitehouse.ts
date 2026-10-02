import type { MarketEvent } from "./types";

const REMARKS_URL = "https://www.whitehouse.gov/remarks/";

function cleanText(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchWhiteHouseRemarks(): Promise<MarketEvent[]> {
  const response = await fetch(REMARKS_URL, {
    headers: { "User-Agent": "TrumpMarketWatch/0.1 (+public-information-monitor)" },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`White House fetch failed: ${response.status}`);
  }

  const html = await response.text();

  // The public page changes over time, so extraction is deliberately conservative.
  // A title/date can be stored as publication metadata, but NEVER promoted to
  // actualEventAt unless the source explicitly provides the event time.
  const anchors = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const seen = new Set<string>();
  const events: MarketEvent[] = [];

  for (const match of anchors) {
    const href = match[1];
    const title = cleanText(match[2]);

    if (!title || !/President Trump/i.test(title)) continue;

    const sourceUrl = href.startsWith("http")
      ? href
      : new URL(href, "https://www.whitehouse.gov").toString();

    if (seen.has(sourceUrl)) continue;
    seen.add(sourceUrl);

    events.push({
      id: `whitehouse:${sourceUrl}`,
      eventType: "COMMENT",
      title,
      sourceName: "The White House",
      sourceUrl,
      sourcePublishedAt: null,
      actualEventAt: null,
      actualEventAtJst: null,
      timePrecision: "unknown",
      originalText: null,
      japaneseTranslation: null,
      japaneseSummary: null,
      verificationStatus: "timestamp_unverified",
      detectedAt: new Date().toISOString()
    });

    if (events.length >= 20) break;
  }

  return events;
}
