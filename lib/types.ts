export type TimePrecision = "exact" | "minute" | "date" | "approximate" | "unknown";

export type RelatedTicker = {
  ticker: string;
  companyName: string;
  matchedTerm: string;
  confidence: "high" | "medium";
};

export type MarketEvent = {
  id: string;
  eventType: "COMMENT" | "DISCLOSED_BUY" | "DISCLOSED_SELL" | "POLICY_CONTRACT";
  title: string;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedAt: string | null;
  actualEventAt: string | null;
  actualEventAtJst: string | null;
  timePrecision: TimePrecision;
  originalText: string | null;
  japaneseTranslation: string | null;
  japaneseSummary: string | null;
  relatedTickers: RelatedTicker[];
  verificationStatus: "source_verified" | "timestamp_unverified" | "unverified";
  detectedAt: string;
};
