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
| Preserve email communication records for later use | Mail extension maps protocol-neutral Mail facts to source, mailbox, canonical email, participant, body, MIME, flag, and reply/reference graph state; remote MIME bytes are materialized lazily | `core-py`; `client-web` as Job peer, info-base navigation host, and resolver consumer | Real Dovecot/IMAP plus PostgreSQL proves ordinary collection, bounded backfill, remote materialization, and built-browser rendering; not a Mail-only inbox or complete email agent |
| Preserve GitHub Stars and Lists for later use | GitHub extension maps one authenticated complete snapshot to canonical account, repository, list, ownership, Star, membership, and Source-provenance graph facts | `core-py` | Real GitHub GraphQL authority plus ordinary Job and PostgreSQL graph comparison proves complete visible sets, idempotent replay, graph navigation, and resolver projections; not repository activity synchronization or a GitHub-specific browser |
| Accept memo-like capture through familiar clients | Memos extension provides the first memo-family backend access mode | `core-py`; `client-web` for deployment-scoped extension configuration | Backend write/read, comments, attachments, hot credential replacement, hot enable/disable, and graph round-trip |
| Organize information in one reusable info-base | Explicit focal-block rumination and system-driven media interpretation are admitted organization approaches; Agents may add ordinary graph interpretations while preserving existing graph authority | `core-py`; `client-web` as an explicit rumination trigger and retrieval consumer | Real-provider Resolver/Agent/Tool/graph journeys, meaningful no-write boundary, and bounded independent media candidates; not a complete organization taxonomy, replacement, merge, or linking realization |
| Expose information for retrieval and downstream use | Semantic retrieval ranks existing Blocks/Relations by meaning; lexical feature retrieval recalls existing Blocks from explainable textual clues; graph-navigation returns endpoint-closed neighborhoods and bounded shortest paths; hybrid composition remains independent | `core-py`; `client-web` and future Agent/application consumers | Pinned real multi-source/document/media topology corpus, real embedding and multimodal providers, local/delegated Peer journeys, and browser List/Graph navigation; not answer generation or Chat InKCre |
| Retrieve semantically related info-base entities | Resolver/Relation projections feed profile-scoped derived embeddings; one domain facade executes locally or delegates the exact capability to an eligible Peer | `core-py`; `client-web` Peer consumer | Freshness/invalidation/maintenance checks, global Block/Relation ranking, real provider quality gate, exact-target and failover/outcome-unknown protocol cases |
| Recall blocks from lexical feature evidence | Block-local Resolver labels/text feed one derived record per Block; one facade ranks exact/substring/term evidence locally or through an eligible Peer | `core-py`; `client-web` Peer consumer and InfoBaseListView host | Exact identifiers, Chinese fragments, Mail metadata, PDF body, real image/audio/video faithful text, Agent interpretation, freshness/Jobs, delegated Peer, and built-browser navigation |
