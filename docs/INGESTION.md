# Data ingestion

## White House — Phase 1

Endpoint:

`GET /api/events/whitehouse`

The backend requests the official White House Remarks page and returns newly discoverable Trump-related entries.

### Timestamp safety rule

A publication date/time is not the same thing as the moment President Trump spoke.

For that reason the ingestion model keeps these fields separate:

- `sourcePublishedAt`
- `actualEventAt`
- `actualEventAtJst`
- `detectedAt`
- `timePrecision`
- `verificationStatus`

Until the actual speech/post time can be verified, `actualEventAt` remains null and the UI must display that the time is unconfirmed rather than guessing.

## Next adapters

- White House detail-page enrichment
- Truth Social public post ingestion (subject to confirmed access method/terms)
- official financial disclosure ingestion
- market-data provider adapter
- Japanese translation adapter
