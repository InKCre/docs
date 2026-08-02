# Knowledge Capability Contract

## Purpose

Define the shared technical boundaries through which collection, organization, and
application operate on the InKCre info-base. This contract records cross-unit semantics;
each unit still owns its protocol DTOs, exact graph grammar, transactions, and runtime
mechanics.

## Capability Topology

Collection, organization, and application are actions rather than information states or a
mandatory processing pipeline:

```text
source-native input -> collection ---------+
                                              |
                                              v
                                     blocks + relations
                                              |
                   organization -------------+------------- application
                   (improve later use)                      (obtain useful results)
```

- Collection may construct one block or a graph as part of correctly persisting source
  information.
- Organization starts with information already in the info-base and is justified by an
  intended use improvement. Breakdown, merge, and linking are known operations, not a
  complete taxonomy.
- Application includes feature, semantic, and graph-navigation retrieval. Indexes,
  embeddings, and projections are derived application support, not organization output or
  graph authority.

## Graph, Content, And Authority

```text
block.content: inline content or opaque pointer --+
                                                   |
storage(pointer) -> actual bytes ------------------+-> resolver -> solved/use-facing meaning
                                                   |
direct relations ---------------------------------+
```

- Blocks and relations are the shared persisted information authority. A Tweet,
  repository, feed item, memo, or other source-native object is mapped into that graph; it
  does not gain a parallel durable object store merely because its native shape is useful.
- When `block.storage` is absent, `block.content` is inline content. When storage is present,
  `block.content` is an opaque pointer whose grammar belongs to that storage handler.
- A block-level hydration operation hides the inline/pointer branch and returns inline text
  or bytes loaded through storage. Its cache is an instance-local snapshot; `refresh`
  bypasses and replaces that snapshot without promising cross-instance invalidation.
- Storage owns pointer mechanics and actual bytes. Writable storage also owns pointer
  serialization and its supported byte lifecycle. Storage does not own MIME, filename,
  information kind, or resolver meaning.
- A resolver interprets hydrated content together with the direct relations required by its
  contract. Solved values are derived projections rather than another durable authority.
- Block row timestamps describe persistence. Storage-backed bytes may change independently,
  so `block.updated_at` is not a universal content-freshness guarantee. Source-authored time
  remains canonical content or metadata.

## Metadata And Semantic Content Pattern

Protocol/source-authored metadata and actual semantic content may require separate blocks:

```text
source object metadata block -> semantic content block -> storage-backed bytes
```

- Use a metadata block when the source object has independently useful identity, role,
  provenance, or lifecycle facts. This is a responsibility name for an ordinary block, not
  a new graph node type.
- Filename, declared MIME, declared length, source URL, and source-authored time remain with
  the metadata authority. The semantic content block uses an exact resolver identity to
  state image, audio, video, PDF, EPUB, ZIP, text, HTML, or file meaning.
- Byte-derived facts belong to resolver output unless an organization command has a proven
  reason to materialize them into the graph.
- Do not add a metadata block when the input has no independent meaning; the pattern is not a
  mandatory wrapper around every storage-backed block.
- When an independently useful component is modeled as its own block, its relation is the
  sole association fact. Root content must not copy that association merely to simplify an
  adapter.

## Resolver Contract

- The resolver identity selects the exact resolver contract version for persisted block
  content. Unknown versions fail explicitly instead of being guessed.
- The shared semantic resolver identities are `core.text.v1`, `core.html.v1`,
  `core.image.v1`, `core.audio.v1`, `core.video.v1`, `core.pdf.v1`, `core.epub.v1`,
  `core.zip.v1`, and `core.file.v1`.
- Resolver availability is an exact registry property. Re-registering the same decoder is
  idempotent; a different decoder claiming the same identity is a contract error.
- Unknown resolver, unsupported capability, supported-but-no-meaningful-result, and authored
  empty content are different outcomes. A consumer must not turn all four into an empty
  string or a default resolver.
- Resolver managers may provide exact media-type matching as a shared helper. Each source or
  protocol integration still owns its evidence order and explicit file fallback; the helper
  is not a universal classification policy.
- Direct relation selection uses `include_in` / `include_out` in Python and `includeIn` /
  `includeOut` in TypeScript relative to the subject block. Incoming means the subject is the
  target; outgoing means it is the source. These options do not request recursive traversal.

## Effect Vocabulary

New InKCre-owned APIs use stable, orthogonal effect names:

- `refresh`: bypass and replace an existing local snapshot from current authority;
- `materialize_missing` / `materializeMissing`: permit creation only when a required
  derivation is absent;
- `recompute`: explicitly regenerate an existing derivation through an organization command;
- `invalidate`: discard a cache without reading a replacement.

`refresh` itself does not grant AI or graph mutation, and it is not a synonym for recompute,
redownload, `force`, or `reload`. Protocol-owned parameter names remain exact even when an
external API uses one of those words.

## Extension Protocol And Lifecycle Contract

