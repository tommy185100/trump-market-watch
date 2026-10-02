import type { MarketEvent } from "../lib/types";
import { fetchWhiteHouseRemarks } from "../lib/whitehouse";

function formatJst(value: string | null) {
  if (!value) return "発言時刻：確認できず";
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(new Date(value)) + " JST";
}

function verificationLabel(event: MarketEvent) {
  if (event.timePrecision === "exact") return "時刻確認済み";
  if (event.timePrecision === "minute") return "分単位で確認";
  return "実発言時刻 未確認";
}

export default async function Home() {
  let events: MarketEvent[] = [];
  let fetchError = "";

  try {
    events = await fetchWhiteHouseRemarks();
  } catch (error) {
    fetchError = error instanceof Error ? error.message : "取得エラー";
  }

  return (
    <main>
      <header className="topbar">
        <div>
          <div className="eyebrow">JST-FIRST MARKET INTELLIGENCE</div>
          <h1>Trump Market Watch</h1>
          <p>公開情報の取得時刻・実発言時刻・日本語化・関連銘柄を分離して追跡</p>
        </div>
        <div className={fetchError ? "live error" : "live"}>
          {fetchError ? "● SOURCE ERROR" : "● WHITE HOUSE CONNECTED"}
        </div>
      </header>

      <section className="stats">
        <div className="stat"><span>White House取得</span><strong>{events.length}</strong><small>最新取得結果</small></div>
        <div className="stat"><span>実データ</span><strong>{fetchError ? "NG" : "LIVE"}</strong><small>サンプル表示なし</small></div>
        <div className="stat"><span>基準時刻</span><strong>JST</strong><small>Asia/Tokyo</small></div>
        <div className="stat"><span>時刻ルール</span><strong>厳格</strong><small>未確認は推測しない</small></div>
      </section>

      {fetchError && (
        <section className="panel">
          <span className="sectionLabel">SOURCE ERROR</span>
          <h2>White Houseから取得できませんでした</h2>
          <p className="source">{fetchError}</p>
        </section>
      )}

      <section className="panel">
        <div className="panelHeader">
          <div>
            <span className="sectionLabel">OFFICIAL SOURCE — LIVE DATA</span>
            <h2>White House 最新発言・Remarks</h2>
          </div>
          <div className="filters">
            <button>White House</button>
            <button disabled>Truth Social（次段階）</button>
            <button disabled>公開取引（次段階）</button>
          </div>
        </div>

        <div className="timeline">
          {events.length === 0 && !fetchError && (
            <div className="empty">現在の取得条件に一致する項目はありません。</div>
          )}

          {events.map((event) => (
            <article className="card" key={event.id}>
              <div className="cardTop">
                <div>
                  <span className="badge blue">COMMENT</span>
                  <span className="ticker">{event.relatedTickers[0]?.ticker ?? "TRUMP"}</span>
                  <span className="company">{event.relatedTickers.length ? event.relatedTickers.map(t => t.companyName).join(" / ") : "Official remarks"}</span>
                </div>
                <div className="timeBox">
                  <strong>{formatJst(event.actualEventAtJst)}</strong>
                  <small>{verificationLabel(event)}</small>
                </div>
              </div>

              <div className="grid">
                <div className="contentCol">
                  <div className="summary">{event.japaneseSummary ?? event.title}</div>
                  <div className="block">
                    <label>🇯🇵 日本語訳</label>
                    <p>{event.japaneseTranslation ?? "翻訳API未設定、または翻訳処理に失敗しました"}</p>
                  </div>
                  <div className="block muted">
                    <label>🇺🇸 原文</label>
                    <p>{event.originalText ? event.originalText.slice(0, 1800) : "本文を取得できませんでした"}</p>
                  </div>
                  <div className="source">
                    出典: <a href={event.sourceUrl} target="_blank" rel="noreferrer">{event.sourceName}</a>
                    {" "} / 検知: {formatJst(event.detectedAt)}
                  </div>
                </div>

                <div className="marketCol">
                  <div className="marketRow"><span>関連Ticker</span><strong>{event.relatedTickers.length ? event.relatedTickers.map(t => t.ticker).join(", ") : "検出なし"}</strong></div>
                  <div className="marketRow"><span>発言時</span><strong>—</strong></div>
                  <div className="marketRow"><span>5分後</span><strong>—</strong></div>
                  <div className="marketRow"><span>30分後</span><strong>—</strong></div>
                  <div className="marketRow"><span>1時間後</span><strong>—</strong></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <span className="sectionLabel">TIMESTAMP SAFETY</span>
            <h2>時刻の扱い</h2>
          </div>
        </div>
        <div className="rules">
          <div><strong>01</strong><span>すべてJSTを主表示</span></div>
          <div><strong>02</strong><span>実発言時刻と掲載時刻を別保存</span></div>
          <div><strong>03</strong><span>確認できない時刻は推測しない</span></div>
          <div><strong>04</strong><span>翻訳と分析を別データとして保存</span></div>
        </div>
      </section>
    </main>
  );
}
