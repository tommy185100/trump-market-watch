type TranslationResult = {
  translation: string | null;
  summary: string | null;
  status: "translated" | "not_configured" | "failed";
};

function extractOutputText(payload: any): string {
  if (typeof payload?.output_text === "string") return payload.output_text;
  const parts = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of parts) {
    if (!Array.isArray(item?.content)) continue;
    for (const content of item.content) {
      if (content?.type === "output_text" && typeof content?.text === "string") return content.text;
    }
  }
  return "";
}

export async function translateMarketText(title: string, originalText: string): Promise<TranslationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { translation: null, summary: null, status: "not_configured" };

  const input = [
    "次の米国政府公式テキストを日本語化してください。",
    "政治的評価・支持・批判・投資推奨は加えず、原文の意味を忠実に保ってください。",
    "企業や製品への単なる言及を『買い推奨』などに変換しないでください。",
    "JSONのみ返してください。形式: {\"translation\":\"忠実な日本語訳\",\"summary\":\"投資家が関連企業を把握するための事実ベースの1行要約\"}",
    "",
    "TITLE:",
    title,
    "",
    "TEXT:",
    originalText.slice(0, 12000)
  ].join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TRANSLATION_MODEL || "gpt-6-luna",
        input,
        max_output_tokens: 3000
      }),
      cache: "no-store"
    });
    if (!response.ok) return { translation: null, summary: null, status: "failed" };
    const payload = await response.json();
    const text = extractOutputText(payload).trim().replace(/^\`\`\`json\s*/i, "").replace(/\`\`\`$/,"").trim();
    const parsed = JSON.parse(text);
    return {
      translation: typeof parsed.translation === "string" ? parsed.translation : null,
      summary: typeof parsed.summary === "string" ? parsed.summary : null,
      status: "translated"
    };
  } catch {
    return { translation: null, summary: null, status: "failed" };
  }
}
