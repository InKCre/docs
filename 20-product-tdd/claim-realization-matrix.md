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
| Organize information in one reusable info-base | Product contract accepted; no reference organization unit is yet admitted | none | Breakdown, merge, linking, and use-quality contracts remain future unit work |
| Expose information for retrieval and downstream use | Existing sink and resolver primitives provide implementation evidence, but the three requested retrieval modes are not yet admitted product realizations | `core-py`; future application clients | Feature, semantic, and graph-navigation units still require product and quality acceptance |