- Extension APIs use peer authentication by default.
- An extension that implements an external protocol may explicitly own an auth-neutral
  extension root, then compose public and protocol-authenticated child routers.
  Authentication ownership stays visible at the route-tree boundary:

  ```python
  class ProtocolExtension(ExtensionBase):
      @classmethod
      def api_dependencies(cls):
          return []

      @classmethod
      def _register_apis(cls, root):
          root.include_router(public_routes)
          root.include_router(protocol_routes, dependencies=[protocol_auth])
  ```

- This composition does not introduce a core terminal-user identity. External users or
  accounts retain only the meaning required by their protocol or source boundary.
- Enabling and disabling an extension changes the runtime capabilities and route surface of
  that runtime. Direct route publication/removal is proportionate for the current
  single-process deployment.
- Extension configuration is validated as a complete next value before it becomes durable
  or live. Credentials may remain ordinary extension configuration within the deployment's
  existing trust boundary; a stronger lifecycle requires a separately proven threat or
  product requirement.

## Source Identity, State, And Jobs

- Reconciliation uses the strongest stable external identity the source can prove. When no
  exact identity exists, a unit may accept duplication or explicit discard rather than use a
  fuzzy content match to overwrite uncertain graph state.
- A timestamp, cursor, ETag, or Last-Modified value is scoped to the authority that produced
  it. Durable source state keeps the scope reference needed to reject reuse after a source
  URL or graph identity changes.
- A source-time watermark may reduce duplicate admission when exact identity is unavailable,
  but it is not identity, reconciliation, or a correctness proof.
- When collection exposes collect jobs, manual and scheduled triggers create ordinary
  pending jobs and use the same claim/runner path. A schedule is command-creation policy, not
  a hidden second execution path.
- Complexity follows marginal utility: compare unresolved harm, mechanism coverage,
  dependency/obscurity, and maintenance cost. Stop after a weaker explicit mechanism removes
  the important loss; theoretical completeness alone does not justify a stronger identity or
  synchronization subsystem.

## Memos Reference Integration

The Memos extension is the first reference implementation of memo-like capture:

- The ownership unit is the memo-family extension. A Memos-compatible backend is one access
  mode; future collectors or product adapters remain separate delivery scopes over the same
  family meaning.
- Canonical memo root facts are persisted directly in root block content. Attachments,
  parent/comment structure, and references exist only as component blocks and relations.
- Comments are independent memo roots connected to their parent. Each attachment is a
  metadata block related to one semantic content block whose actual bytes are storage-backed.
- Backend reads consume resolver output and then map that solved value to the selected native
  API version. Adapters do not read graph rows as an alternative semantic authority.
- A successful write guarantees its primary memo mutation was persisted. It does not promise
  an atomic, residue-free graph; owned component cleanup may be best effort when the product
  contract says so.
- The deployment-scoped compatibility profile and credential do not create User, tenant, or
  per-row ownership tables. The local block ID is the memo's info-base identity.

Memos protocol versions, client deviations, relation strings, storage identifiers, and
transaction sequencing remain implementation-owned by the responsible unit.

## RSS And Atom Reference Integration

The RSS extension is the first reference source that proves incremental feed collection and
optional semantic enrichment:

- RSS 2.0 and Atom keep their protocol-authored feed, item, and enclosure facts in canonical
  metadata/root blocks. Feed membership, enclosures, full text, and materialized content are
  graph relations rather than copied root fields.
- Feed continuity prefers a source-scoped native feed identity, then a declared self URL,
  then the configured URL. An unproven configured-URL change creates a new feed root and
  retains historical graph state.
- Item reconciliation prefers the protocol-native ID and then the alternate link. When both
  are absent, source policy chooses create or discard; no content fingerprint is treated as
  identity. Create policy may use the previous successful contentful snapshot time as a
  source-time admission watermark.
- Conditional request validators are scoped to the configured request URL; the unidentified
  item watermark is scoped to the exact feed root. A `304` does not advance the contentful
  snapshot watermark.
- Feed-authored content remains primary authority. Full-text extraction is a separate
  semantic text enrichment, enabled by default, and use-time text may prefer it. Extraction
  failure does not turn a valid primary item collection into failure.
- Enclosure metadata is always collectible. Automatic download is policy-controlled and
  manual materialization remains available; materialized bytes become one exact semantic
  content child or an explicit file fallback.
- Collection commits primary items independently and records structured job diagnostics.
  Accepted partial effects and enrichment failures remain visible; source state advances only
  after a successful contentful snapshot.

Exact resolver identities, relation strings, source config fields, parser libraries, byte
limits, and transaction sequencing remain implementation-owned by the RSS unit.

## Compatibility And Evolution

- A source product/API version and a canonical or resolver contract version are independent
  axes. A product adapter maps native wire values to an extension-owned canonical version;
  changing one axis does not silently redefine the other.
- Use the conventional word `version` with a qualifier. Do not introduce `generation` as a
  synonym for API, payload, or resolver contract version.
- A new source or product integration starts from its native semantics and proves its graph,
  identity, update, deletion, resolver, and storage contracts vertically.
- Cross-cutting registries or generic binding models require repeated real pressure, unless
  one unit proves the existing contract cannot correctly deliver its minimum behavior.
- A relation payload may carry a contract-owned text or JSON grammar. This does not create a
  universal relation-type registry, and every consumer of that payload must honor the same
  owning contract.
