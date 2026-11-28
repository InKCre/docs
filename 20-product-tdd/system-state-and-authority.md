# System State And Authority

## Purpose

Record durable ownership of authoritative state across units and distinguish it from derived state.

## Shared Database Authority

- PostgreSQL is authoritative for shared persisted InKCre state.
- The `inkcre` schema is the versioned protocol surface admitted to authenticated peers.
- `impl-py` currently owns migrations and the executable lifecycle contract; this is schema
  authority, not request-path or product-tier authority over other peers.
- Production rows are operational recovery data and must never be reproduced as development
  seed.
- Input validation belongs at the accepting boundary. A normal record read does not reapply
  business input validation or require the corresponding runtime schema to be loaded. An execution
  path may restore persisted representations into its language's types; it need not repeatedly
  revalidate values already restored by that owner. Runtime capability checks remain separate
  from the authority of saved records.

## Extension Participation Authority

- One deployment shares the Extension identity, validated configuration, and business state.
- The database records the exact distribution and version selected for each `Peer × Extension`,
  together with that Peer's persistent enablement intent.
- The current Host reports the distribution, version, and result it actually runs.
- External protocol profiles and credentials derived from Extension configuration keep their native
  authority. The [extension release and installation contract](extension-release-and-installation.md)
  defines this split and the migration from deployment-wide versions.

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
- Block lexical records are rebuildable application support owned by lexical retrieval. Their
  label/text/search projection is Block-local and derived; faithful media text and
  Organization-authored interpretation become authoritative only as ordinary graph Blocks
  and Relations before later lexical maintenance observes them.
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
- Technical runtime participants are Peers and are presented as Peers wherever a person manages
  their identity, configuration, liveness, or capabilities. Delivered applications are Apps;
  `client` describes only a protocol-native role. Identities named by an external source or
  compatibility protocol keep their native boundary meaning and must not silently become
  shared-system principals.
