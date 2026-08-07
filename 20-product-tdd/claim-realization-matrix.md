# Claim Realization Matrix

## Purpose

Map product claims to participating units and clarify each unit's technical responsibility.

## Current Baseline

- This file is initialized as a scaffold.
- Populate rows only for claims already accepted in PRD and already linked to implementation units.

| Product claim | Reference realization | Participating units | Evidence boundary |
| --- | --- | --- | --- |
| Collect external information into reusable units | Memos-compatible backend maps native requests to memo-family blocks, relations, resolver output, and storage-backed attachments | `core-py`; released MoeMemos client as acceptance actor | Bounded Memos 0.29.1-compatible API and MoeMemos Android 2.0.4 journey; not full Memos server or collector coverage |
| Reliably collect RSS and Atom feeds | RSS extension maps bounded RSS 2.0/Atom snapshots to feed, item, enclosure, full-text, and semantic-content graph state | `core-py` | Real-protocol HTTP doubles, PostgreSQL graph acceptance, optional live endpoint smoke, exact replay/update/state/enrichment cases; not a feed-reader product |
| Accept memo-like capture through familiar clients | Memos extension provides the first memo-family backend access mode | `core-py`; `client-web` for deployment-scoped extension configuration | Backend write/read, comments, attachments, hot credential replacement, hot enable/disable, and graph round-trip |
| Organize information in one reusable info-base | Explicit focal-block rumination is the first admitted organization approach; an Agent may add an ordinary graph interpretation while preserving the focal graph | `core-py`; `client-web` as an explicit trigger surface | Real-provider Resolver/Agent/Tool/graph journey and meaningful no-write boundary; not a complete organization taxonomy, periodic organizer, replacement, merge, or linking realization |
| Expose information for retrieval and downstream use | Semantic retrieval returns one bounded global ranking of existing Blocks/Relations and score metadata; feature and graph-navigation retrieval remain future | `core-py`; `client-web` and future Agent/application consumers | Pinned real Memos/RSS/Atom/HTML/storage corpus, real provider embedding and rumination, four top-three/distractor judgments, local and delegated Peer journeys; not answer generation or Chat InKCre |
| Retrieve semantically related info-base entities | Resolver/Relation projections feed profile-scoped derived embeddings; one domain facade executes locally or delegates the exact capability to an eligible Peer | `core-py`; `client-web` Peer consumer | Freshness/invalidation/maintenance checks, global Block/Relation ranking, real provider quality gate, exact-target and failover/outcome-unknown protocol cases |
