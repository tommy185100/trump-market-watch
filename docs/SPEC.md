# Trump Market Watch — MVP Spec

## Purpose
トランプ氏の公開発言、公開取引、政策・政府契約と、関連銘柄の反応をJST基準で追跡する独立アプリ。

## Core entities
### Event
- id
- event_type
- speaker
- source_name
- source_url
- source_published_at
- spoken_at_original
- spoken_at_jst
- time_precision: exact | minute | approximate | unknown
- original_text
- japanese_translation
- japanese_summary
- verification_status
- created_at

### EventTicker
- event_id
- ticker
- company_name
- relation_type
- confidence

### MarketReaction
- event_id
- ticker
- price_at_event
- price_5m
- price_30m
- price_1h
- session_close
- volume_at_event
- updated_at

## Hard rules
1. JSTを主表示する。
2. 本人発言時刻と報道公開時刻は別カラムにする。
3. 発言時刻が確定できない場合は推測しない。
4. 日本語訳と投資家向け要約を分離する。
5. 原文・出典URL・取得時刻を保存する。
6. 自動分析は事実情報と明確に分離する。

## Phase 2
- Truth Social / White House / official disclosures ingest
- market data API
- desktop notification
- full-text search
- ticker watchlist
- event-to-price chart
