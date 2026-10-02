type EventType = "COMMENT" | "DISCLOSED BUY" | "DISCLOSED SELL" | "POLICY / CONTRACT";

type EventItem = {
  id: number;
  jst: string;
  sourceTime: string;
  ticker: string;
  company: string;
  type: EventType;
  source: string;
  original: string;
  translation: string;
  summary: string;
  priceAtEvent: string;
  after5m: string;
  after30m: string;
  after1h: string;
};

const events: EventItem[] = [
  {
    id: 1,
    jst: "2026/06/18 23:42:17",
    sourceTime: "2026/06/18 10:42:17 EDT",
    ticker: "INTC",
    company: "Intel",
    type: "COMMENT",
    source: "White House / media report",
    original: "Sample event. Replace with verified source text.",
    translation: "サンプル表示です。実運用では検証済みの原文を日本語訳して表示します。",
    summary: "AppleとIntelの米国内半導体協業に関する発言",
    priceAtEvent: "—",
    after5m: "—",
    after30m: "—",
    after1h: "—"
  },
  {
    id: 2,
    jst: "2026/06/24 22:00:00",
    sourceTime: "Disclosure time",
    ticker: "DELL",
    company: "Dell Technologies",
    type: "DISCLOSED BUY",
    source: "Public disclosure",
    original: "Public transaction disclosure",
    translation: "公開取引開示",
    summary: "公開口座での購入を確認",
    priceAtEvent: "—",
    after5m: "—",
    after30m: "—",
    after1h: "—"
  }
];

const badgeClass: Record<EventType, string> = {
  COMMENT: "badge blue",
  "DISCLOSED BUY": "badge green",
  "DISCLOSED SELL": "badge red",
  "POLICY / CONTRACT": "badge amber"
};

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div>
          <div className="eyebrow">JST-FIRST MARKET INTELLIGENCE</div>
          <h1>Trump Market Watch</h1>
          <p>発言時刻・日本語訳・関連銘柄・株価反応を一画面で追跡</p>
        </div>
        <div className="live">● LIVE MONITOR</div>
      </header>

      <section className="stats">
        <div className="stat"><span>最新シグナル</span><strong>INTC</strong><small>23:42:17 JST</small></div>
        <div className="stat"><span>今日の発言</span><strong>1</strong><small>sample data</small></div>
        <div className="stat"><span>公開取引</span><strong>1</strong><small>sample data</small></div>
        <div className="stat"><span>時刻精度</span><strong>JST</strong><small>発言 / 報道を分離</small></div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <span className="sectionLabel">LATEST SIGNALS</span>
            <h2>最新イベント</h2>
          </div>
          <div className="filters">
            <button>すべて</button>
            <button>発言</button>
            <button>公開取引</button>
            <button>政策</button>
          </div>
        </div>

        <div className="timeline">
          {events.map((event) => (
            <article className="card" key={event.id}>
              <div className="cardTop">
                <div>
                  <span className={badgeClass[event.type]}>{event.type}</span>
                  <span className="ticker">{event.ticker}</span>
                  <span className="company">{event.company}</span>
                </div>
                <div className="timeBox">
                  <strong>{event.jst} JST</strong>
                  <small>{event.sourceTime}</small>
                </div>
              </div>

              <div className="grid">
                <div className="contentCol">
                  <div className="summary">{event.summary}</div>
                  <div className="block">
                    <label>🇯🇵 日本語訳</label>
                    <p>{event.translation}</p>
                  </div>
                  <div className="block muted">
                    <label>🇺🇸 原文</label>
                    <p>{event.original}</p>
                  </div>
                  <div className="source">出典: {event.source}</div>
                </div>

                <div className="marketCol">
                  <div className="marketRow"><span>発言時</span><strong>{event.priceAtEvent}</strong></div>
                  <div className="marketRow"><span>5分後</span><strong>{event.after5m}</strong></div>
                  <div className="marketRow"><span>30分後</span><strong>{event.after30m}</strong></div>
                  <div className="marketRow"><span>1時間後</span><strong>{event.after1h}</strong></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <span className="sectionLabel">DESIGN RULE</span>
            <h2>時刻の扱い</h2>
          </div>
        </div>
        <div className="rules">
          <div><strong>01</strong><span>すべてJSTを主表示</span></div>
          <div><strong>02</strong><span>本人発言時刻と報道公開時刻を別保存</span></div>
          <div><strong>03</strong><span>分単位で確認できない場合は推測しない</span></div>
          <div><strong>04</strong><span>原文・日本語訳・1行要約を分離</span></div>
        </div>
      </section>
    </main>
  );
}
