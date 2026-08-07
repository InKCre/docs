# Workflows

## Workflow: Collection

- actor: source capability, extension-provided source, or extension-owned collection protocol
- trigger: a collection run starts, external data is received, or a compatible client submits information
- normal flow: source-native information is mapped to one block or a graph of blocks and relations, then persisted under info-base authority; a run-oriented source also records its collect-job lifecycle
- exception flow: a collection command may fail or leave explicitly accepted partial effects without turning execution status into an information state
- observable outcome: new or updated reusable information units exist for later organization or application

## Workflow: Organization

- actor: info-base authority
- trigger: an explicit or automated operation seeks to improve use of information already present in the info-base
- normal flow: the operation reads the graph, resolver output, or hydrated content it needs and applies its defined breakdown, merge, linking, or other change
- exception flow: the operation exposes its own correctness and partial-effect boundary rather than being treated as a hidden part of collection
- observable outcome: a testable graph or use-facing improvement exists on information that was already persisted

## Workflow: RSS And Atom Collection

- actor: a configured RSS 2.0 or Atom source and the ordinary collect-job runner
- trigger: a manual collection command or configured schedule creates a pending job
- normal flow: the source conditionally fetches a bounded feed document, reconciles the feed and identifiable items by exact native evidence, persists enclosure metadata, then attempts configured full-text and enclosure enrichment without replacing feed-authored authority
- exception flow: unidentified items follow explicit create/discard policy; primary item failures and enrichment failures remain visible in job diagnostics, and source state advances only after a successful contentful snapshot
- observable outcome: resolver-readable feed/item/enclosure graph state exists, exact replays are idempotent, and optional semantic children remain distinguishable from primary source facts

## Workflow: Retrieval And Use

- actor: application capability, sink, or downstream workflow
- trigger: a person or downstream capability asks to find, compare, or navigate information
- normal flow: feature, semantic, or graph-navigation retrieval reads graph authority and resolver output, using a derived index or embedding only when its query contract requires one
- exception flow: retrieval may depend on deferred storage-backed content access or unavailable derived support without transferring authority away from the info-base
- observable outcome: useful information and its relevant context are returned under an explicit query and quality contract

## Workflow: Semantic Retrieval

- actor: a person, Agent, or downstream application capability
- trigger: the actor submits a natural-language query and optionally selects a compatible embedding profile or provider peer
- normal flow: the capability embeds the query, compares it with fresh compatible block and relation records, and returns one bounded global ranking of the existing entities with score metadata
- exception flow: unavailable projections and stale records remain absent until explicit maintenance; a missing profile or eligible provider fails explicitly; uncertain post-dispatch outcomes are not replayed automatically
- observable outcome: at least one useful existing block or relation is returned under a stated ranking contract without an answer-generation step

## Workflow: Focal-Block Rumination

- actor: a person or application surface choosing one existing block
- trigger: the actor explicitly asks InKCre to reconsider that block for later use
- normal flow: an Agent interprets resolver text plus bounded direct-relation context, drafts an ordinary graph addition, and submits it through the info-base graph command boundary
- exception flow: inability to understand the block or a meaningful no-write decision completes without mutation; failure does not replace or delete the focal block and no periodic/background retry is implied
- observable outcome: either the graph is unchanged or useful blocks and relations are added while the original graph authority remains intact

## Workflow: Memo-Compatible Backend Capture

- actor: a memo client and a memo-family extension
- trigger: the client creates, updates, archives, deletes, comments on, or attaches content to a memo through a supported protocol subset
- normal flow: a versioned product adapter maps the request to memo-family graph commands; successful primary mutation is persisted, and native reads are rebuilt from resolver output
- exception flow: unsupported protocol behavior or unresolved graph meaning fails explicitly; a failed or partially cleaned command may leave documented graph residue without claiming complete-server compatibility
- observable outcome: the client observes a compatible result and the memo remains represented only by blocks, relations, and storage-backed actual content in the info-base
