# System State And Authority

## Purpose

Record durable ownership of authoritative state across units and distinguish it from derived state.

## Current Baseline

- This file is initialized as a scaffold.
- Populate only cross-unit state authority that is stable and expensive to rediscover.

## Shared Database Authority

- PostgreSQL is authoritative for shared persisted InKCre state.
- The `inkcre` schema is the versioned protocol surface admitted to authenticated peers.
- `core-py` currently owns migrations and the executable lifecycle contract; this is schema
  authority, not request-path or product-tier authority over other peers.
- Production rows are operational recovery data and must never be reproduced as development
  seed.

## Extension Installation Authority

- Extension installation state is authoritative at the deployment level.
- One deployment must not carry multiple installed records for the same extension ID.
- Installation state is distinct from client-scoped permission and distinct from current runtime activity.
- Validated extension configuration is deployment-scoped durable state. External protocol
  profiles or credentials projected from that configuration do not create an InKCre User or
  tenant authority.

## Info-Base Graph Authority

- Persisted blocks and relations are authoritative graph state.
- A block record may carry inline content or an opaque pointer to storage-backed actual bytes.
- Storage-backed bytes are subordinate to the block that holds their pointer; the storage
  backend does not become an information or MIME authority. Storage bytes may change without
  changing the block row, so row timestamps are not a universal content-freshness signal.
- Resolver-solved values, retrieval indexes, embeddings, and native protocol responses are
  derived projections, not additional authoritative graph state.
- AI providers/models and embedding profiles are deployment-scoped execution and vector-space
  contracts. Profile-scoped Block/Relation embedding records are rebuildable application
  support; their timestamps express database-row compatibility rather than universal
  storage-byte freshness.
- Block row timestamps describe persistence. Source-authored creation or update time remains
  a content fact owned by the relevant canonical contract.

## Source Incremental State Authority

- Conditional request validators belong to the configured request URL that produced them.
- Admission watermarks and cursors belong to the exact source graph identity that produced
  them; source state retains enough scope reference to reject unsafe reuse after identity or
  configuration changes.
- Incremental state is collection execution authority, not information identity and not
  authoritative graph content.

## Deployment Owner Context

- One InKCre deployment is one owner context; the product does not currently define tenants,
  terminal users, or per-row user ownership.
- Technical runtime participants are Peers. User-facing applications may still be called
  clients. Identities named by an external source or compatibility protocol
  keep their native boundary meaning and must not silently become shared-system principals.
