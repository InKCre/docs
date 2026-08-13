# Feature Retrieval And Media Interpretation Contract

## Purpose

Define the shared semantics of the first feature-retrieval increment: Block-local lexical
projection, independently maintained derived records, exact local/Peer retrieval, faithful
multimodal text materialization, system-driven media interpretation, and client navigation.
Unit repositories still own framework classes, SQL queries, prompts, provider credentials,
storage implementations, UI styling, and runtime scheduling intervals.

## Retrieval Boundary

- Feature retrieval uses observable clues that do not require semantic-similarity ranking or
  an already-materialized graph path. Lexical and future perceptual retrieval belong to this
  family.
- Facts Organization has already expressed as Blocks and Relations remain discoverable
  through graph navigation. The same fact may still be recalled lexically while it remains
  embedded in one Block-local projection.
- Hybrid retrieval is later composition of primitive retrieval capabilities. It does not
  move semantic, lexical, graph-navigation, or perceptual mechanics under one early manager.
- Lexical retrieval returns existing Blocks plus match evidence. It does not create a
  transient chunk, generated answer, or second information object.

## Block-Local Lexical Projection

```text
Block + exact Resolver -> label + get_text(context="lexical") -> derived record
query ---------------------------------------------------------> ranked existing Blocks
```

- One lexical record belongs to one Block and is rebuildable application support. The Block
  reference is the record identity; deleting the Block removes the record.
- `label` is a concise Resolver-owned identity. Optional `text` is the Block's bounded lexical
  content. A search vector or engine index is derived from those fields and is not a second
  graph or content authority.
- `context="lexical"` is a stable cross-peer Resolver vocabulary. It is Block-local and
  non-recursive: a parent does not copy a child's complete text merely because a Relation
  makes it reachable. Independently useful child Blocks receive their own records.
- Retrieval and maintenance do not read raw `block.content` as a generic fallback. Hydration,
  solved-content interpretation, local graph requirements, and permitted faithful
  materialization stay behind the exact Resolver contract.
- Unknown/unsupported projection, no meaningful lexical text, authored empty content, and
  projection failure remain distinguishable outcomes. One unavailable Block does not stop a
  bounded maintenance scan.

## Maintenance And Ranking

- Maintenance and retrieval are separate operations. Retrieval never repairs a record or
  materializes media as a hidden read effect.
- Maintain scans absent or stale Block records; rebuild additionally selects records older
  than its invocation cutoff. Projection happens outside long database transactions and
  complete records are upserted in short transactions.
- The exact typed Job identities are
  `core.feature_retrieval.lexical.maintain.v1`,
  `core.feature_retrieval.lexical.rebuild.v1`,
  `core.semantic_retrieval.maintain.v1`, and
  `core.semantic_retrieval.rebuild.v1`. Their handlers call the same domain operations used
  by explicit execution; Cron creates ordinary Job commands and no second maintenance path.
- Lexical V1 ranks exact label, label substring, text substring, then plain term evidence.
  Results expose the existing Block, label, bounded plain excerpt, evidence class, and a
  numeric rank. The result limit is at most 20 and there is no pagination.
- Contiguous literal matching supports Chinese fragments without claiming Chinese
  segmentation. V1 makes no language-specific tokenizer promise.

## Faithful Media Materialization

- Image, audio, and video Resolvers may materialize missing source-faithful `text`,
  `transcript`, or `subtitle` child Blocks under their exact contracts. Each information role
  remains a separate Relation; a parent lexical record does not copy the child's full text.
- Resolver-owned materialization may use an exact deployment-selected AI Model. Model
  selection, prompt, information role, and graph write remain with the Resolver; AI execution
  stays graph-blind and performs no automatic model fallback.
- Missing, disabled, dangling, incapable, or provider-rejected model execution makes only the
  exact derivation unavailable. Source-native text and other independent roles remain usable.
- Storage supplies actual hydrated bytes. It may additionally expose a transfer URL as an
  optional transport hint, but that URL is not content authority or a public-access promise.

## Canonical Multimodal AI Contract

- Canonical Chat user messages contain an ordered non-empty sequence of text, image, audio,
  or video content parts. Media parts carry actual bytes, standard MIME, and an optional
  transfer URL; they never carry Block, Storage, Resolver solved-content, or provider-wire
  references.
- AI Model and exact dialect support jointly determine capability, input modalities, output
  modalities, and features such as tool calling before provider execution.
- Dialect adapters alone translate canonical parts to provider fields, base64, URL, streaming
  deltas, and complete Assistant messages. Shared SDK code does not merge protocol identity.
- `core.openai-compatible.v1` retains its admitted standard subset.
  `core.alibaba-model-studio.v1` is the exact adapter for Alibaba Model Studio's multimodal
  Chat extensions, including video. Provider-specific fields do not leak into the generic
  dialect contract.

## System-Driven Media Interpretation

- Media interpretation is an Organization approach because it adds model-authored meaning to
  information already in the info-base. It is not faithful Resolver materialization and does
  not write lexical records.
- Exact Job `core.organization.media_interpretation.v1` has an empty parameter object. Each
  execution derives a bounded set of image/audio/video Blocks currently missing an
  `interpretation` result, then selects an independent deployment-configured Agent for each
  candidate modality.
- The Agent receives bounded graph context plus one canonical media content part and may add
  an interpretation only through its ordinary validated graph Tool. It may honestly produce
  no graph.
- Completed interpretation graphs are progress even if the Job times out or another
  candidate fails. A later Job derives its candidate set from current graph state; Job does
  not own a cursor, checkpoint, attempt ledger, retry, or interpretation-freshness proof.
- Lexical maintenance later indexes the resulting text Blocks. This temporal composition
  does not transfer record ownership to Organization.

## Peer Capability And Client Navigation

- Exact synchronous capability `core.feature_retrieval.lexical.v1` accepts one non-empty
  textual query plus a result bound and returns the V1 lexical result. The business facade
  executes locally when available or delegates through the shared Peer contract; a provider
  inbound always calls a non-delegating local path.
- `route_to_peer` / `routeToPeer` remains caller-local routing policy and does not enter the
  capability payload.
- `InfoBaseListView` is the first list navigation host for retrieval results. Selecting a
  result uses the client-supplied singleton `InfoBaseRouter`; List and Graph views may both
  realize Block Inspector and solved-content popup destinations without creating another
  navigation/history authority.
- Match excerpts are plain presentation-neutral text. A client must not interpret authored
  markup merely because it appears in a lexical result.

## Explicit Non-Goals

- perceptual matching, hybrid fusion, or graph-navigation implementation
- Relation lexical records or recursive graph indexing
- answer generation, Chat InKCre, or retrieval-owned organization
- language-specific tokenization guarantees
- ANN/HNSW, pagination, million-row performance claims, or an engine-specific query API
- public guest/read-only admission or provider-specific deployment mechanics
