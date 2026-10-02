import type { RelatedTicker } from "./types";

const COMPANIES = [
  { ticker: "AAPL", companyName: "Apple", terms: ["Apple", "iPhone"] },
  { ticker: "INTC", companyName: "Intel", terms: ["Intel"] },
  { ticker: "DELL", companyName: "Dell Technologies", terms: ["Dell", "Dell Technologies"] },
  { ticker: "NVDA", companyName: "NVIDIA", terms: ["NVIDIA", "Nvidia"] },
  { ticker: "AMD", companyName: "Advanced Micro Devices", terms: ["AMD", "Advanced Micro Devices"] },
  { ticker: "TSLA", companyName: "Tesla", terms: ["Tesla"] },
  { ticker: "META", companyName: "Meta Platforms", terms: ["Meta", "Facebook"] },
  { ticker: "GOOGL", companyName: "Alphabet", terms: ["Google", "Alphabet"] },
  { ticker: "AMZN", companyName: "Amazon", terms: ["Amazon"] },
  { ticker: "MSFT", companyName: "Microsoft", terms: ["Microsoft"] },
  { ticker: "BA", companyName: "Boeing", terms: ["Boeing"] },
  { ticker: "F", companyName: "Ford Motor", terms: ["Ford"] },
  { ticker: "GM", companyName: "General Motors", terms: ["General Motors"] },
  { ticker: "JPM", companyName: "JPMorgan Chase", terms: ["JPMorgan", "J.P. Morgan"] }
] as const;

export function detectRelatedTickers(text: string): RelatedTicker[] {
  const haystack = text.toLowerCase();
  const results: RelatedTicker[] = [];
  for (const company of COMPANIES) {
    const matched = company.terms.find(term => haystack.includes(term.toLowerCase()));
    if (matched) results.push({ ticker: company.ticker, companyName: company.companyName, matchedTerm: matched, confidence: "high" });
  }
  return results;
}
